<?php

namespace App\Http\Controllers\Api\UserControllers\MeetingRoom;

use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\ExtendDuration;
use App\Models\QuickMeet\QuickMeet;
use App\User;
use Carbon\Carbon;
use Facade\FlareClient\Http\Client;
use GuzzleHttp\Client as GuzzleHttpClient;
use Http\Client\HttpClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MeetingRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public $status_code = 200;

    public function quickMeet(Request $request){
   
        if(Auth()->user()->id==$request->userId){
            if($request->userId){
                $QuickMeet= new QuickMeet();
                $QuickMeet->user_id=auth()->user()->id;
                $QuickMeet->room_id=rand(0,9999).substr(time(), -4).Str::random(24);
                $QuickMeet->remember_token=Str::random(70);
                $QuickMeet->save();
                if($QuickMeet){
                    $delete=QuickMeet::where('user_id',auth()->user()->id)->where('id','!=',$QuickMeet->id)->where('server_room_id',null)->delete();
                }
                return response()->json(['status' => $this->status_code, "success"=>true, 'message' => 'Quick Meet click on start',"data"=>$QuickMeet]);    
            }else{
                return response()->json(['status' => 'failed', 'message' => 'sorry we not found the meeting']);    
            }
        }
  
    }

    public function create(Request $request)
    {
        $user = User::find($request->userId);
        if ($user) {
            if ($user->id == auth()->user()->id) {
                if ($request->roomId) {
                    $quickMeet= QuickMeet::where('room_id',$request->roomId)->first();
                    if(!is_null($quickMeet)){
                        if(!is_null($quickMeet->server_room_id)){
                            $quickMeetServerId=$quickMeet->server_room_id;
                        }else{
                        $data = ["name" => "Quick Meet"];
                        $url = "https://meet.avnik.com:8080/createRoom";
                        $quickMeetServerId = $this->curlResponse($url, $data);
                        $quickMeetServerId = $quickMeetServerId['_id'];
                        }
                        try {
                            if($quickMeetServerId){
                                if(is_null($quickMeet->server_room_id)){
                                    $updateQuickMeet=  QuickMeet::where('room_id',$request->roomId)->update([
                                        'server_room_id'=>$quickMeetServerId,
                                    ]);
                                }
                                $meetUser=User::where('id', $quickMeet->user_id)->first();
                                if(auth()->user()->id==$meetUser->id){
                                    $meetUserData=['id'=>$meetUser->id,'name'=>$meetUser->name,'username'=>$meetUser->username,'email'=>$meetUser->email];
                                }else{
                                    $meetUserData=['name'=>$meetUser->name,'username'=>$meetUser->username];
                                }
                                $data=[
                                    'quickMeet'=>true,
                                    'meetingRoomId'=>$quickMeetServerId,
                                    'meetCreatedUser' => $meetUserData,
                                    'mode' => auth()->user()->id ==$quickMeet->user_id? "presenter" : "viewer",
                                ];
                                return response()->json(['status' => $this->status_code, "success"=>true, 'message' => 'Quick Meet click on start','data'=>$data]);    
                            }else{
                                return response()->json(['status' => 'failed', 'message' => 'sorry something went wrong']);

                            }
                            
                            
                        } catch (\Throwable $th) {

                            return response()->json($th);
                        }
                    }else{
                    
                    $slot = EventTimeSlot::where('meeting_room_id', $request->roomId)->first();
                    if(!is_null($slot)){

                        $event = Event::where('id', $slot->event_fk_id)->first();
                        
                    }else{
                        $event = null;
                        return response()->json(['status' => 'failed', 'message' => 'sorry we not find the meeting']);
                       

                    }

                    if (!empty($slot) && !empty($event)) {
                        
                        $data = ["name" => $event->event_title];
                        $url = "https://meet.avnik.com:8080/createRoom";
                        $meetServerId = $this->curlResponse($url, $data);
                        $meetServerId = $meetServerId['_id'];
                        try {
                            
                            if ($slot->meeting_room_server_id == null) {
                                $slotUpdate = EventTimeSlot::where('meeting_room_id', $request->roomId)->update([
                                    'meeting_room_server_id' => $meetServerId
                                ]);
                            }
                            
                            if($slot->current_status==="Ended"){
                                return response()->json(["status" => "failed", "success" => false, "message" => 'Meeting is ended']);
                                
                            }
                            
                            $event = Event::where('id', $slot->event_fk_id)->with(['EventTimeSlot' => function ($q) use ($slot) {
                                $q->where('event_time_slots.id', $slot->id);
                            }, 'EventPayment', 'EventCreateUser',])->first();
                            
                            if ($event) {

                                if ($event->user_fk_id == auth()->user()->id) {
                                    $event = $this->eventByIdFilter($event);
                                    return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                                } else {
                                    $eventPayment = EventPayment::where('user_fk_id', auth()->user()->id)->where('event_time_slot_id', $slot->id)->where('event_fk_id', $event->id)->where('status', 'succeeded')->first();
                                    if ($eventPayment) {
                                        if ($eventPayment->blocked_user){
                                            return response()->json(["status" => "failed", "success" => false, "message" => "You are blocked"]);
                                        }
                                        if ($event->eventSubscriptionType == "paid" && intval($event->cost) > 0) {
                                            
                                            if ($eventPayment->paid) {
                                            
                                                $event = $this->eventByIdFilter($event);
                                                return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                                            
                                            } else {
                                                $event = $this->eventByIdFilter($event);
                                            return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                                        
                                            
                                            }

                                        } else {

                                            $event = $this->eventByIdFilter($event);
                                            return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                                        
                                        }
                                    } else {
                                        $event = $this->eventByIdFilter($event);
                                        return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                                    
                                    }
                                }
                            } else {
                                return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this event']);
                            }
                        } catch (\Throwable $th) {

                            return response()->json($th);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'sorry we not find the meeting']);
                    }
                }
                }
            } else {
                return response()->json(['status' => "failed", "success" => false, 'message' => 'Please login again']);
            }
        }
    }


    public function curlResponse($url, $data)
    {
        // $client = new \GuzzleHttp\Client();
        // $response = $client->createRequest("POST", $url, ['body'=>$data]);
        // $response = $client->send($response);
        $response = Http::post($url, $data);
        return $response;
    }
    public function eventByIdFilter($event)
    {

        
        $eventImages = json_decode($event->event_files);
        $eventTags = json_decode($event->event_tags);

        $eventImagesArray = [];
        if (count($eventImages) > 0) {

            foreach ($eventImages as $eventFile) {
                $eventImagesArray[] = [
                    'id' => $eventFile->id,
                    //   'userId'=>$eventFile->user_id,
                    'size' => $eventFile->size,
                    'name' => $eventFile->name,
                    'fileUrl' => $eventFile->file_url,
                    'filePath' => $eventFile->file_path,
                    'type' => $eventFile->type,
                    //   'createAt'=>$eventFile->created_at,
                ];
            }
        }

        $eventUser = [
            'id' => $event->EventCreateUser['id'],
            'name' => $event->EventCreateUser['name'],
            'userName' => $event->EventCreateUser['username'],
            'email' => $event->EventCreateUser['email'],
            'phone' => $event->EventCreateUser['phone'],
            'role' => $event->EventCreateUser['role'],
            'profile' => $event->EventCreateUser->UserProfile,
            'avgRating' => 0,
            'joinedOn' => $event->EventCreateUser['joined_on'],
            'lastActive' => $event->EventCreateUser['last_active']
        ];

        if (count($event->EventTimeSlot) > 0) {
            $eventTimeSlot = [];
            foreach ($event->EventTimeSlot as $timeSlot) {
                $eventTimeSlot = [
                    'id' => $timeSlot->id,
                    'eventId' => $timeSlot->event_fk_id,
                    'meetingRoomId' => $timeSlot->meeting_room_id,
                    'meetingRoomServerId' => $timeSlot->meeting_room_server_id,
                    'meetingRoomStartTime' => $timeSlot->meeting_room_start_time,
                    'meetingRoomEndTime' => $timeSlot->meeting_room_end_time,
                    'startTime' => $timeSlot->start_time,
                    'startDateTime' => $timeSlot->start_date_time,
                    'endDateTime' => $timeSlot->end_date_time,
                    'cost' => $timeSlot->cost,
                    'endTime' => $timeSlot->end_time,
                    'startDate' => $timeSlot->start_date,
                    'endDate' => $timeSlot->end_date,
                    'currentStatus' => $timeSlot->current_status,
                    'currentDuration' => $timeSlot->current_duration,
                    'duration' => $timeSlot->duration,
                    'eventData' => $timeSlot->event_data,
                    'bookedSeats' => $timeSlot->booked_seats,
                    'totalSeats' => $timeSlot->total_seats,
                    'status' => $timeSlot->status,
                    'rememberToken' => $timeSlot->remember_token,
                    'createdAt' => $timeSlot->created_at,
                    'updatedAt' => $timeSlot->updated_at,
                ];
            }
        } else {
            $eventTimeSlot = [];
        }



        $remainingCost=0;

        if (count($event->EventPayment) > 0) {
            $eventPayment = [];
            foreach($event->EventPayment as $EventPayment) {
                   
                $eventPayment[] = [
                    'id' => $EventPayment->id,
                    'userId' => $EventPayment->user_fk_id,
                    'eventTimeSlotId' => $EventPayment->event_time_slot_id,
                    'eventId' => $EventPayment->event_fk_id,
                    'paymentDateTime' => $EventPayment->event_date_time,
                    'amount' => $EventPayment->amount,
                    'stripeId' => $EventPayment->stripe_id,
                    'extended' => $EventPayment->extended,
                    'extendedId' => $EventPayment->extended_id,
                    'transactionId' => $EventPayment->transaction_id,
                    'acceptByHost' => $EventPayment->accept_by_host,
                    'paid' => $EventPayment->paid,
                    'status' => $EventPayment->status,
                    'description' => $EventPayment->description,
                    'createdAt' => $EventPayment->created_at,
                    'updatedAt' => $EventPayment->updated_at,
                ];
            }
        } else {
            $eventPayment = $event->EventPayment;
        }

        $ExtendDuration=ExtendDuration::where('room_id',$eventTimeSlot['meetingRoomId'])->orderBy('id','desc')->get();
        
        $ExtendDurationTime=0;
        $ExtendEventId=0;
        if(count($ExtendDuration)>0){
            foreach($ExtendDuration as $extend){
                $ExtendEventId=$extend->id;
                $ExtendDurationTime=$ExtendDurationTime+intVal($extend->duration);
            }
        }else{
            $ExtendDurationTime=0;
        }
        
        $ExtendDurationId=ExtendDuration::where('room_id',$eventTimeSlot['meetingRoomId'])->orderBy('id','desc')->first(); 
        
        if($ExtendDurationId!=null){
            foreach($eventPayment as $Pay){

                if($ExtendDurationId->id==$Pay['extendedId']&&$Pay['extended']==true&&$Pay['extendedId']!=null){
                    if($ExtendDurationId->cost>0){
                            $remainingCost=0;
                    }else{
                        $remainingCost=$ExtendDurationId->cost;
                    }
                }else{
                    $remainingCost=$ExtendDurationId->cost;
                }
            }
        }  


        $booked=EventBooking::where('event_slot_id',$eventTimeSlot['id'])->where('status','enabled')->where('event_fk_id',$event->id)->where('p_user_id',auth()->user()->id)->first();
        
        $remainingCost=is_null($booked)?$remainingCost+$eventTimeSlot['cost']:$remainingCost;
             $categoryName=DB::table('categories')->where('id',$event->event_category)->first();
             $subCategoryName=DB::table('categories')->where('id',$event->event_sub_category)->first();
        $event = [
            'id' => $event->id,
            'eventTitle' => $event->event_title,
            'userId' => $event->user_fk_id,
            'eventImages' => $eventImagesArray,
            'eventType' => $event->event_type,
            'cost' => $event->cost,
            'status' => $event->status,
            'timezone' => $event->timezone,
            'duration' => $event->duration,
            'rememberToken' => $event->remember_token,
            'createdAt' => $event->created_at,
            'updatedAt' => $event->updated_at,
            'eventDescription' => $event->event_description,
            'eventTags' => $eventTags,
            'eventVisible' => $event->event_visible,
            'eventSubCategory' =>!empty($subCategoryName)?$subCategoryName->name:'N/A',
            'eventCategory' =>!empty($categoryName)?$categoryName->name:'N/A',
            'eventInvitedPeople' => $event->event_invited_people,
            'numberOfSeats' => $event->number_of_seats,
            'eventInvitedByEmail' => $event->event_invited_by_email,
            'eventCreatedUser' => $eventUser,
            'eventTimeSlot' => $eventTimeSlot,
            'extendedDuration' => $ExtendDurationTime,
            'eventPayment' => $eventPayment,
            'booked' => !is_null($booked)?true:false,
            'extendedDurationId'=>!is_null($ExtendDurationId)?$ExtendDurationId->id:false,
            'remainingCost' =>$remainingCost,
            'meetingRoomId' => $eventTimeSlot['meetingRoomServerId'],
            'mode' => auth()->user()->id == $event->user_fk_id ? "presenter" : "viewer",
        ];
        return $event;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = Event::where('user_fk_id', auth()->user()->id)->where('id', $request->eventId)->get();
        if (count($event) > 0) {
            return response()->json($event);
        } else {
            return response(auth()->user());
        }
    }

    public function blockUser(Request $request){
        $user = User::find(intval($request->userId));
        if ($user) {
            if ($request->roomId) {
                $slot = EventTimeSlot::where('meeting_room_id', $request->roomId)->first();
                $event = Event::where('id', $slot->event_fk_id)->first();
                if ($slot && $event) {
                    try {
                        DB::beginTransaction();
                        if ($request->block) {
                            $blocked =  EventPayment::where('user_fk_id', intval($request->userId))->update([
                                'blocked_user' => true,
                            ]);
                            DB::commit();
                            return response()->json(["status" => $this->status_code, "message" => "User blocked", "data" => $blocked]);
                        }
                    } catch (\Throwable $th) {
                        DB::rollBack();
                        return response()->json($th);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'message' => 'sorry we not find the meeting']);
                }
            }
            
        }else{
            return response()->json(['status' => 'failed', 'messages' => 'sorry we not found this user']);
        }
        
    }
    public function extendDuration(Request $request){
        
        $slot=EventTimeSlot::where('meeting_room_id',$request->roomId)->first();
        if(!is_null($slot)){
            if($request->userId==auth()->user()->id){
                if(!is_null($request->duration)&&!is_null($request->cost)&&!is_null($request->userId)&&!is_null($request->roomId)){
                   $eventDurationExt=new  ExtendDuration();
                   $eventDurationExt->user_id=$request->userId;
                   $eventDurationExt->cost=$request->cost;
                   $eventDurationExt->room_id=$request->roomId;
                   $eventDurationExt->duration=$request->duration;
                   $eventDurationExt->remember_token=Str::random(70);
                   $eventDurationExt->save();
                   return response()->json(["status" => $this->status_code, "message" => "Duration Extended Successfully ", "data" => $eventDurationExt]);
                }else{
                    return response()->json(["status" =>"failed", "message" => "response failed"]);
                }
            }else{
                    return response()->json(["status" =>"failed", "message" => "Sorry you can't extend"]);
            }    
        }else{
            return response()->json(["status" =>"failed", "message" => "sorry we are not found this event"]);
        }
        

    } 
    public function update(Request $request)
    {
        $user = User::find(intval($request->userId));
        if ($user->id==auth()->user()->id) {
            if ($request->roomId) {
                $slot = EventTimeSlot::where('meeting_room_id', $request->roomId)->first();
                $quickMeet=QuickMeet::where('room_id',$request->roomId)->first();  

                if(!empty($quickMeet)){
                    try {
                        DB::beginTransaction();
                        if(!is_null($slot)){
                           if($request->roomId&&$request->currentStatus&&$request->currentDuration){
                               $updateQuickMeet = QuickMeet::where('id',$quickMeet->id)->update([
                                    'current_duration'=>$request->currentDuration,
                                    'current_status'=>$request->currentStatus,
                                    'event_data'=>!is_null($request->currentData)?$request->currentData:$quickMeet->event_data,
                                ]);
                             DB::commit();
                            return response()->json(["status" => $this->status_code, "message" => "success", "data" =>$updateQuickMeet]);
                           }else{
                            return response()->json(["status" =>"failed", "message" => "response failed"]);
                           }
                        }
                    } catch (\Throwable $th) {
                        DB::rollBack();
                        return response()->json($th);
                    }
                    
                }else if(!empty($slot)){
                    $event = Event::where('id', $slot->event_fk_id)->first();
                    if ($slot && $event) {
                        try {
                            DB::beginTransaction();
                            if(!is_null($slot)){
                               if($request->roomId&&$request->currentStatus&&$request->currentDuration){
                                   $updateSlot = EventTimeSlot::where('id',$slot->id)->update([
                                        'current_duration'=>$request->currentDuration,
                                        'current_status'=>$request->currentStatus,
                                        'event_data'=>!is_null($request->currentData)?$request->currentData:$slot->event_data,
                                    ]);
                                 DB::commit();
                                return response()->json(["status" => $this->status_code, "message" => "success", "data" =>$updateSlot]);
                               }else{
                                return response()->json(["status" =>"failed", "message" => "response failed"]);
                               }
                            }
                        } catch (\Throwable $th) {
                            DB::rollBack();
                            return response()->json($th);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'sorry we not find the meeting']);
                    }
                }
                
            }
            
        }else{
            return response()->json(['status' => 'failed', 'messages' => 'sorry we not found your profile please try login ']);

        }
    }
}
