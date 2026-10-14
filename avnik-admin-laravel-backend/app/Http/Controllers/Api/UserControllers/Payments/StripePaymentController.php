<?php

namespace App\Http\Controllers\Api\UserControllers\Payments;

use App\Events\User\UserNotification;
use App\Helpers\HumanReadable;
use App\Http\Controllers\Controller;
use App\Models\UserContacts\UserContact;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventFile;
use App\Models\Chat\ChatRoom;
use App\Models\Chat\ChatRoomUser;
use App\Models\Events\EventFilePayment;
use App\Models\Events\EventPayment;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\ExtendDuration;
use App\User;
use App\Models\Events\ServiceFee;
use App\Models\FileManager\FileManager;
use App\Notifications\FilePurchasedHostEmail;
use App\Notifications\FilePurchasedUserEmail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;
use PDOException;
use Stripe;
use Illuminate\Support\Str;
use App\Notifications\NewBookingHostNotification;
use App\Notifications\NewBookingUserNotification;

class StripePaymentController extends Controller
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

        // if (auth()->user()) {
        //     $Payment = $stripe->paymentIntents->retrieve('pi_1IEZxMDlNqjyccEq8dziXW32', []);
        //     return response()->json($Payment);
        // }
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
// return $request->all();
        $user = auth()->user();
       $StripePayment=[];
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        if ($user) {
            DB::beginTransaction();
            try {
                $event = Event::where('id', $request->eventId)->first();
                if (!is_null($event)) {
                    if ($event->user_fk_id == auth()->user()->id) {
                        return response()->json(['status' => 'failed', 'success' => false, 'message' => 'sorry You can not book your own event']);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Sorry We are not found this event']);
                }
                $slot = EventTimeSlot::whereId($request->slotId)->where('event_fk_id', $request->eventId)->first();
                if ($slot) {
                    $bookingCheck=EventBooking::where('event_slot_id',$slot->id)->where(function($q){
                        $q->where('status','cancelled')->orWhere('status','cancelledByHost');
                    })->count();
                    $bookingCount=EventBooking::Where('event_slot_id',$slot->id)->where('p_user_id',$user->id)->where('status','enabled')->count();
                    $eventPayment = EventPayment::where('user_fk_id', auth()->user()->id)->where('event_time_slot_id', $request->slotId)->where('event_fk_id', $request->eventId)->first();

                    if ($eventPayment&&$bookingCount>0) {

                        return response()->json(["status" => 'failed', "message" => "You did payment already for this event"]);
                    } else {
                        if($event->status=='1'&&$slot->status=="enabled"){
                            if ((int)$slot->booked_seats < (int)$slot->total_seats) {
                                if ($slot->cost > 0) {

                                    
                                        if($request->saveCard){ 
                                            if(!$user->stripe_customer_id){
                                                $customer = $stripe->customers->create([
                                                    'description' => $user->name,
                                                    'email' => $user->email,
                                                ]);
                                                  $attached = $stripe->paymentMethods->attach(
                                                      $request->stripeToken,
                                                      ['customer' =>$customer->id]
                                                  );
                                                  $payment = $stripe->paymentIntents->create([
                                                    'amount' => 100 * (float)$slot->cost,
                                                    'currency' => 'usd',
                                                    'payment_method' => $attached->id,
                                                    'confirm' => true,
                                                    'customer' =>$customer->id,
                                                    'receipt_email' => auth()->user()->email,
                                                    'description' => 'Payment for' . $event->title,
                                                ]);
                                              User::where('id',$user->id)->update([
                                                  "stripe_customer_id"=>$customer->id
                                              ]); 
                                            }else{
                                                $attached = $stripe->paymentMethods->attach(
                                                    $request->stripeToken,
                                                    ['customer' =>$user->stripe_customer_id]
                                                );
                                                $payment = $stripe->paymentIntents->create([
                                                    'amount' => 100 * (float)$slot->cost,
                                                    'currency' => 'usd',
                                                    'payment_method' => $attached->id,
                                                    'confirm' => true,
                                                    'customer' =>$user->stripe_customer_id,
                                                    'receipt_email' => auth()->user()->email,
                                                    'description' => 'Payment for' . $event->title,
                                                ]);
                                            }
                                        }else{
                                            if(!$user->stripe_customer_id){
                                                $customer = $stripe->customers->create([
                                                    'description' => $user->name,
                                                    'email' => $user->email,
                                                ]);
                                                User::where('id',$user->id)->update([
                                                    "stripe_customer_id"=>$customer->id
                                                ]);
                                            }
                                            $payment = $stripe->paymentIntents->create([
                                                'amount' => 100 * (float)$slot->cost,
                                                'currency' => 'usd',
                                                'payment_method' => $request->stripeToken,
                                                'confirm' => true,
                                                'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                                                'receipt_email' => auth()->user()->email,
                                                // 'application_fee_amount' => (float)$slot->cost*20/100*100,
                                                // 'transfer_data' => ['amount'=>(float)$slot->cost*20/100*100,'destination' => 'acct_1E46ZfH1Lp8M6ebR'],
                                                'description' => 'Payment for' . $event->title,
                                            ]);
                                        }
                                        
                                    if ($payment->status == "succeeded") {
                                        // $serviceFeed=20/100*(int)$slot->cost;
                                        // $ServiceFee=new ServiceFee();    
                                        // $ServiceFee->p_user_id = $user->id;    
                                        // $ServiceFee->h_user_id = $event->user_fk_id;    
                                        // $ServiceFee->amount = $serviceFeed;    
                                        // $ServiceFee->stripe_id = $payment->id;    
                                        // $ServiceFee->event_slot_id = $slot->id;
                                        // $ServiceFee->event_fk_id = $event->id;
                                        // $ServiceFee->paid = true;
                                        // $ServiceFee->status = $payment->status;
                                        // $ServiceFee->save();
                                        if(UserContact::where('user_id',$event->user_fk_id)->where('contact_id',$user->id)->count()===0){
                                            $contacts = new UserContact(); 
                                            $contacts->user_id = $event->user_fk_id; 
                                            $contacts->contact_id = $user->id; 
                                            $contacts->remember_token = Str::random(70); 
                                            $contacts ->save(); 
                                        }  
                                        $eventPayment = new EventPayment();
                                        $eventPayment->user_fk_id = $user->id;
                                        $eventPayment->to_user = $event->user_fk_id;
                                        $eventPayment->event_time_slot_id = $slot->id;
                                        $eventPayment->event_fk_id = $event->id;
                                        $eventPayment->event_date_time = Carbon::now();
                                        $eventPayment->amount = $slot->cost;
                                        $eventPayment->stripe_id = $payment->id;
                                        $eventPayment->paid = true;
                                        $eventPayment->accept_by_host = "accepted";
                                        $eventPayment->amount_refunded = $payment->amount_refunded;
                                        $eventPayment->transaction_id = $payment->balance_transaction;
                                        $eventPayment->status = $payment->status;
                                        $eventPayment->save();
                                        EventTimeSlot::whereId($request->slotId)->where('event_fk_id', $request->eventId)->update([
                                            'booked_seats' => (int)$slot->booked_seats + 1,
                                        ]);

                                        $EventBooking = new EventBooking();
                                        $EventBooking->event_fk_id = $slot->event_fk_id;
                                        $EventBooking->event_slot_id = $slot->id;
                                        $EventBooking->p_user_id = $user->id;
                                        $EventBooking->h_user_id = $event->user_fk_id;
                                        $EventBooking->meeting_room_id = $slot->meeting_room_id;
                                        $EventBooking->cost_type = $slot->cost_type;
                                        $EventBooking->cost = $slot->cost;
                                        $EventBooking->duration = $slot->duration;
                                        $EventBooking->booked_seats = 1;
                                        $EventBooking->total_seats = (int)$slot->total_seats;
                                        $EventBooking->start_date = Carbon::parse($slot->start_date)->format('Y-m-d');
                                        $EventBooking->start_time = Carbon::parse($slot->start_time)->format('H:i');
                                        $EventBooking->end_date = Carbon::parse($slot->end_date)->format('Y-m-d');
                                        $EventBooking->end_date_time = Carbon::parse($slot->end_date_time)->format('Y-m-d H:i');
                                        $EventBooking->end_time = Carbon::parse($slot->end_time)->format('H:i');
                                        $EventBooking->start_date_time = Carbon::parse($slot->start_date_time)->format('Y-m-d H:i');
                                        $EventBooking->status = "enabled";
                                        $EventBooking->remember_token = $slot->remember_token;
                                        $EventBooking->save();

                                        $chatRoom= ChatRoom::where('slot_id',$request->slotId)->first();
                                        if(!empty($chatRoom)){
                                            $chatRoomUser=ChatRoomUser::where('room_id',$chatRoom->id)->where('user_id','!=',$user->id)->count();
                                            if($chatRoomUser>0){
                                                $ChatRoomUser = new ChatRoomUser();
                                                $ChatRoomUser->user_id = $user->id;
                                                $ChatRoomUser->room_id = $chatRoom->id;
                                                $ChatRoomUser->remember_token = Str::random(70);
                                                $ChatRoomUser->save();
                                            }
                                            
                                        }
                                        $hostUser=User::find($event->user_fk_id);

                                        $HostDetails = [
                                            'body' =>$event->event_title,
                                            'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                            'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id). '&slot='.$request->slotId.'" target="_blank">'.$event->event_title.'</a>',
                                            'description' => 'You have a new booking',
                                            'actionText' => 'View Event',
                                            'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                                            'order_id' => $event->id
                                        ];
                                        // $UserDetails = [
                                        //     'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                        //     'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id).'&slot='.$request->slotId.'" target="_blank">'.$event->event_title.'</a>',
                                        //     'description' => 'You booked an event',
                                        //     'actionText' => 'View Event',
                                        //     'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                                        //     'order_id' => $event->id
                                        // ];
                                        Notification::send($hostUser, new NewBookingHostNotification($HostDetails));
                                        // Notification::send($user, new NewBookingUserNotification($UserDetails));
                                        event(new UserNotification($user));
                                        DB::commit();
                                        return response()->json(["status" => $this->status_code, "message" => "Payment Done Successfully", "data" => $eventPayment]);
                                    } else {
                                        return response()->json(["status" => 'failed', "message" => "Payment not done try again"]);
                                    }
                                } else {
                                    $eventPayment = new EventPayment();
                                    $eventPayment->user_fk_id = $user->id;
                                    $eventPayment->to_user = $event->user_fk_id;
                                    $eventPayment->event_time_slot_id = $slot->id;
                                    $eventPayment->event_fk_id = $event->id;
                                    $eventPayment->event_date_time = Carbon::now();
                                    $eventPayment->amount = $slot->cost;
                                    $eventPayment->paid = false;
                                    $eventPayment->accept_by_host = "accepted";
                                    $eventPayment->amount_refunded = false;
                                    $eventPayment->status = "succeeded";
                                    $eventPayment->save();
                                    if(UserContact::where('user_id',$event->user_fk_id)->where('contact_id',$user->id)->count()===0){
                                        $contacts = new UserContact();
                                        $contacts->user_id = $event->user_fk_id;
                                        $contacts->contact_id = $user->id;
                                        $contacts->remember_token = Str::random(70);
                                        $contacts->save();
                                    }
                                    EventTimeSlot::whereId($request->slotId)->where('event_fk_id', $request->eventId)->update([
                                        'booked_seats' => (int)$slot->booked_seats + 1,
                                    ]);

                                    // EventBooking::whereId($request->slotId)->where('event_fk_id', $request->eventId)->update([
                                    //     'booked_seats' => (int)$slot->booked_seats + 1,
                                    // ]);
                                    $EventBooking = new EventBooking();
                                    $EventBooking->event_fk_id = $slot->event_fk_id;
                                    $EventBooking->event_slot_id = $slot->id;
                                    $EventBooking->p_user_id = $user->id;
                                    $EventBooking->h_user_id = $event->user_fk_id;
                                    $EventBooking->meeting_room_id = $slot->meeting_room_id;
                                    $EventBooking->cost_type = $slot->cost_type;
                                    $EventBooking->cost = $slot->cost;
                                    $EventBooking->duration = $slot->duration;
                                    $EventBooking->booked_seats = 1;
                                    $EventBooking->total_seats = (int)$slot->total_seats;
                                    $EventBooking->start_date = Carbon::parse($slot->start_date)->format('Y-m-d');
                                    $EventBooking->start_time = Carbon::parse($slot->start_time)->format('H:i');
                                    $EventBooking->end_date = Carbon::parse($slot->end_date)->format('Y-m-d');
                                    $EventBooking->end_date_time = Carbon::parse($slot->end_date_time)->format('Y-m-d H:i');
                                    $EventBooking->end_time = Carbon::parse($slot->end_time)->format('H:i');
                                    $EventBooking->start_date_time = Carbon::parse($slot->start_date_time)->format('Y-m-d H:i');
                                    $EventBooking->status = "enabled";
                                    $EventBooking->remember_token = $slot->remember_token;
                                    $EventBooking->save();
                                    $chatRoom= ChatRoom::where('slot_id',$request->slotId)->first();
                                    if(!empty($chatRoom)){
                                        $chatRoomUser=ChatRoomUser::where('room_id',$chatRoom->id)->where('user_id','!=',$user->id)->count();
                                        if($chatRoomUser>0){
                                            $ChatRoomUser = new ChatRoomUser();
                                            $ChatRoomUser->user_id = $user->id;
                                            $ChatRoomUser->room_id = $chatRoom->id;
                                            $ChatRoomUser->remember_token = Str::random(70);
                                            $ChatRoomUser->save();
                                        }
                                    }
                                    $hostUser=User::find($event->user_fk_id);

                                    $HostDetails = [
                                        'body' =>$event->event_title,
                                        'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                        'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id .'&slot='.$request->slotId).'" target="_blank">'.$event->event_title.'</a>',
                                        'description' => 'You have a new booking',
                                        'actionText' => 'View Event',
                                        'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id.'&slot='.$request->slotId),
                                        'order_id' => $event->id
                                    ];
                                    // $UserDetails = [
                                    //     'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                    //     'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id.'&slot='.$request->slotId).'" target="_blank">'.$event->event_title.'</a>',
                                    //     'description' => 'You booked an event',
                                    //     'actionText' => 'View Event',
                                    //     'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id.'&slot='.$request->slotId),
                                    //     'order_id' => $event->id
                                    // ];
                                    Notification::send($hostUser, new NewBookingHostNotification($HostDetails));
                                    // Notification::send($user, new NewBookingUserNotification($UserDetails));
                                    event(new UserNotification($user));
                                    DB::commit();
                                    return response()->json(["status" => $this->status_code, "message" => "Payment Done Successfully", "data" => $eventPayment]);
                                }
                            } else {
                                return response()->json(["status" => "failed", "success" => false, "message" => "No more seats available for this slot"]);
                            }
                        }else{
                            return response()->json(["status" => "failed", "success" => false, "message" => "This event or slot may be cancel or disable"]);
                        }
                    }
                } else {

                    return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Sorry We are not found this slot']);
                }
            } catch (PDOException $e) {

                DB::rollBack();
                // if($payment->status == "succeeded"){
                    // $stripe->refunds->create([
                    //     'payment_intent' => $payment->id,
                    //   ]);
                // }
                  
                return response()->json($e);
            }
        } else {
            return response()->json("login first");
        }
    }
    public function EventFilePaymentStore(Request $request)
    {
        //
        $validator =  Validator::make($request->all(), [
            'stripeToken' => 'required',
            'eventFilesIds' => 'required|array|min:1',
            // 'FollowingBy' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed","message"=>"validation error", "validation_error" => $validator->errors()]);
        }else{
        $user = auth()->user();
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        if ($user) {
            DB::beginTransaction();
            try {
                $EventFiles = EventFile::whereIn('file_manager_id', $request->eventFilesIds)->get();
                if($EventFiles->count()>0){
                $event = Event::whereIn('id', $EventFiles->pluck('event_fk_id'))->first();
                // return $event;
                $EventFileManagerFiles = FileManager::whereIn('id', $request->eventFilesIds)->where('user_id',$user->id)->get();
                if (count($EventFileManagerFiles)>0) {
                        return response()->json(['status' => 'failed', 'success' => false, 'message' => 'sorry you can not buy your own files']);
                } else {
                    $eventFilePayment=EventFilePayment::whereIn('event_file_fk_id',$request->eventFilesIds)->where('user_fk_id',$user->id)->get();
                    if (count($eventFilePayment)>0) {
                        return response()->json(["status" => 'failed', "message" => "You did payment already for this event"]);
                    } else {        

                                if (count($EventFiles)>0) {
                                    
                                    // $payment = $stripe->paymentIntents->create([
                                    //     'amount' => 100 * (float)$EventFiles->sum('file_cost'),
                                    //     'currency' => 'usd',
                                    //     'payment_method' => $request->stripeToken,
                                    //     'confirm' => true,
                                    //     'receipt_email' => auth()->user()->email,
                                    //     'description' => 'You Purchased File'.' '.$EventFiles->count(),
                                    // ]);
                                    if($request->saveCard){ 
                                        if(!$user->stripe_customer_id){
                                            $customer = $stripe->customers->create([
                                                'description' => $user->name,
                                                'email' => $user->email,
                                            ]);
                                              $attached = $stripe->paymentMethods->attach(
                                                  $request->stripeToken,
                                                  ['customer' =>$customer->id]
                                              );
                                              $payment = $stripe->paymentIntents->create([
                                                'amount' => 100 * (float)$EventFiles->sum('file_cost'),
                                                'currency' => 'usd',
                                                'payment_method' => $attached->id,
                                                'confirm' => true,
                                                'customer' =>$customer->id,
                                                'receipt_email' => auth()->user()->email,
                                                'description' => 'You Purchased File'.' '.$EventFiles->count()
                                            ]);
                                          User::where('id',$user->id)->update([
                                              "stripe_customer_id"=>$customer->id
                                          ]); 
                                        }else{
                                            $attached = $stripe->paymentMethods->attach(
                                                $request->stripeToken,
                                                ['customer' =>$user->stripe_customer_id]
                                            );
                                            $payment = $stripe->paymentIntents->create([
                                                'amount' => 100 * (float)$EventFiles->sum('file_cost'),
                                                'currency' => 'usd',
                                                'payment_method' => $attached->id,
                                                'confirm' => true,
                                                'customer' =>$user->stripe_customer_id,
                                                'receipt_email' => auth()->user()->email,
                                                'description' => 'You Purchased File'.' '.$EventFiles->count()
                                            ]);
                                        }
                                    }else{
                                        if(!$user->stripe_customer_id){
                                            $customer = $stripe->customers->create([
                                                'description' => $user->name,
                                                'email' => $user->email,
                                            ]);
                                            User::where('id',$user->id)->update([
                                                "stripe_customer_id"=>$customer->id
                                            ]);
                                        }
                                        $payment = $stripe->paymentIntents->create([
                                            'amount' => 100 * (float)$EventFiles->sum('file_cost'),
                                            'currency' => 'usd',
                                            'payment_method' => $request->stripeToken,
                                            'confirm' => true,
                                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                                            'receipt_email' => auth()->user()->email,
                                            'description' => 'You Purchased File'.' '.$EventFiles->count(),
                                        ]);
                                    }
                                    if ($payment->status == "succeeded") {
                                        $userIds=[];
                                        foreach($EventFiles as $EventFile){
                                            $eventPayment = new EventFilePayment();
                                            $eventPayment->user_fk_id = $user->id;
                                            $eventPayment->to_user_id = $event->user_fk_id;
                                            $eventPayment->event_fk_id = $event->id;
                                            $eventPayment->event_file_fk_id = $EventFile->file_manager_id;
                                            $eventPayment->pay_by = "stripe";
                                            $eventPayment->payer_id = $payment->id;
                                            $eventPayment->event_date_time = Carbon::now();
                                            $eventPayment->amount = $EventFile->file_cost;
                                            $eventPayment->paid = true;
                                            $eventPayment->amount_refunded = $payment->amount_refunded;
                                            $eventPayment->transaction_id = $payment->balance_transaction;
                                            $eventPayment->status = $payment->status;
                                            $eventPayment->remember_token = Str::random(60);
                                            $eventPayment->save();

                                            $data = FileManager::find($EventFile->file_manager_id);
                                            $new_data = $data->replicate();
                                            $new_data->created_at = Carbon::now();
                                            $new_data->date_time=Carbon::now();
                                            $new_data->user_id=auth()->user()->id;
                                            $new_data->from = $event->user_fk_id;
                                            $new_data->save();
                                        }

                                $users=User::where('id',$event->user_fk_id)->get();
                                $details = [
                                    'body' =>$event->event_title,
                                    'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                    'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id).'" target="_blank">'.$event->event_title.'</a>',
                                    'description' => 'You have a file purchase',
                                    'greeting' => 'Hi ' . $user->name,
                                    'thanks' => 'Thank you for using ' . url('/') . '!',
                                    'actionText' => 'Cancelled Event',
                                    'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                                    'order_id' => $event->id
                                ];
                                $pdetails = [
                                    'body' =>$event->event_title,
                                    'image' =>json_decode($event->event_files,true)[0]['file_url'],
                                    'title' => '<a href="'.url('/event?token=' . $event->remember_token . '&event=' . $event->id).'" target="_blank">'.$event->event_title.'</a>',
                                    'description' => 'You have purchased a file',
                                    'greeting' => 'Hi ' . $user->name,
                                    'thanks' => 'Thank you for using ' . url('/') . '!',
                                    'actionText' => 'Cancelled Event',
                                    'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                                    'order_id' => $event->id
                                ];
                                    Notification::send($users, new FilePurchasedHostEmail($details));
                                    Notification::send($user, new FilePurchasedUserEmail($pdetails));
                                    event(new UserNotification($user));
                                    } else {
                                        return response()->json(["status" => 'failed', "message" => "Payment not done try again"]);
                                    }
                                }
                        
                        DB::commit();
                        return response()->json(["status" => $this->status_code, "message" => "Payment Done Successfully", "data" => $payment]);
                        // return response()->json(["status" => $this->status_code, "message" => "Payment Done Successfully", "data" => []]);
                    }
                }
            }else{
                return response()->json(["status" => "failed", "message" => "file does not exist", "data" => []]);
            }
            } catch (PDOException $e) {
                DB::rollBack();
                return response()->json($e);
            }
        } else {
            return response()->json("login first");
        }
     }
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
        $Payment = EventPayment::where('id', $id)->first();

        if ($Payment) {

            return response()->json(['show' => $Payment]);
        } else {

            return response()->json(['show' => $id]);
        }
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

    //::::: for meeting room stripe payment :::::://
    public function update(Request $request)
    {
        //
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        $user = auth()->user();
        
        $slotEvent=EventTimeSlot::where('meeting_room_id',$request->roomId)->with(['Events'])->first();
        $ExtendedDuration=ExtendDuration::where('room_id',$request->roomId)->orderBy('id','desc')->first();
        if(!is_null($slotEvent)){              
            $PaymentSlot=EventPayment::where('user_fk_id',$user->id)->where('event_time_slot_id',$slotEvent->id)->where('event_fk_id',$slotEvent->event_fk_id)->where('paid',1)->first();

            try {
                DB::beginTransaction();
                // Check all probability
                if($slotEvent->cost>0&&$slotEvent->cost==$request->cost&&is_null($ExtendedDuration)){
                    // $payment = $stripe->paymentIntents->create([
                    //     'amount' => 100 * (float)$slotEvent->cost,
                    //     'currency' => 'usd',
                    //     'payment_method' => $request->stripeToken,
                    //     'confirm' => true,
                    //     'receipt_email' => auth()->user()->email,
                    //     'description' => 'Payment for' . $slotEvent->Events->title,
                    // ]);
                    if($request->saveCard){ 
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                              $attached = $stripe->paymentMethods->attach(
                                  $request->stripeToken,
                                  ['customer' =>$customer->id]
                              );
                              $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$slotEvent->cost,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$customer->id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title,
                            ]);
                          User::where('id',$user->id)->update([
                              "stripe_customer_id"=>$customer->id
                          ]); 
                        }else{
                            $attached = $stripe->paymentMethods->attach(
                                $request->stripeToken,
                                ['customer' =>$user->stripe_customer_id]
                            );
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$slotEvent->cost,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$user->stripe_customer_id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title]);
                        }
                    }else{
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                            User::where('id',$user->id)->update([
                                "stripe_customer_id"=>$customer->id
                            ]);
                        }
                        $payment = $stripe->paymentIntents->create([
                            'amount' => 100 * (float)$slotEvent->cost,
                            'currency' => 'usd',
                            'payment_method' => $request->stripeToken,
                            'confirm' => true,
                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                            'receipt_email' => auth()->user()->email,
                            'description' => 'Payment for' . $slotEvent->Events->title
                        ]);
                    }
                    if($payment->status == "succeeded") {
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact(); 
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $slotEvent->cost;
                        $eventPayment->stripe_id = $payment->id;
                        $eventPayment->paid = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->amount_refunded = $payment->amount_refunded;
                        $eventPayment->transaction_id = $payment->balance_transaction;
                        $eventPayment->status = $payment->status;
                        $eventPayment->save();
                        EventTimeSlot::whereId($slotEvent->id)->where('event_fk_id', $slotEvent->event_fk_id)->update([
                            'booked_seats' => (int)$slotEvent->booked_seats + 1,
                        ]);
                        $EventBooking = new EventBooking();
                        $EventBooking->event_fk_id = $slotEvent->event_fk_id;
                        $EventBooking->event_slot_id = $slotEvent->id;
                        $EventBooking->p_user_id = $user->id;
                        $EventBooking->h_user_id = $slotEvent->Events->user_fk_id;
                        $EventBooking->meeting_room_id = $slotEvent->meeting_room_id;
                        $EventBooking->cost_type = $slotEvent->cost_type;
                        $EventBooking->cost = $slotEvent->cost;
                        $EventBooking->duration = $slotEvent->duration;
                        $EventBooking->booked_seats = 1;
                        $EventBooking->total_seats = (int)$slotEvent->total_seats;
                        $EventBooking->start_date = Carbon::parse($slotEvent->start_date)->format('Y-m-d');
                        $EventBooking->start_time = Carbon::parse($slotEvent->start_time)->format('H:i');
                        $EventBooking->end_date = Carbon::parse($slotEvent->end_date)->format('Y-m-d');
                        $EventBooking->end_date_time = Carbon::parse($slotEvent->end_date_time)->format('Y-m-d H:i');
                        $EventBooking->end_time = Carbon::parse($slotEvent->end_time)->format('H:i');
                        $EventBooking->start_date_time = Carbon::parse($slotEvent->start_date_time)->format('Y-m-d H:i');
                        $EventBooking->status = "enabled";
                        $EventBooking->remember_token = $slotEvent->remember_token;
                        $EventBooking->save();               
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 1','data'=>$eventPayment]);
                    } else {
                        return response()->json(["status" => 'failed', "message" => "Payment failed try again 1"]);
                    }
                }elseif($slotEvent->cost==0&&$slotEvent->cost==$request->cost&&is_null($ExtendedDuration)){
                    $totVal=$slotEvent->cost;
                    if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                    }else{
                        $contacts = new UserContact(); 
                        $contacts->user_id = $slotEvent->Events->user_fk_id; 
                        $contacts->contact_id = $user->id; 
                        $contacts->remember_token = Str::random(70); 
                        $contacts ->save(); 
                    } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->paid = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->status = "succeeded";
                        $eventPayment->remember_token =Str::random(70) ;
                        $eventPayment->save();
                        EventTimeSlot::whereId($slotEvent->id)->where('event_fk_id', $slotEvent->event_fk_id)->update([
                            'booked_seats' => (int)$slotEvent->booked_seats + 1,
                        ]);
                        $EventBooking = new EventBooking();
                        $EventBooking->event_fk_id = $slotEvent->event_fk_id;
                        $EventBooking->event_slot_id = $slotEvent->id;
                        $EventBooking->p_user_id = $user->id;
                        $EventBooking->h_user_id = $slotEvent->Events->user_fk_id;
                        $EventBooking->meeting_room_id = $slotEvent->meeting_room_id;
                        $EventBooking->cost_type = $slotEvent->cost_type;
                        $EventBooking->cost = $slotEvent->cost;
                        $EventBooking->duration = $slotEvent->duration;
                        $EventBooking->booked_seats = 1;
                        $EventBooking->total_seats = (int)$slotEvent->total_seats;
                        $EventBooking->start_date = Carbon::parse($slotEvent->start_date)->format('Y-m-d');
                        $EventBooking->start_time = Carbon::parse($slotEvent->start_time)->format('H:i');
                        $EventBooking->end_date = Carbon::parse($slotEvent->end_date)->format('Y-m-d');
                        $EventBooking->end_date_time = Carbon::parse($slotEvent->end_date_time)->format('Y-m-d H:i');
                        $EventBooking->end_time = Carbon::parse($slotEvent->end_time)->format('H:i');
                        $EventBooking->start_date_time = Carbon::parse($slotEvent->start_date_time)->format('Y-m-d H:i');
                        $EventBooking->status = "enabled";
                        $EventBooking->remember_token = $slotEvent->remember_token;
                        $EventBooking->save(); 
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 2','data'=>$eventPayment]);
                   
                }elseif($slotEvent->cost>0&&$slotEvent->cost!=$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost>0){
                    $totVal=$ExtendedDuration->cost+$slotEvent->cost;
                    // $payment = $stripe->paymentIntents->create([
                    //     'amount' => 100 * (float)$totVal,
                    //     'currency' => 'usd',
                    //     'payment_method' => $request->stripeToken,
                    //     'confirm' => true,
                    //     'receipt_email' => auth()->user()->email,
                    //     'description' => 'Payment for' . $slotEvent->Events->title,
                    // ]);
                    if($request->saveCard){ 
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                              $attached = $stripe->paymentMethods->attach(
                                  $request->stripeToken,
                                  ['customer' =>$customer->id]
                              );
                              $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$customer->id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title,
                            ]);
                          User::where('id',$user->id)->update([
                              "stripe_customer_id"=>$customer->id
                          ]); 
                        }else{
                            $attached = $stripe->paymentMethods->attach(
                                $request->stripeToken,
                                ['customer' =>$user->stripe_customer_id]
                            );
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$user->stripe_customer_id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title]);
                        }
                    }else{
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                            User::where('id',$user->id)->update([
                                "stripe_customer_id"=>$customer->id
                            ]);
                        }
                        $payment = $stripe->paymentIntents->create([
                            'amount' => 100 * (float)$totVal,
                            'currency' => 'usd',
                            'payment_method' => $request->stripeToken,
                            'confirm' => true,
                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                            'receipt_email' => auth()->user()->email,
                            'description' => 'Payment for' . $slotEvent->Events->title
                        ]);
                    }
                    if($payment->status == "succeeded") {
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact();
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->stripe_id = $payment->id;
                        $eventPayment->paid = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->extended = true;
                        $eventPayment->with_extended = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->amount_refunded = $payment->amount_refunded;
                        $eventPayment->transaction_id = $payment->balance_transaction;
                        $eventPayment->status = $payment->status;
                        $eventPayment->save();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 3','data'=>$eventPayment]);
                    } else {
                        return response()->json(["status" => 'failed', "message" => "Payment failed try again 2"]);
                    }

                }elseif(is_null($PaymentSlot)&&$slotEvent->cost>0&&$slotEvent->cost==$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost==0){

                    $totVal=$ExtendedDuration->cost+$slotEvent->cost;
                    // $payment = $stripe->paymentIntents->create([
                    //     'amount' => 100 * (float)$totVal,
                    //     'currency' => 'usd',
                    //     'payment_method' => $request->stripeToken,
                    //     'confirm' => true,
                    //     'receipt_email' => auth()->user()->email,
                    //     'description' => 'Payment for' . $slotEvent->Events->title,
                    // ]);
                    if($request->saveCard){ 
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                              $attached = $stripe->paymentMethods->attach(
                                  $request->stripeToken,
                                  ['customer' =>$customer->id]
                              );
                              $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$customer->id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title,
                            ]);
                          User::where('id',$user->id)->update([
                              "stripe_customer_id"=>$customer->id
                          ]); 
                        }else{
                            $attached = $stripe->paymentMethods->attach(
                                $request->stripeToken,
                                ['customer' =>$user->stripe_customer_id]
                            );
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$user->stripe_customer_id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title]);
                        }
                    }else{
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                            User::where('id',$user->id)->update([
                                "stripe_customer_id"=>$customer->id
                            ]);
                        }
                        $payment = $stripe->paymentIntents->create([
                            'amount' => 100 * (float)$totVal,
                            'currency' => 'usd',
                            'payment_method' => $request->stripeToken,
                            'confirm' => true,
                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                            'receipt_email' => auth()->user()->email,
                            'description' => 'Payment for' . $slotEvent->Events->title
                        ]);
                    }
                    if($payment->status == "succeeded") {
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact(); 
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->stripe_id = $payment->id;
                        $eventPayment->paid = true;
                        $eventPayment->extended = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->with_extended = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->amount_refunded = $payment->amount_refunded;
                        $eventPayment->transaction_id = $payment->balance_transaction;
                        $eventPayment->status = $payment->status;
                        $eventPayment->save();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 4','data'=>$eventPayment]);
                    } else {
                        return response()->json(["status" => 'failed', "message" => "Payment failed try again 3"]);
                    }

                }elseif(is_null($PaymentSlot)&&$slotEvent->cost==0&&$slotEvent->cost!=$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost>0){

                    $totVal=$ExtendedDuration->cost+$slotEvent->cost;
                    // $payment = $stripe->paymentIntents->create([
                    //     'amount' => 100 * (float)$totVal,
                    //     'currency' => 'usd',
                    //     'payment_method' => $request->stripeToken,
                    //     'confirm' => true,
                    //     'receipt_email' => auth()->user()->email,
                    //     'description' => 'Payment for' . $slotEvent->Events->title,
                    // ]);
                    if($request->saveCard){ 
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                              $attached = $stripe->paymentMethods->attach(
                                  $request->stripeToken,
                                  ['customer' =>$customer->id]
                              );
                              $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$customer->id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title,
                            ]);
                          User::where('id',$user->id)->update([
                              "stripe_customer_id"=>$customer->id
                          ]); 
                        }else{
                            $attached = $stripe->paymentMethods->attach(
                                $request->stripeToken,
                                ['customer' =>$user->stripe_customer_id]
                            );
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$user->stripe_customer_id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title]);
                        }
                    }else{
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                            User::where('id',$user->id)->update([
                                "stripe_customer_id"=>$customer->id
                            ]);
                        }
                        $payment = $stripe->paymentIntents->create([
                            'amount' => 100 * (float)$totVal,
                            'currency' => 'usd',
                            'payment_method' => $request->stripeToken,
                            'confirm' => true,
                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                            'receipt_email' => auth()->user()->email,
                            'description' => 'Payment for' . $slotEvent->Events->title
                        ]);
                    }
                    if($payment->status == "succeeded") {
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact(); 
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->stripe_id = $payment->id;
                        $eventPayment->paid = true;
                        $eventPayment->extended = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->with_extended = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->amount_refunded = $payment->amount_refunded;
                        $eventPayment->transaction_id = $payment->balance_transaction;
                        $eventPayment->status = $payment->status;
                        $eventPayment->save();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 5','data'=>$eventPayment]);
                    } else {
                        return response()->json(["status" => 'failed', "message" => "Payment failed try again 4"]);
                    }
                }elseif($slotEvent->cost==0&&$slotEvent->cost!=$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost==0){

                    $totVal=$ExtendedDuration->cost+$slotEvent->cost;
                    if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                    }else{
                        $contacts = new UserContact(); 
                        $contacts->user_id = $slotEvent->Events->user_fk_id; 
                        $contacts->contact_id = $user->id; 
                        $contacts->remember_token = Str::random(70); 
                        $contacts ->save(); 
                    } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->paid = true;
                        $eventPayment->extended = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->with_extended = true;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->status = "succeeded";
                        $eventPayment->save();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 6','data'=>$eventPayment]);
                    
                }elseif(!is_null($PaymentSlot)&&$ExtendedDuration->cost==$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost==0){
                    if(EventPayment::where('extended_id',$ExtendedDuration->id)->first()){
                            return response()->json(["status" => 'failed', "message" => "You did Payment Already for extend duration"]);
                    }else{
                        $totVal=$ExtendedDuration->cost;
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact(); 
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $totVal;
                        $eventPayment->paid = true;
                        $eventPayment->extended = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->status = "succeeded";
                        $eventPayment->save();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 7','data'=>$eventPayment]);
                    
                    }
                }elseif(!is_null($PaymentSlot)&&$ExtendedDuration->cost==$request->cost&&!is_null($ExtendedDuration)&&$ExtendedDuration->cost>0){
                    $totVal=$ExtendedDuration->cost;
                    // $payment = $stripe->paymentIntents->create([
                    //     'amount' => 100 * (float)$totVal,
                    //     'currency' => 'usd',
                    //     'payment_method' => $request->stripeToken,
                    //     'confirm' => true,
                    //     'receipt_email' => auth()->user()->email,
                    //     'description' => 'Payment for' . $slotEvent->Events->title,
                    // ]);
                    if($request->saveCard){ 
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                              $attached = $stripe->paymentMethods->attach(
                                  $request->stripeToken,
                                  ['customer' =>$customer->id]
                              );
                              $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$customer->id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title,
                            ]);
                          User::where('id',$user->id)->update([
                              "stripe_customer_id"=>$customer->id
                          ]); 
                        }else{
                            $attached = $stripe->paymentMethods->attach(
                                $request->stripeToken,
                                ['customer' =>$user->stripe_customer_id]
                            );
                            $payment = $stripe->paymentIntents->create([
                                'amount' => 100 * (float)$totVal,
                                'currency' => 'usd',
                                'payment_method' => $attached->id,
                                'confirm' => true,
                                'customer' =>$user->stripe_customer_id,
                                'receipt_email' => auth()->user()->email,
                                'description' => 'Payment for' . $slotEvent->Events->title]);
                        }
                    }else{
                        if(!$user->stripe_customer_id){
                            $customer = $stripe->customers->create([
                                'description' => $user->name,
                                'email' => $user->email,
                            ]);
                            User::where('id',$user->id)->update([
                                "stripe_customer_id"=>$customer->id
                            ]);
                        }
                        $payment = $stripe->paymentIntents->create([
                            'amount' => 100 * (float)$totVal,
                            'currency' => 'usd',
                            'payment_method' => $request->stripeToken,
                            'confirm' => true,
                            'customer' =>$user->stripe_customer_id?$user->stripe_customer_id:$customer->id,
                            'receipt_email' => auth()->user()->email,
                            'description' => 'Payment for' . $slotEvent->Events->title
                        ]);
                    }
                    if($payment->status == "succeeded") {
                        if(UserContact::where('user_id',$slotEvent->Events->user_fk_id)->where('contact_id',$user->id)->count()>0){

                        }else{
                            $contacts = new UserContact(); 
                            $contacts->user_id = $slotEvent->Events->user_fk_id; 
                            $contacts->contact_id = $user->id; 
                            $contacts->remember_token = Str::random(70); 
                            $contacts ->save(); 
                        } 
                        $eventPayment = new EventPayment();
                        $eventPayment->user_fk_id = $user->id;
                        $eventPayment->to_user = $slotEvent->Events->user_fk_id;
                        $eventPayment->event_time_slot_id = $slotEvent->id;
                        $eventPayment->event_fk_id = $slotEvent->Events->id;
                        $eventPayment->event_date_time = Carbon::now();
                        $eventPayment->amount = $slotEvent->cost;
                        $eventPayment->stripe_id = $payment->id;
                        $eventPayment->paid = true;
                        $eventPayment->extended = true;
                        $eventPayment->extended_id = $ExtendedDuration->id;
                        $eventPayment->accept_by_host = "accepted";
                        $eventPayment->amount_refunded = $payment->amount_refunded;
                        $eventPayment->transaction_id = $payment->balance_transaction;
                        $eventPayment->status = $payment->status;
                        $eventPayment->save();
                        DB::commit();
                    
                        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Payment Done Successfully 8','data'=>$eventPayment]);
                    
                    } else {

                        return response()->json(["status" => 'failed', "message" => "Payment failed try again 5"]);
                    }
                }else{

                    return response()->json(["status" => 'failed', "message" => "Something went wrong..."]);

                }




            } catch (PDOException $e) {
                DB::rollBack();
                return response()->json($e);
            }

           }
    }






    public function destroy($id)
    {
        //
        $Payment = EventPayment::where('id', $id)->delete();
        if ($Payment) {
            return response()->json($Payment);
        } else {
            return response()->json(['delete' => $id]);
        }
    }
}
