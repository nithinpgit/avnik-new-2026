<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Events\User\UserNotification;
use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\Events\EventReview;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\EventTipPayment;
use App\Models\Events\ExtendDuration;
use App\Notifications\GetReplyOnGivenUserReviewEmail;
use App\Notifications\ReceivedHostReviewEmail;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EventsReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $status_code = 200;
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
        return response()->json(['status' => 'create']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // $user = auth()->user();
        // $slotIds = [];
        // $bookEvents = EventBooking::where('p_user_id', $user->id)->where('status','enabled')->withTrashed()->get();
        // foreach ($bookEvents as $booked) {
        //     $slotIds[] = $booked->event_slot_id;
        // }
        // $HostEvents = EventBooking::where('h_user_id', $user->id)->where('status','enabled')->withTrashed()->get();
        // foreach ($HostEvents as $booked) {
        //     if($booked->Reviews->where('host_id',$user->id)->count()>0){
        //         $slotIds[] = $booked->event_slot_id;
        //     }
        // }
        // // $events = Event::where('user_fk_id', $user->id)->get();
        // // foreach ($events as $event) {
        // //     foreach ($eventHost->EventTimeSlot as $Slot) {
        // //         if($Slot->Reviews->where('host_id',$user->id)->count()>0){
        // //             $slotIds[] = $Slot->id;
        // //         }

        // //     }
        // // }
        // $EventTimeSlots = EventTimeSlot::where('end_date_time','<=',Carbon::parse(Carbon::now()->timezone($request->tz)->toDateTimeString())->format('Y-m-d H:i:s'))->whereIn('id', $slotIds)->with(['Reviews' => function ($q) use($user){
        //     $q->where(function($q)use ($user){
        //         $q->where('user_id',$user->id)->orWhere('host_id',$user->id);
        //     })->with(['Sender' => function ($q) {
        //         $q->with(['UserProfile' => function ($q) {
        //             $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
        //         }]);
        //     }, 'Receiver' => function ($q) {
        //         $q->with(['UserProfile' => function ($q) {
        //             $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
        //         }]);
        //     }])->orderBy('updated_at', 'desc');

        // },'Events' => function ($q) {
        //     $q->select('id', 'user_fk_id', 'event_files', 'event_title', 'event_type', 'duration', 'cost', 'remember_token')->with(['EventCreateUser' => function ($q) {
        //         $q->select('name', 'id', 'username')->with(['UserProfile' => function ($q) {
        //                 $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
        //             }]);
        //     }]);
        // }])->orderBy('id', 'desc')->withTrashed()->paginate(20);


        // Assuming you have the required models imported at the beginning of the controller file
        // Replace "EventReview", "EventBooking", "EventTimeSlot", "Event", "User", and "UserProfile" with your actual model names.

        $user = auth()->user();
        $slotIds = [];

        // Retrieve the event_slot_ids for events booked by the user
        $bookEvents = EventBooking::where('p_user_id', $user->id)
            ->where('status', 'enabled')
            ->pluck('event_slot_id')
            ->toArray();

        // Retrieve the event_slot_ids for events where the user acted as a host and has reviews
        $HostEvents = EventBooking::where('h_user_id', $user->id)
            ->where('status', 'enabled')
            ->has('Reviews', '>', 0) // Filter events with reviews from the user as a host
            ->pluck('event_slot_id')
            ->toArray();
            // Merge the event_slot_ids from both booked and hosted events
            $slotIds = array_merge($bookEvents, $HostEvents);

            // return EventReview::whereIn('slot_id',$slotIds)->get();
        // Retrieve EventTimeSlots that are in the past and have the event_slot_ids from the previous step
        $EventTimeSlots = EventTimeSlot::where('end_date_time', '<=', Carbon::now()->utc()->format('Y-m-d H:i:s'))
            ->whereIn('id', $slotIds)
            ->with(['Reviews' => function ($q) use ($user,$request) {
                $q->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->orWhere('host_id', $user->id);
                })
                    ->with(['Sender' => function ($q) {
                        $q->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }]);
                    }, 'Receiver' => function ($q) {
                        $q->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }]);
                    }])->where(function($query)use($request){
                        if($request->filterBy=="Received"){
                            $query->where('receiver_id',auth()->user()->id)->where('comment_to_host', 'LIKE', "%$request->searchQuery%")->where('comment_to_user', 'LIKE', "%$request->searchQuery%");
                        }else if($request->filterBy=="Given"){
                            $query->where('user_id',auth()->user()->id)->where('comment_to_host', 'LIKE', "%$request->searchQuery%")->where('comment_to_user', 'LIKE', "%$request->searchQuery%");

                        }
                    })->orderBy('updated_at');
            }, 'Events' => function ($q) {
                $q->select('id', 'user_fk_id', 'event_files', 'event_title', 'event_type', 'duration', 'cost', 'remember_token')
                    ->with(['EventCreateUser' => function ($q) {
                        $q->select('name', 'id', 'username')->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }]);
                    }]);
            }])
            ->whereHas('Events',function($q)use($request){
                $q->orWhere('event_title', 'LIKE', "%$request->searchQuery%");
            })
            // ->whereHas('Reviews',function($q)use($request){
            //     $q->where(function($q)use($request){
            
            // $q->orWhere('comment_to_host', 'LIKE', "%$request->searchQuery%")->orWhere('comment_to_user', 'LIKE', "%$request->searchQuery%")
            // ->orderByDesc('updated_at');
            //     });
            // })
            ->orderByDesc('end_date_time')
            ->withTrashed()
            ->paginate(20);

        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $EventTimeSlots]);
    }
    public function giveReviews(Request $request)
    {
        $user = Auth()->user();
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        $validator =  Validator::make($request->all(), [
            'comment' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", 'message' => 'validation_error', 'error' => $validator->fails()]);
        } else {
            $eventHost = Event::where('id', $request->eventId)->first();
            $eventTimeSlotID=EventTimeSlot::where('meeting_room_id',$request->slotId)->first();

            $eventReviews = EventReview::where('user_id', $user->id)->where('event_id', $request->eventId)->where('slot_id', !empty($eventTimeSlotID)?$eventTimeSlotID->id:$request->slotId)->count();
            
            
            if (!is_null($eventHost) && $eventHost->user_fk_id != $user->id) {
                if ($eventReviews > 0) {
                    return response()->json(["status" => "failed", 'message' => 'You did already', 'success' => false]);
                } else {
                    try {
                        $reviews = new EventReview();
                        $reviews->user_id = $user->id;
                        $reviews->event_id = $request->eventId;
                        $reviews->host_id = $eventHost->user_fk_id;
                        $reviews->slot_id = !empty($eventTimeSlotID)?$eventTimeSlotID->id:$request->slotId;
                        $reviews->comment_to_host = $request->comment;
                        $reviews->rating = $request->rating;
                        $reviews->remember_token = Str::random(70);
                        $reviews->save();
                        if($request->cost>0){
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$request->cost,
                                'currency' => 'usd',
                                'payment_method' => $request->stripeToken,
                                'confirm' => true,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'You received tip...',
                            ]);
                            if ($payment->status == "succeeded") {
                                try{
                                    DB::beginTransaction();
                                    $eventTipPayment = new EventTipPayment();
                                     $eventTipPayment->user_fk_id = $user->id;
                                     $eventTipPayment->to_user_id = $eventHost->user_fk_id;
                                     $eventTipPayment->event_fk_id = $eventHost->id;
                                     $eventTipPayment->pay_by = "stripe";
                                     $eventTipPayment->payer_id = $payment->id;
                                     $eventTipPayment->amount = $request->cost;
                                     $eventTipPayment->paid = true;
                                     $eventTipPayment->amount_refunded = $payment->amount_refunded;
                                     $eventTipPayment->transaction_id = $payment->balance_transaction;
                                     $eventTipPayment->status = $payment->status;
                                     $eventTipPayment->remember_token = Str::random(60);
                                     $eventTipPayment->save();
                                    DB::commit();
                                }catch(Exception $e){
                                    DB::rollback();
                                }
            
                            }
                        }
                        $users = User::where('id', $eventHost->user_fk_id)->get();
                        $details = [
                            'body' => $eventHost->event_title,
                            'image' => json_decode($eventHost->event_files, true)[0]['file_url'],
                            'title' => '<a href="' . url('/reviews') . '" target="_blank">' . $eventHost->event_title . '</a>',
                            'description' => 'You have received new reviews',
                            'greeting' => 'Hi ' . $user->name,
                            'thanks' => 'Thank you for using ' . url('/') . '!',
                            'actionText' => 'Cancelled Event',
                            'actionURL' => url('/reviews'),
                            'order_id' => $eventHost->id
                        ];
                        Notification::send($users, new ReceivedHostReviewEmail($details));
                        event(new UserNotification($user));
                        return response()->json(["status" => $this->status_code, 'message' => 'Thanks for the your valuable feedback', 'data' => $reviews]);
                    } catch (Exception $e) {
                        return $e;
                    }
                }
            } elseif (!is_null($eventHost) && $eventHost->user_fk_id == $user->id) {
                if ($eventReviews > 0) {
                    return response()->json(["status" => "failed", 'message' => 'You did already', 'success' => false]);
                } else {
                    try {
                        $eventTimeSlotID=EventTimeSlot::where('meeting_room_id',$request->slotId)->first();
                        $update = EventReview::where('slot_id',  !empty($eventTimeSlotID)?$eventTimeSlotID->id:$request->slotId)
                            ->where('event_id', $request->eventId)->where('user_id', $request->userId)
                            ->update([
                                'receiver_id' => $eventHost->user_fk_id,
                                'comment_to_user' => $request->comment,
                            ]);
                        $PUser = EventReview::where('slot_id',  !empty($eventTimeSlotID)?$eventTimeSlotID->id:$request->slotId)->first();
                        if ($PUser->comment_to_user) {
                            $users = User::where('id', $PUser->user_id)->get();
                            $details = [
                                'body' => $eventHost->event_title,
                                'image' => json_decode($eventHost->event_files, true)[0]['file_url'],
                                'title' => '<a href="' . url('/reviews') . '" target="_blank">' . $eventHost->event_title . '</a>',
                                'description' => 'You have received a update reply on your review',
                                'greeting' => 'Hi ' . $user->name,
                                'thanks' => 'Thank you for using ' . url('/') . '!',
                                'actionText' => 'Cancelled Event',
                                'actionURL' => url('/reviews'),
                                'order_id' => $eventHost->id
                            ];
                            Notification::send($users, new GetReplyOnGivenUserReviewEmail($details));
                            event(new UserNotification($user));
                        } else {
                            $users = User::where('id', $PUser->user_id)->get();
                            $details = [
                                'body' => $eventHost->event_title,
                                'image' => json_decode($eventHost->event_files, true)[0]['file_url'],
                                'title' => '<a href="' . url('/reviews') . '" target="_blank">' . $eventHost->event_title . '</a>',
                                'description' => 'You have received a reply on your review',
                                'greeting' => 'Hi ' . $user->name,
                                'thanks' => 'Thank you for using ' . url('/') . '!',
                                'actionText' => 'Cancelled Event',
                                'actionURL' => url('/reviews'),
                                'order_id' => $eventHost->id
                            ];
                            Notification::send($users, new GetReplyOnGivenUserReviewEmail($details));
                            event(new UserNotification($user));
                        }

                        return response()->json(["status" => $this->status_code, 'message' => 'Thanks for the your valuable feedback', 'data' => $update]);
                    } catch (Exception $e) {
                        return $e;
                    }
                }
            } else {
                return response()->json(["status" => "failed", 'message' => 'validation_error', 'error' => 'host not found']);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showOnProfile(Request $request)
    {
        //
        if ($request->userId) {
            $showReview = EventReview::where('host_id', $request->userId)->with(['Sender' => function ($q) {
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }]);
            }, 'Receiver' => function ($q) {
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }]);
            }])->orderBy('id', 'desc')->paginate(20);
        } else {
            return response()->json(["status" => "failed", 'success' => false, 'message' => 'sorry something wrong here...']);
        }
        return response()->json(["status" => $this->status_code, 'message' => 'fetch reviews', 'data' => $showReview]);
    }
    public function showOnEvents(Request $request)
    {
        //
        if ($request->eventId) {
            $showReview = EventReview::where('event_id', $request->eventId)->with(['Sender' => function ($q) {
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }]);
            }, 'Receiver' => function ($q) {
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }]);
            }])->orderBy('id', 'desc')->paginate(20);
        } else {
            return response()->json(["status" => "failed", 'success' => false, 'message' => 'sorry something wrong here...']);
        }
        return response()->json(["status" => $this->status_code, 'message' => 'fetch reviews', 'data' => $showReview]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //
        $user = Auth()->user();
        try {
            $reviews = EventReview::find($request->reviewId);
            // $reviews->user_id == $user->id;
            if ($request->comment) {
                $reviews->comment = $request->comment;
                $reviews->updated_at = Carbon::now();
            }
            if ($request->rating > 0) {
                $reviews->rating = $request->rating;
                $reviews->updated_at = Carbon::now();
            }
            $reviews->save();
            return response()->json(["status" => $this->status_code, 'message' => 'feedback Updated', 'data' => $reviews]);
        } catch (Exception $e) {
            return $e;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        // return $request->all();
        $user = Auth()->user();
        $validator =  Validator::make($request->all(), [
            'comment' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", 'message' => 'validation_error', 'error' => $validator->fails()]);
        } else {
            $eventHost = Event::where('id', $request->eventId)->first();
            $eventTimeSlotID=EventTimeSlot::where('meeting_room_id',$request->slotId)->first();
            $eventReviews = EventReview::where('user_id', $user->id)->where('event_id', $request->eventId)->where('slot_id', !empty($eventTimeSlotID)?$eventTimeSlotID->id:$request->slotId)->count();
            if (!is_null($eventHost) && $eventHost->user_fk_id != $user->id) {
                if ($eventReviews > 0) {
                    try {
                        $reviews = EventReview::find($request->reviewId);
                        if ($request->rating) {
                            $reviews->rating = $request->rating;
                            //  $reviews->updated_at = Carbon::now();    
                        }
                        if ($request->comment) {
                            $reviews->comment_to_host = $request->comment;
                            // $reviews->updated_at = Carbon::now();    

                        }
                        $reviews->created_at = Carbon::now();
                        $reviews->save();
                        return response()->json(["status" => $this->status_code, 'message' => 'Thanks for the your valuable feedback', 'data' => $reviews]);
                    } catch (Exception $e) {
                        return $e;
                    }
                } else {
                    return response()->json(["status" => "failed", 'message' => 'You did already', 'success' => false]);
                }
            } elseif (!is_null($eventHost) && $eventHost->user_fk_id == $user->id) {
                if ($eventReviews > 0) {
                    return response()->json(["status" => "failed", 'message' => 'You did already', 'success' => false]);
                } else {
                    try {
                        $reviews = EventReview::find($request->reviewId);
                        if ($request->comment) {
                            $reviews->comment_to_user = $request->comment;
                            $reviews->updated_at = Carbon::now();
                        }
                        $reviews->save();
                        return response()->json(["status" => $this->status_code, 'message' => 'Thanks for the your valuable feedback', 'data' => $reviews]);
                    } catch (Exception $e) {
                        return $e;
                    }
                }
            } else {
                return response()->json(["status" => "failed", 'message' => 'validation_error', 'error' => 'host not found']);
            }
        }
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
        return response()->json(['status' => 'delete']);
    }
}
