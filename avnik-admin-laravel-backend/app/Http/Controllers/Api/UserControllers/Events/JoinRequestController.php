<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\Events\EventTimeSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;


class JoinRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $status_code=200;
    
    public function index()
    {
        //

        return 'index';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return 'create';
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
        return 'store';
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
        $user=auth()->user();

        $events=EventTimeSlot::whereId($id)->with(['EventPayment','Events','EventBooking'=>function($q){
            $q->with(['HostUser'=>function($q){
                $q->select('id','role','username','name');
            },'ParticipantUser'=>function($q){
                $q->select('id','role','username','name');
            }])->withTrashed();
        }])->first();
        if($events){
            foreach($events->EventPayment as $eventPay){
                $eventPay->PaidUser;          
            }
        return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $events]);
        }else{
            return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this event']); 

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
        $event=Event::whereId($id)->where('user_fk_id',auth()->user()->id)->first();
        $validator              =        Validator::make($request->all(), [
            "eventId"              =>          "required",
            "userId"             =>          "required",
            "slotId"          =>          "required",
            'actionType' => 'required',
        ]);

    
        
        if($validator->fails()){
           
            if($event){
                Event::whereId($id)->update([
                    'auto_accept_participant'=>!$event->auto_accept_participant,
                ]);
                if(!$event->auto_accept_participant){

                
                    $eventPayment= EventPayment::where('event_fk_id',$id)->where('accept_by_host','pending')->get();
                    foreach($eventPayment as $Payment){
                        EventPayment::where('event_fk_id',$id)->update([
                            'accept_by_host'=>'accepted'   
                        ]);
                    }
                }

                return response()->json(["status" => $this->status_code, "message" => " Updated Successfully ","data"=>!$event->auto_accept_participant]);
            }else{
                
                return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this event']); 
    
            }

        }else{
          
          
            if($event){    

                $eventPayment= EventPayment::where('user_fk_id',$request->userId)->where('event_time_slot_id',$request->slotId)->where('event_fk_id',$request->eventId)->update([
                    'accept_by_host'=>$request->actionType 
                ]);
                if($request->actionType=="rejected"|| $request->actionType=="cancel"){
                    $eventPayment= EventPayment::where('user_fk_id',$request->userId)->where('event_time_slot_id',$request->slotId)->where('event_fk_id',$request->eventId)->first();
                   
                    \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
                        if($eventPayment){
                            $re = \Stripe\Refund::create([
                                'payment_intent' => $eventPayment->stripe_id,
                            ]);

                            EventPayment::where('user_fk_id',$request->userId)->where('event_time_slot_id',$request->slotId)->where('event_fk_id',$request->eventId)->update([
                                'refund_id'=>$re->id,
                                'refund_transaction'=>$re->balance_transaction,
                                'amount_refunded'=>$re->status=="succeeded"?true:false,
                                'paid'=>$re->status=="succeeded"?false:true,
                                'status'=>$re->status,
                                'event_date_time'=>Carbon::createFromTimestamp($re->created)->toDateTimeString()

                            ]);
        
                                return response()->json(["status" => $this->status_code, "message" => ' Request '.$request->actionType.'  successfully refund the payment ',"data"=>$re]);
                        }
                    


                }    
            return response()->json(["status" => $this->status_code, "message" => " Accept request  Successfully ","data"=>$eventPayment]);

          }else{

            return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this user payment']); 
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
        return 'delete';

    }
}
