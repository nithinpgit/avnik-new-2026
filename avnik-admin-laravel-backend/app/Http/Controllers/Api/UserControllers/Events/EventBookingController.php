<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Events\User\UserNotification;
use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\Events\EventTimeSlot;
use App\Notifications\HostCancelEventEmail;
use App\Notifications\HostToUserCancelEventEmail;
use App\Notifications\UserCancelEventEmail;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class EventBookingController extends Controller
{
    private $status_code = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // my Bookings
    public function MyBookings(Request $request)
    {
        $user = auth()->user();

        $subquery = DB::table('event_bookings')
            ->select(DB::raw('MAX(id) AS max_id, event_slot_id, start_date_time, MAX(created_at) AS created_at, status'))
            ->groupBy('event_slot_id', 'start_date_time','status');

        $utcNow = Carbon::now()->utc()->format('Y-m-d H:i:s');

        $data = EventBooking::with(['Events' => function ($q) use ($request) {
                $q->with(['EventCreateUser' => function ($q) {
                    $q->select('name', 'id', 'username');
                }]);
            }, 'EventPayment' => function ($q) {
                $q->where('status', 'succeeded')->select('id', 'user_fk_id', 'event_fk_id', 'event_time_slot_id', 'to_user', 'amount', 'extended', 'amount_refunded', 'extended_id');
            }, 'Extended'])
            ->joinSub($subquery, 's', function ($join) {
                $join->on('id', '=', 's.max_id');
            })
            ->where(function ($q) use ($user) {
                $q->where('event_bookings.h_user_id', $user->id)->orWhere('event_bookings.p_user_id', $user->id);
            })
            ->where('delete_status', '1')
            ->where(function ($query) use ($request, $utcNow) {
                if ($request->filterBy == "Cancelled") {
                    $query->whereIn('event_bookings.status', ["cancelled", "cancelledByHost"]);
                } else if ($request->filterBy == "Completed") {
                    // Use UTC now for comparison
                    $query->where('event_bookings.status', 'enabled')->where('event_bookings.end_date_time', '<=', $utcNow);
                } else if ($request->filterBy == "Upcoming") {
                    // Use UTC now for comparison
                    $query->where('event_bookings.status', 'enabled')->where('event_bookings.end_date_time', '>', $utcNow);
                }
            })->whereHas('Events', function ($q) use ($request) {
                $q->where('event_title', 'LIKE', "%$request->searchQuery%");
            })
            ->select(
                'event_bookings.id',
                'event_bookings.event_fk_id',
                'event_bookings.event_slot_id',
                'event_bookings.p_user_id',
                'event_bookings.h_user_id',
                'event_bookings.meeting_room_id',
                'event_bookings.meeting_room_server_id',
                'event_bookings.meeting_room_start_time',
                'event_bookings.meeting_room_end_time',
                'event_bookings.start_time',
                'event_bookings.end_time',
                'event_bookings.start_date',
                'event_bookings.end_date',
                'event_bookings.start_date_time',
                'event_bookings.end_date_time',
                'event_bookings.booked_seats',
                'event_bookings.duration',
                'event_bookings.total_seats',
                'event_bookings.cost',
                'event_bookings.cost_type',
                'event_bookings.status',
                'event_bookings.host_status',
                'event_bookings.current_duration',
                'event_bookings.current_status',
                'event_bookings.event_data',
                'event_bookings.created_at'
            )
            ->orderByRaw("CASE WHEN event_bookings.status='enabled' THEN 0 ELSE 0 END, event_bookings.created_at DESC")
            ->paginate(20);

        $data->getCollection()->transform(function ($booking) use ($utcNow) {
            $isCompleted = $booking->status === 'enabled'
                && Carbon::parse($booking->end_date_time, 'UTC')->format('Y-m-d H:i:s') <= $utcNow;

            if ($isCompleted && !empty($booking->event_data) && $booking->events) {
                $snapshot = json_decode($booking->event_data, true);

                if (is_array($snapshot)) {
                    $booking->events->event_title = $snapshot['event_title'] ?? $booking->events->event_title;
                    $booking->events->event_description = $snapshot['event_description'] ?? $booking->events->event_description;
                    $booking->events->event_files = $snapshot['event_files'] ?? $booking->events->event_files;
                    $booking->events->event_type = $snapshot['event_type'] ?? $booking->events->event_type;
                    $booking->events->event_visible = array_key_exists('event_visible', $snapshot) ? $snapshot['event_visible'] : $booking->events->event_visible;
                    $booking->events->remember_token = $snapshot['remember_token'] ?? $booking->events->remember_token;
                }
            }

            return $booking;
        });

        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $data]);
    }

    public function CancelBookings(Request $request)
    {
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys 
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));

        if (Auth::check()) {
            $user = auth()->user();
            $ParticipantBooking = EventBooking::where('p_user_id', $user->id)->where('event_slot_id', $request->eventSlotId)->first();
            $HostBookings = EventBooking::where('h_user_id', $user->id)->where('event_slot_id', $request->eventSlotId)->get();

            // Use UTC now for all time comparisons
            $nowUtc = Carbon::now()->utc();

            if (count($HostBookings) > 0) {
                try {
                    DB::beginTransaction();
                    $getSeats = EventTimeSlot::where('id', $request->eventSlotId)->first();
                    EventTimeSlot::where('id', $request->eventSlotId)->update([
                        'booked_seats' => 0,
                    ]);
                    $userIds = EventBooking::where('event_slot_id', $request->eventSlotId)->limit(1)->get()->pluck('h_user_id');
                    $event = Event::where('id', $getSeats->event_fk_id)->first();
                    foreach ($HostBookings as $HostBooking) {

                        if ($HostBooking->status === "enabled" && $HostBooking->cost > 0) {
                            $eventPayments = EventPayment::where('h_user_id', $user->id)->where('event_time_slot_id', $request->eventSlotId)->get();
                            if (count($eventPayments) > 0) {
                                foreach ($eventPayments as $eventPayment) {
                                    if (!empty($eventPayment->stripe_id)) {
                                        $stripeRefund = $stripe->refunds->create([
                                            'payment_intent' => $eventPayment->stripe_id,
                                            // 'amount' => $HostBooking->cost*100,
                                        ]);
                                        $eventPayment = EventPayment::where('amount_refunded', 0)->where('event_time_slot_id', $request->eventSlotId)->update([
                                            'amount_refunded' => 1,
                                            'refunded_amount' => $HostBooking->cost,
                                            'refund_id' => $stripeRefund->id,
                                            'refunded_percentage' => 100
                                        ]);
                                    }
                                }
                            }
                        }
                    }

                    $MyBookings = EventBooking::where('h_user_id', $user->id)->where('status', 'enabled')->where('event_slot_id', $request->eventSlotId)->update([
                        'status' => 'cancelled',
                        'booked_seats' => 0,
                    ]);

                    $users = User::where('id', $userIds)->get();
                    $details = [
                        'body' => $event->event_title,
                        'image' => json_decode($event->event_files, true)[0]['file_url'],
                        'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->eventSlotId) . '" target="_blank">' . $event->event_title . '</a>',
                        'description' => $user->name . ' cancelled Event ',
                        'greeting' => 'Hi ' . $user->name,
                        'thanks' => 'Thank you for using ' . url('/') . '!',
                        'actionText' => 'Cancelled Event',
                        'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->eventSlotId),
                        'order_id' => $event->id
                    ];
                    Notification::send($users, new HostCancelEventEmail($details));
                    event(new UserNotification($user));
                    DB::commit();
                    return response()->json(["status" => $this->status_code, "message" => "Booking Cancel Successfully ", 'data' => $MyBookings]);
                } catch (Exception $e) {
                    DB::rollBack();
                    return response()->json(["status" => "failed", "message" => "error ", 'data' => $e]);
                }
            } else if (!empty($ParticipantBooking)) {
                try {
                    DB::beginTransaction();
                    $getSeats = EventTimeSlot::where('id', $request->eventSlotId)->where('status', 'enabled')->first();

                    // Use UTC when comparing created_at and start_date_time
                    $createdAtUtc = Carbon::parse($ParticipantBooking->created_at)->utc();
                    $startDateTimeUtc = Carbon::parse($ParticipantBooking->start_date_time)->utc();

                    // Process refund only if booking is still enabled and cost > 0 and enough time to refund (60+ mins before start)
                    if ($ParticipantBooking->status === "enabled" && $ParticipantBooking->cost > 0
                        && $nowUtc->diffInMinutes($createdAtUtc) <= 1
                        && $nowUtc->diffInMinutes($startDateTimeUtc) >= 60) {

                        $eventPayment = EventPayment::where('event_time_slot_id', $request->eventSlotId)->first();
                        if (!empty($eventPayment->stripe_id)) {
                            $stripeRefund = $stripe->refunds->create([
                                'payment_intent' => $eventPayment->stripe_id,
                                'amount' => $ParticipantBooking->cost * 100,
                            ]);
                            $eventPayment->update([
                                'amount_refunded' => 1,
                                'refunded_amount' => $ParticipantBooking->cost,
                                'refund_id' => $stripeRefund->id,
                                'refunded_percentage' => 100
                            ]);
                        }
                    }

                    if (!empty($getSeats)) {
                        $MyBookings = EventBooking::where('p_user_id', $user->id)->where('status', 'enabled')->where('event_slot_id', $request->eventSlotId)->update([
                            'status' => 'cancelled',
                            'booked_seats' => 0,
                        ]);

                        EventTimeSlot::where('booked_seats', '>', '0')->where('id', $request->eventSlotId)->update([
                            'booked_seats' => (int)$getSeats->booked_seats - 1,
                    ]);
                    $userIds=EventBooking::where('event_slot_id', $request->eventSlotId)->limit(1)->get()->pluck('h_user_id');
                    $event=Event::where('id',$getSeats->event_fk_id)->first();
                    // return $userIds;
                    $users=User::where('id',$userIds)->get();
                    $details = [
                        'body' =>$event->event_title,
                        'image' =>json_decode($event->event_files,true)[0]['file_url'],
                        'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id .'&slot='.$request->eventSlotId).'" target="_blank">'.$event->event_title.'</a>',
                        'description' => $user->name.' cancelled Event ',
                        'greeting' => 'Hi ' . $user->name,
                        'thanks' => 'Thank you for using ' . url('/') . '!',
                        'actionText' => 'Cancelled Event',
                        'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id .'&slot='.$request->eventSlotId),
                        'order_id' => $event->id
                    ];
                    $Pdetails = [
                        'body' =>$event->event_title,
                        'image' =>json_decode($event->event_files,true)[0]['file_url'],
                        'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id .'&slot='.$request->eventSlotId).'" target="_blank">'.$event->event_title.'</a>',
                        'description' => 'You cancelled your event',
                        'greeting' => 'Hi ' . $user->name,
                        'thanks' => 'Thank you for using ' . url('/') . '!',
                        'actionText' => 'Cancelled Event',
                        'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id .'&slot='.$request->eventSlotId),
                        'order_id' => $event->id
                    ];
                    Notification::send($users, new HostCancelEventEmail($details));
                    // Notification::send($user, new UserCancelEventEmail($Pdetails));
                    event(new UserNotification($user));
                    DB::commit();
                    } else {
                        return response()->json(["status" => "failed", "message" => "Booking already cancel ", 'data' => []]);
                    }

                    return response()->json(["status" => $this->status_code, "message" => "Booking Cancel Successfully ", 'data' => $MyBookings]);
                } catch (Exception $e) {
                    DB::rollBack();
                    return response()->json(["status" => "failed", "message" => "error ", 'data' => $e]);
                }
            } else {
                return response()->json(["status" => "failed", "message" => "!error", 'data' => []]);
            }
        } else {
            return response()->json(["status" => 401, "message" => "Please login", 'data' => []]);
        }
    }
    // remove the Booking 
    public function removeBookings(Request $request)
    {
        if (Auth::check()) {
            $user = auth()->user();
            $MyBookings = [];
            $ParticipantBooking = EventBooking::where('p_user_id', $user->id)->where('event_slot_id', $request->eventSlotId)->first();
            $HostBooking = EventBooking::where('h_user_id', $user->id)->where('event_slot_id', $request->eventSlotId)->first();

            // Use UTC for time comparisons
            $nowUtcFull = Carbon::now()->utc()->format('Y-m-d H:i:s');

            if (!empty($HostBooking)) {
                try {
                    if ($HostBooking->status == "cancelled" || $HostBooking->status == "cancelledByHost") {
                        $MyBookings = EventBooking::where('h_user_id', $user->id)->where(function ($q) {
                            $q->where('status', 'cancelled')->orWhere('status', 'cancelledByHost');
                        })->where('event_slot_id', $request->eventSlotId)->update([
                            'delete_status' => '0'
                        ]);
                    } else {
                        $MyBookings = EventBooking::where('h_user_id', $user->id)
                            ->where('end_date_time', '<=', $nowUtcFull)
                            ->where('event_slot_id', $request->eventSlotId)
                            ->update([
                                'delete_status' => '0'
                            ]);
                        return response()->json(["status" => $this->status_code, "message" => "Booking Remove Successfully ", 'data' => $MyBookings]);
                    }
                    return response()->json(["status" => $this->status_code, "message" => "Booking Remove Successfully ", 'data' => $MyBookings]);
                } catch (Exception $e) {
                    return response()->json(["status" => "failed", "message" => "error ", 'data' => $e]);
                }
            } else if (!empty($ParticipantBooking)) {
                try {
                    if ($ParticipantBooking->status == "cancelled" || $ParticipantBooking->status == "cancelledByHost") {
                        $MyBookings = EventBooking::where('p_user_id', $user->id)->where(function ($q) {
                            $q->where('status', 'cancelled')->orWhere('status', 'cancelledByHost');
                        })->where('event_slot_id', $request->eventSlotId)->delete();
                    } else {
                        $MyBookings = EventBooking::where('p_user_id', $user->id)
                            ->where('end_date_time', '<=', $nowUtcFull)
                            ->where('event_slot_id', $request->eventSlotId)
                            ->delete();

                        return response()->json(["status" => $this->status_code, "message" => "Booking Remove Successfully ", 'data' => $MyBookings]);
                    }
                } catch (Exception $e) {
                    return response()->json(["status" => "failed", "message" => "error ", 'data' => $e]);
                }
                return response()->json(["status" => $this->status_code, "message" => "Booking Remove Successfully ", 'data' => $MyBookings]);
            } else {
                return response()->json(["status" => "failed", "message" => "!error", 'data' => [$ParticipantBooking]]);
            }
        } else {
            return response()->json(["status" => 401, "message" => "Please login", 'data' => []]);
        }
    }


    // Resource functions
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
