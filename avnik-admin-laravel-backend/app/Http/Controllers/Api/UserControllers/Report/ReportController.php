<?php

namespace App\Http\Controllers\Api\UserControllers\Report;

use App\Http\Controllers\Controller;
use App\Models\Events\EventReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
class ReportController extends Controller
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
        $user=Auth()->user();
        $validator =  Validator::make($request->all(), [
            'report' => 'required',
            'comment' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        } else {
            if($request->userId!=$user->id || $request->eventId){
                $eventReport =new EventReport();
                $eventReport->user_fk_id=$user->id;
                $eventReport->r_event_id=$request->eventId;
                $eventReport->r_user_id=$request->userId;
                $eventReport->report=$request->report;
                $eventReport->comment=$request->comment;
                $eventReport->remember_token=Str::random(60);
                $eventReport->save();
                return response()->json(["status"=> $this->status_code,"message"=>"Reported Successfully", "data" => $eventReport]);
            }else{
                if($request->userId==$user->id){
                    return response()->json(["status"=> 'failed',"success"=>false, "message" =>'Sorry you can not reported yourself']);
                }else{
                    return response()->json(["status"=> 'failed',"success"=>false, "message" =>'Something wen wrong']);
                }

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
