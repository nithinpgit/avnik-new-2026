<?php

namespace App\Http\Controllers\Api\UserControllers\UserPayments;

use App\Events\User\UserActivity;
use App\Http\Controllers\Controller;
use App\Models\Events\EventFilePayment;
use App\Models\Events\EventPayment;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $stats_code = 200;

    public function index(Request $request)
    {
        //




    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
// return $request;
        //
        if(auth()->check()){
            $user=auth()->user();
            if($user->role === "admin"){
                $FindUser=User::find($request->userId);
                if(!empty($FindUser)){
                    try{
                        DB::beginTransaction();
                        $eventPayment=EventPayment::where('to_user',$FindUser->id)->where('id',$request->paymentId)->first();
                    // return response()->json(["status" => 200, "message" => "refunded successfully", 'data' => [$eventPayment]]);

                        if(!empty($eventPayment)>0){
                                if(!empty($eventPayment->stripe_id)){
                                    $stripeRefund = $stripe->refunds->create([
                                        'payment_intent' => $eventPayment->stripe_id,
                                        'amount' => ($eventPayment->amount*$request->percentage/100)*100,
                                    ]);
                                    $eventPaymentUpdate=EventPayment::where('id',$eventPayment->id)->update([
                                        'amount_refunded'=>1,
                                        'refunded_amount'=>($eventPayment->amount*$request->percentage)/100,
                                        'refund_id'=>$stripeRefund->id,
                                        'refund_description'=>$request->description,
                                        'refunded_percentage'=>$request->percentage
                                    ]);
                                    }
            
                        }
                    return response()->json(["status" => 200, "message" => "refunded successfully", 'data' => [$eventPaymentUpdate,$stripeRefund]]);
                        DB::commit();
                    }catch(\Exception $e){
                        DB::rollback();
                    }
                }else{
                    return response()->json(["status" => "failed", "message" => "user not found", 'data' => []]);

                }
                
            }else{
            try{
                // DB::beginTransaction();
                $eventPayment=EventPayment::where('id',$request->paymentId)->first();
                if(!empty($eventPayment)){
                        if(!empty($eventPayment->stripe_id)){
                            // return $request->all();

                            $stripeRefund = $stripe->refunds->create([
                                'payment_intent' => $eventPayment->stripe_id,
                                'amount' => ($eventPayment->amount*$request->percentage/100)*100,
                              ]);
                              if($eventPayment->amount_refunded){
                                try{
                                    $eventPaymentUpdate=EventPayment::where('id',$request->paymentId)->update([
                                        // 'amount_refunded'=>1,
                                        'refunded_amount'=>$eventPayment->refunded_amount + ($eventPayment->amount*$request->percentage)/100,
                                        'refund_id'=>$stripeRefund->id,
                                        'refund_description'=>$request->description,
                                        'refunded_percentage'=>$request->percentage + $eventPayment->refunded_percentage
                                      ]);
                                }catch(\Exception $e){
                                //    return response()->json('Stripe refund or database update failed: ' . $e->getMessage());
                                }
                                
                                
                              }else{
                                try{
                                    $eventPaymentUpdate=EventPayment::where('id',$request->paymentId)->update([
                                        'amount_refunded'=>1,
                                        'refunded_amount'=>($eventPayment->amount*$request->percentage)/100,
                                        'refund_id'=>$stripeRefund->id,
                                        'refund_description'=>$request->description,
                                        'refunded_percentage'=>$request->percentage
                                      ]);
                                }catch(\Exception $e){
                                //    return response()->json('Stripe refund or database update failed: ' . $e->getMessage());
                                }
                              }
                return response()->json(["status" => 200, "message" => "refunded successfully", 'data' => [$eventPaymentUpdate,$stripeRefund]]);  
                              
                            }
     
                }
            // return response()->json(["status" => 200, "message" => "refunded successfully", 'data' => [$eventPaymentUpdate,$stripeRefund]]);
                // DB::commit();
            }catch(\Exception $e){
                // DB::rollback();
                return $e->getMessage();
            }
            }
        }else{
            return response()->json(["status" => "failed", "message" => "please login again", 'data' => []]);

        }
        
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
        $startDate = Carbon::parse($request->dateStart)->setTimezone('UTC')->startOfDay()->toDateTimeString();
        $endDate = Carbon::parse($request->dateEnd)->setTimezone('UTC')->endOfDay()->toDateTimeString();

        $user = auth()->user();
        if ($request->filterType == "All") {
            if ($request->filterQuery != null) {
                $event = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where('stripe_id', '!=', null)
                ->where(function($q)use($request){
                    $q->orWhere('user_fk_id', auth()->user()->id)
                    ->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('to_user', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
                
                
                $Amount = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')
                ->where('to_user', auth()->user()->id)
                ->orWhere('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();
                $FilePaymentAmount = EventFilePayment::with(['PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->orWhere('payer_id', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')
                ->where('to_user_id', auth()->user()->id)
                ->orWhere('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();

                event(new UserActivity(request()->ip()));
            } else {
                event(new UserActivity(request()->ip()));
                $Amount = EventPayment::where('amount', '>', 0)
                ->where(function($q){
                    $q->where('to_user', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->get();
                // $event = EventFilePayment::with(['PaidUser', 'ToUser'])
                // ->where('amount', '>', 0)
                // ->where(function($q){
                //     $q->where('to_user_id', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                // })->orderBy('updated_at', 'DESC')->get();
                $event = EventPayment::with(['Events','EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where(function($q){
                    $q->where('to_user', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->paginate(20);
                // return array_multisort($eventFile,$event);
            }

            if ($Amount->count() > 0) {
                $eventArray = [];
                $ReceivedAmount = 0;
                $SentAmount = 0;
                $TotalWithdraw = 0;
                $AvailableToWithdraw=0;
                foreach ($Amount as $key=> $events) {
                    if (!empty($events->refund_id)&&$events->refunded_percentage==100) {
                        continue;
                    }elseif(!empty($events->refund_id)&&($events->refunded_percentage>0 || $events->refunded_percentage<100)){
                        $events->amount =$events->amount- $events->refunded_amount;
                    }
                    
                    if ($events->user_fk_id == auth()->user()->id) {

                        $SentAmount = $SentAmount + $events->amount;
                    } elseif ($events->to_user == auth()->user()->id && $events->withdraw_amount==0) {
                        $ReceivedAmount = $ReceivedAmount + $events->amount;
                    }elseif($events->to_user == auth()->user()->id && $events->withdraw_amount==1){
                        $TotalWithdraw = $TotalWithdraw + $events->amount;
                    }
                    if($events->to_user == auth()->user()->id&&$events->withdraw_amount==0&&$events->released==1){
                        $AvailableToWithdraw = $AvailableToWithdraw + $events->amount;
                    }
                    // return $events->to_user[$key];
                }

                $eventArray = ['Payment' => $event, 'AvailableToWithdraw'=>$AvailableToWithdraw * 80 / 100,'SendPayment' => $SentAmount, 'ReceivedPayment' => $ReceivedAmount, 'TotalAwaiting' => $ReceivedAmount, 'TotalWithdraw' => $TotalWithdraw* 80 / 100];

                return response()->json(["status" => $this->stats_code, "message" => "Getting all payment successfully", "data" => $eventArray]);
            } else {

                return response()->json(["status" => "failed", "message" => "We not fount any Payment"]);
            }
        }elseif($request->filterType==="FilePayment"){
            // start file payments
            if ($request->filterQuery != null) {
                $event = EventFilePayment::with(['PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where('payer_id', '!=', null)
                ->where(function($q)use($request){
                    $q->orWhere('user_fk_id', auth()->user()->id)
                    ->orWhere('payer_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('to_user_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
                
                $Amount = EventFilePayment::with(['PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')
                ->where('to_user_id', auth()->user()->id)
                ->orWhere('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();
                event(new UserActivity(request()->ip()));
            } else {
                event(new UserActivity(request()->ip()));
                $Amount = EventFilePayment::where('amount', '>', 0)
                ->where(function($q){
                    $q->where('to_user_id', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->get();
                // $event = EventFilePayment::with(['PaidUser', 'ToUser'])
                // ->where('amount', '>', 0)
                // ->where(function($q){
                //     $q->where('to_user_id', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                // })->orderBy('updated_at', 'DESC')->get();
                $event = EventFilePayment::with(['PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where(function($q){
                    $q->where('to_user_id', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->paginate(20);
                // return array_multisort($eventFile,$event);
            }

            if ($Amount->count() > 0) {
                $eventArray = [];
                $ReceivedAmount = 0;
                $SentAmount = 0;
                $TotalWithdraw = 0;
                $AvailableToWithdraw = 0;
                foreach ($Amount as $events) {
                    if (!empty($events->refund_id)&& refunded_percentage==100) {
                        continue;
                    }elseif(!empty($events->refund_id)&&($events->refunded_percentage>0&&$events->refunded_percentage<100)){
                        $refundedAmount = $events->amount * $events->refunded_percentage / 100;
                        $amount = $events->amount - $refundedAmount;
                    }
                    if ($events->user_fk_id == auth()->user()->id) {
                        $SentAmount = $SentAmount + $events->amount;
                    } if ($events->to_user == auth()->user()->id && $events->withdraw_amount==0) {
                        $ReceivedAmount = $ReceivedAmount + $events->amount;
                        // $TotalWithdraw = $TotalWithdraw + $events->withdraw_amount;
                    } if($events->to_user == auth()->user()->id  && $events->withdraw_amount==1){
                        $TotalWithdraw = $TotalWithdraw + $events->amount;
                    }
                    if($events->to_user == auth()->user()->id&&$events->withdraw_amount==0&&$events->released==1){
                            $AvailableToWithdraw = $AvailableToWithdraw + $events->amount;
                    }
                }

                $eventArray = ['Payment' => $event,'AvailableToWithdraw'=>$AvailableToWithdraw * 80 / 100, 'SendPayment' => $SentAmount, 'ReceivedPayment' => $ReceivedAmount, 'TotalAwaiting' => $ReceivedAmount, 'TotalWithdraw' => $TotalWithdraw* 80 / 100];

                return response()->json(["status" => $this->stats_code, "message" => "Getting all payment successfully", "data" => $eventArray]);
            } else {

                return response()->json(["status" => "failed", "message" => "We not fount any Payment"]);
            }
            // end file payments
        } else if ($request->filterType == "Received") {
            if ($request->filterQuery != null) {
                $event = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where(function($q)use($request){
                  $q->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('to_user', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
                $Amount = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])->where('amount', '>', 0)->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')->where('to_user', auth()->user()->id)->orderBy('updated_at', 'DESC')->get();
                event(new UserActivity(request()->ip()));
            } else {
                event(new UserActivity(request()->ip()));
                $Amount = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where('to_user', auth()->user()->id)

                ->orderBy('updated_at', 'DESC')
                ->get();
                $event = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where('to_user', $user->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
            }
            if ($Amount->count() > 0) {
                $eventArray = [];
                $ReceivedAmount = 0;
                $SentAmount = 0;
                $TotalWithdraw = 0;
                $AvailableToWithdraw=0;
                foreach ($Amount as $events) {
                    if (!empty($events->refund_id)&& refunded_percentage==100) {
                        continue;
                    }elseif(!empty($events->refund_id)&&($events->refunded_percentage>0&&$events->refunded_percentage<100)){
                        $refundedAmount = $events->amount * $events->refunded_percentage / 100;
                        $amount = $events->amount - $refundedAmount;
                    }
                    if ($events->user_fk_id == auth()->user()->id) {

                        $SentAmount = $SentAmount + $events->amount;
                    }  if ($events->to_user == auth()->user()->id  && $events->withdraw_amount==0) {

                        $ReceivedAmount = $ReceivedAmount + $events->amount;

                        // $TotalWithdraw = $TotalWithdraw + $events->withdraw_amount;
                    } if($events->to_user == auth()->user()->id && $events->withdraw_amount==1){
                        $TotalWithdraw = $TotalWithdraw + $events->amount;
                    }
                    if($events->to_user == auth()->user()->id&&$events->withdraw_amount==0&&$events->released==1){
                        $AvailableToWithdraw = $AvailableToWithdraw + $events->amount;
                }
                }

            $eventArray = ['Payment' => $event, 'AvailableToWithdraw'=>$AvailableToWithdraw * 80 / 100,'SendPayment' => $SentAmount, 'ReceivedPayment' => $ReceivedAmount, 'TotalAwaiting' => $ReceivedAmount, 'TotalWithdraw' => $TotalWithdraw* 80 / 100];

                return response()->json(["status" => $this->stats_code, "message" => "Getting all payment successfully", "data" => $eventArray]);
            } else {

                return response()->json(["status" => "failed", "message" => "We not fount any Payment"]);
            }
        } else if ($request->filterType == "Sent") {
            if ($request->filterQuery != null) {
                event(new UserActivity(request()->ip()));
                $Amount = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where(function($q) use($request){
                    $q->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();
                $event = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where(function($q) use($request){
                    $q->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
            } else {
                event(new UserActivity(request()->ip()));
                $Amount = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();
                $event = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
            }
            if ($Amount->count() > 0) {
                $eventArray = [];
                $ReceivedAmount = 0;
                $SentAmount = 0;
                $TotalWithdraw = 0;
                $AvailableToWithdraw =0;
                foreach ($Amount as $events) {
                    if (!empty($events->refund_id)&& refunded_percentage==100) {
                        continue;
                    }elseif(!empty($events->refund_id)&&($events->refunded_percentage>0&&$events->refunded_percentage<100)){
                        $refundedAmount = $events->amount * $events->refunded_percentage / 100;
                        $amount = $events->amount - $refundedAmount;
                    }
                    if ($events->user_fk_id == auth()->user()->id) {
                        $SentAmount = $SentAmount + $events->amount;
                    } if ($events->to_user == auth()->user()->id  && $events->withdraw_amount==0) {
                        $ReceivedAmount = $ReceivedAmount + $events->amount;
                        // $TotalWithdraw = $TotalWithdraw + $events->withdraw_amount;
                    }if($events->to_user == auth()->user()->id && $events->withdraw_amount==1){
                        $TotalWithdraw = $TotalWithdraw + $events->amount;
                    }
                    if($events->to_user == auth()->user()->id&&$events->withdraw_amount==0&&$events->released==1){
                        $AvailableToWithdraw = $AvailableToWithdraw + $events->amount;
                }
                }

                $eventArray = ['Payment' => $event,'AvailableToWithdraw'=>$AvailableToWithdraw * 80 / 100, 'SendPayment' => $SentAmount, 'ReceivedPayment' => $ReceivedAmount, 'TotalAwaiting' => $ReceivedAmount, 'TotalWithdraw' => $TotalWithdraw* 80 / 100];
                event(new UserActivity(request()->ip()));
                return response()->json(["status" => $this->stats_code, "message" => "Getting all payment successfully", "data" => $eventArray]);
            } else {

                return response()->json(["status" => "failed", "message" => "We not fount any Payment"]);
            }
        }else if($request->filterType == "Date"){
            if ($request->filterQuery != null) {
                $event = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->where('stripe_id', '!=', null)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where(function($q)use($request){
                    $q->orWhere('user_fk_id', auth()->user()->id)
                    ->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                    ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%');
                })
                ->where('to_user', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->paginate(20);
                
                
                $Amount = EventPayment::with(['Events','EventTimeSlot', 'PaidUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }, 'ToUser'=>function($q)use($request){
                    $q->where('name', 'LIKE', '%' . $request->filterQuery . '%');
                }])
                ->where('amount', '>', 0)
                ->orWhere('stripe_id', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('amount', 'LIKE', '%' . $request->filterQuery . '%')
                ->orWhere('event_date_time', 'LIKE', '%' . $request->filterQuery . '%')
                ->where('to_user', auth()->user()->id)
                ->orWhere('user_fk_id', auth()->user()->id)
                ->orderBy('updated_at', 'DESC')
                ->get();
                event(new UserActivity(request()->ip()));
            } else {
                event(new UserActivity(request()->ip()));
                $Amount = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->where(function($q){
                    $q->where('to_user', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->get();
                $event = EventPayment::with(['EventTimeSlot', 'PaidUser', 'ToUser'])
                ->where('amount', '>', 0)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where(function($q){
                    $q->where('to_user', auth()->user()->id)->orWhere('user_fk_id', auth()->user()->id);
                })
                ->orderBy('updated_at', 'DESC')->paginate(20);
            }

            if ($Amount->count() > 0) {
                $eventArray = [];
                $ReceivedAmount = 0;
                $SentAmount = 0;
                $TotalWithdraw = 0;
                $AvailableToWithdraw =0;

                foreach ($Amount as $events) {
                    if (!empty($events->refund_id)&& refunded_percentage==100) {
                        continue;
                    }elseif(!empty($events->refund_id)&&($events->refunded_percentage>0&&$events->refunded_percentage<100)){
                        $refundedAmount = $events->amount * $events->refunded_percentage / 100;
                        $amount = $events->amount - $refundedAmount;
                    }
                    if ($events->user_fk_id == auth()->user()->id) {

                        $SentAmount = $SentAmount + $events->amount;
                    } if ($events->to_user == auth()->user()->id && $events->withdraw_amount==0) {

                        $ReceivedAmount = $ReceivedAmount + $events->amount;

                        // $TotalWithdraw = $TotalWithdraw + $events->withdraw_amount;
                    }if($events->to_user == auth()->user()->id && $events->withdraw_amount==1){
                        $TotalWithdraw = $TotalWithdraw + $events->amount;
                    }
                    if($events->to_user == auth()->user()->id&&$events->withdraw_amount==0&&$events->released==1){
                        $AvailableToWithdraw = $AvailableToWithdraw + $events->amount;
                    }
                    
                }

                $eventArray = ['Payment' => $event,'AvailableToWithdraw'=>$AvailableToWithdraw * 80 / 100, 'SendPayment' => $SentAmount, 'ReceivedPayment' => $ReceivedAmount, 'TotalAwaiting' => $ReceivedAmount, 'TotalWithdraw' => $TotalWithdraw * 80 / 100];

                return response()->json(["status" => $this->stats_code, "message" => "Getting all payment successfully", "data" => $eventArray]);
            } else {

                return response()->json(["status" => "failed", "message" => "We not fount any Payment"]);
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
        return $id;
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
        return 'edit';
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
        return $request;
    }

    public function invoice($id)
    {
        $invoice = EventPayment::with(['Events', 'EventTimeSlot', 'PaidUser', 'ToUser'])
            ->where('id', $id)
            ->first();

        if ($invoice) {
            return response()->json([
                "status" => 200,
                "message" => "Invoice data fetched successfully",
                "data" => $invoice
            ]);
        } else {
            return response()->json([
                "status" => "failed",
                "message" => "Invoice not found",
                "data" => []
            ]);
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
        return 'delete';
    }
}
