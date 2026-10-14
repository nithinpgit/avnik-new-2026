<?php

namespace App\Http\Controllers\Api\UserControllers\Share;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UserSocailShareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function profileShare($username){
         try {
            $user = User::with(['UserProfile'=>function($query){
                $query->select('user_fk_id','about_me','profile_picture');
            }])->where('username',$username)->select('id','name','username')->first();
            return view('Share.ProfileShare.ProfileShare')->with('user', $user);
         } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error getting share data: ' . $e->getMessage()
            ], 500);
        }
    }

    public function eventShare($eventId){
         try {
            $user = auth()->user();
             $userType = $user ? $user->user_type : null;
             $event = \App\Models\Events\Event::find($eventId);
             return view('Share.EventShare.EventShare')->with('event', $event);
         } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error getting share data: ' . $e->getMessage()
            ], 500);
        }
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
