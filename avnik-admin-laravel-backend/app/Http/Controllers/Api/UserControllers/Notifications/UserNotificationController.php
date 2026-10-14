<?php

namespace App\Http\Controllers\Api\UserControllers\Notifications;

use App\Http\Controllers\Controller;
use App\Notifications\EventCreateNotification;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class UserNotificationController extends Controller
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
        $user = Auth::user();
        $notifications = $user->notifications()->paginate(20);
        return response()->json(['status' => $this->status_code, 'message' => 'Notifications fetch Successfully', 'data' => $notifications]);

    }
    public function unreadNotifications()
    {
        //
        
        $user = Auth::user();
    //     $details = [
    //         'greeting' => 'Hi ' . '$user->name',
    //         'body' => 'This is my' . '$event->event_title',
    //         'thanks' => 'Thank you for using ' . url('/') . '!',
    //         'actionText' => 'View Event',
    //         'actionURL' => url('/event?token=' . '$event->remember_token' . '&event=' . '$event->id'),
    //         'order_id' => '1'
    //     ];
    //     $user->UserProfile;
    //   return   Notification::send($user, new EventCreateNotification($details));
        $notifications = $user->unreadNotifications()->paginate(20);
        return response()->json(['status' => $this->status_code, 'message' => 'Notifications fetch Successfully', 'data' => $notifications]);

    }
    public function markAsRead($id)
    {
        $user = Auth::user();
        if($id=="All"){
           // Mark all notifications as read in the database
           User::where('id', auth()->user()->id)->update([
                'read_notification' => '1'
            ]);
            // Mark all unread Eloquent notifications as read using the Notifiable trait
            foreach($user->unreadNotifications as $notification) {
                $notification->markAsRead();
            }
            
            return response()->json(['status' => $this->status_code, 'message' => 'Read all notifications', 'data' => []]);    
        }else{
            $notification = $user->notifications->find($id);
            if ($notification) {
                $notification->markAsRead();
                return response()->json(['status' => $this->status_code, 'message' => 'Read notifications successfully', 'data' => []]);
            }
        }
        
        return response()->json(['message' => 'Notification not found'], 404);
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
