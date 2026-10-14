<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventPayment;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\ExtendDuration;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventsDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $status_code = 200;
    private $limit = 10;
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
        // $BookedEvents= EventPayment::where('user_fk_id',$user->id)->get();
        // $BookedEventData=[];
        // foreach($BookedEvents as  $BookedEvent){
        //     $meeting_room_id[]=$BookedEvent->EventTimeSlot->meeting_room_id;
        //     $extend_duration=ExtendDuration::whereIn('room_id',[$meeting_room_id])->get();
        //     $BookedEventData=Event::where('id',$BookedEvent->event_fk_id)->where('status',1)->select('id','user_fk_id','event_files','duration','event_title','event_type','event_visible','status','cost','remember_token')->with(['EventTimeSlot'=> function($q)use($BookedEvent){
        //         $q->where('id',$BookedEvent->event_time_slot_id)->select('id','event_fk_id','meeting_room_start_time','meeting_room_end_time','start_time','end_time','start_date','end_date','status');
        //     },'EventCreateUser'=> function($q){
        //         $q->select('users.name','users.id','users.username');
        //     }])->get();
        // }
        // $CreateEvents= Event::where('user_fk_id',$user->id)->where('status',1)->select('id','user_fk_id','duration','event_title','event_files','event_type','event_visible','status','cost','remember_token')->with(['EventTimeSlot'=> function($q){
        //     $q->where('status','enabled')->select('id','event_fk_id','meeting_room_start_time','meeting_room_end_time','start_time','end_time','start_date','end_date','status');
        // },'EventCreateUser'=> function($q){
        //     $q->select('users.name','users.id','users.username');
        // }])->orderBy('created_at','desc')->get();
        // $data=[];
        // if(count($CreateEvents)>0 && count($BookedEventData)>0){
        //     $data=$BookedEventData->merge($CreateEvents);
        // }else{
        //     if(count($CreateEvents)>0){
        //         $data=$CreateEvents;
        //     }elseif(count($BookedEventData)>0){
        //         $data=$BookedEventData;
        //     }
        // }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $slotIds = [];
        $events = Event::where('user_fk_id', $user->id)->get();
        foreach ($events as $event) {
            foreach ($event->EventTimeSlot as $Slot) {
                 if(count($Slot->EventPayment)>0){
                    $slotIds[] = $Slot->id;
                 }
            }
        }
        $bookEvents = EventPayment::where('user_fk_id', $user->id)->get();
        foreach ($bookEvents as $booked) {
            $slotIds[] = $booked->event_time_slot_id;
        }
        $EventTimeSlots = EventTimeSlot::where('status','enabled')->whereIn('id', $slotIds)
        ->with(['Events' => function ($q) {
            $q->select('id', 'user_fk_id', 'event_files', 'event_title', 'event_type', 'duration', 'cost', 'remember_token')->with(['EventCreateUser' => function ($q) {
                $q->select('name', 'id', 'username');
            }]);
        }, 'EventPayment' => function ($q) {
            $q->where('status', 'succeeded')->select('id', 'user_fk_id', 'event_fk_id', 'event_time_slot_id', 'to_user', 'amount', 'extended', 'amount_refunded', 'extended_id');
        }, 'Extended'])->orderBy('created_at', 'desc')->paginate(15);
        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $EventTimeSlots]);
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
        $user = auth()->user();
        $event = Event::where('user_fk_id', $user->id)->first();
        if (!is_null($event)) {
            $eventBooked = EventPayment::where('user_fk_id', $user->id)->where('event_fk_id', $id)->get();
        } else {
            $eventBooked = EventPayment::where('user_fk_id', $user->id)->where('event_fk_id', $id)->get();
        }


        return "show" . $id;
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
        return "edit" . $id;
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
        return "Update" . $id;
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
        return "destroy" . $id;
    }
}
