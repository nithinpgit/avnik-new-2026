<?php

namespace App\Http\Controllers\Api\UserControllers\Chats;

use App\Events\Chats\Conversations;
use App\Events\Chats\SendMessage;
use App\Events\User\UserNotification;
use App\Http\Controllers\Controller;
use App\Models\Chat\ChatConversation;
use App\Models\Chat\ChatMessage;
use App\Models\Chat\ChatRoom;
use App\Models\Chat\ChatRoomUser;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\UserContacts\UserContact;
use App\Models\UserProfile\UserProfile;
use App\Notifications\MessageReceivedEmail;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Mockery\Expectation;

class UserChatsController extends Controller
{
    //
    private $status_code = 200;
    public function getConversations(Request $request)
    {

        
        $user = auth()->user();
        
        if ($user) {
            $conversation = ChatRoomUser::where('user_id', $user->id)->whereHas('ChatRoom',function($q)use($request){
                $q->where(function($q)use($request){
                    $q->orWhere('room_name', 'LIKE', "%{$request->search}%")->orWhere('room_name',null);
                });
            })->with(['ChatRoom' => function ($q) {
                $q->with(['EventSlot'=>function($q){
                    $q->select('id','start_date_time');
                },'Message' => function ($q) {
                    $q->with(['SenderId'])->orderBy('created_at', 'desc');
                }, 'CreatedBy' => function ($q) {
                    $q->with(['UserProfile' => function ($q) {
                        $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                    }])->select('id', 'name', 'username','last_active_room');
                },'ChatWith' => function ($q) {
                    $q->with(['UserProfile' => function ($q) {
                        $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                    }]);
                }]);
            },
            'RoomUser' => function ($q) {
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }]);
            },
            
            ])->select('chat_room_users.*')
            ->selectRaw('(SELECT MAX(created_at) FROM chat_messages WHERE room_id = chat_room_users.room_id) AS latest_message_time')
            ->orderByDesc('latest_message_time')->paginate(100);
            // $conversation = $conversation->reject(function ($user) {
            //     return $user?->ChatRoom?->Message?->count() === 0;
            // });
            // foreach ($conversation as $user) {
            //     if ($user?->ChatRoom?->Message?->count() > 0) {
            //         $conversation[]=$user;

            //     } else {
            //         $conversation->reject(function ($user) {
            //             return $user->ChatRoom->Message->count() === 0;
            //         });
            //         // Skip or handle the chat room users without messages
            //     }
            // }
            // return $conversation;
            // Add caching for the query
            // $cacheKey = 'conversation:user_id:' . $user->id . ':search:' . $request->search;
            // $conversation = Cache::remember($cacheKey, 60 * 60, function () use ($conversation) {
            //     return $conversation;
            // });
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Fetch Conversation', 'data' => $conversation]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }
    }

    public function findRoomName($roomId)
    {
        $chatRoomUser = ChatRoomUser::where('room_id', $roomId)->get();
        return $chatRoomUser;
    }
    public function initiateChat(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }

        $targetUserId = (int) $request->userId;

        if ($targetUserId <= 0) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please select a valid user']);
        }

        if ($targetUserId === (int) $user->id) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'You cannot start chat with yourself']);
        }

        $targetUser = User::where('id', $targetUserId)->select('id')->first();

        if (!$targetUser) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Selected user not found']);
        }

        $userRoom = [$user->id, $targetUserId];
        $existRoom=ChatRoom::with(['EventSlot'=>function($q){
            $q->select('id','start_date_time');
        },'Message' => function ($q) {
            $q->with(['SenderId'])->orderBy('created_at', 'desc');
        }, 'CreatedBy' => function ($q) {
            $q->with(['UserProfile' => function ($q) {
                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
            }])->select('id', 'name', 'username','last_active_room');
        },'ChatWith' => function ($q) {
            $q->with(['UserProfile' => function ($q) {
                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
            }]);
        }])->with(['ChatRoomUser'=>function($q){$q->with(['RoomUser']);},'CreatedBy'])->where('type',0)->where(function($q)use($user,$targetUserId){
            $q->orWhere('created_by',$user->id)->orWhere('created_by',$targetUserId);
        })->where(function($q)use($user,$targetUserId){
                        $q->where(function($q)use($user,$targetUserId){
                                $q->orWhere('single_chat_id',$user->id)->orWhere('single_chat_id',$targetUserId);
                        });
            })->first();

        // return $existRoom;
        if(count($userRoom)>1&&empty($existRoom)){
            try {
                DB::beginTransaction();
                $ChatRoom = new ChatRoom();
                $ChatRoom->created_by = $user->id;
                $ChatRoom->single_chat_id = $targetUserId;
                $ChatRoom->remember_token = Str::random(70);
                $ChatRoom->save();
                User::where('id',$user->id)->update([
                    'last_active_room'=>$ChatRoom->id,
                ]);
                foreach($userRoom as $room){
                    $ChatRoomUser = new ChatRoomUser();
                    $ChatRoomUser->user_id = $room;
                    $ChatRoomUser->room_id = $ChatRoom->id;
                    $ChatRoomUser->remember_token = Str::random(70);
                    $ChatRoomUser->save();
                }
                DB::commit();
                $ChatRoom=ChatRoom::with(['ChatRoomUser'=>function($q){$q->with(['RoomUser']);}])->where('id',$ChatRoom->id)->first();
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoom]);
            } catch (\Throwable $e) {
                DB::rollBack();

                return response()->json(["status" => "failed", "success" => false, "message" => 'Unable to initiate chat']);
            }
        }else{
            if(!empty($existRoom)){
                User::where('id',$user->id)->update([
                    'last_active_room'=>$existRoom->id,
                ]);
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $existRoom]);
            }
        }
        return response()->json(["status" => "failed", "success" => false, "message" => 'Unable to initiate chat']);
    }
    public function sendMessage(Request $request)
    {
        $user=auth()->user();
        // return $getRoomUser;
        if($user){
        $file = $request->file('file');
        $file_path = null;
        if ($file) {
                $files = $file;
                $originalName = $files->getClientOriginalName();
                $originalExtension = $files->getClientOriginalExtension();
                $originalSize = $files->getSize();
                $name = $originalName;
                $path = storage_path('uploads/messages/' . time() . '/');
                $newPath = $path;
                $newName = $name;
                $files->move($newPath, $newName);
                $file_path = 'storage/uploads/messages/' . time() . '/' . $name;

                $messages= new ChatMessage();
                $messages->room_id=$request->roomId;
                $messages->file_name=$originalName;
                $messages->sender_id=$user->id;
                $messages->file=$file_path;
                $messages->file_type=$originalExtension;
                $messages->file_size=$originalSize;
                $messages->is_file=1;
                $messages->save();
                $messageData=ChatMessage::where('id',$messages->id)->with(['SenderId'])->first();
                // $ChatRoom=ChatRoom::where('id',$request->roomId)->first();
                $getRoomUser=ChatRoomUser::where('room_id',$request->roomId)->where('user_id','!=',$user->id)->get()->pluck('user_id');

                $users = User::whereIn('id', $getRoomUser)
                    ->where('last_active', '<', Carbon::now()->utc()->toDateTimeString())
                    ->get();
                // return $users;
                                $details = [
                                    'body' =>'',
                                    'image' =>'',
                                    'title' => '<a href="'.url('/messages').'"></a>',
                                    'description' => 'You received a new message',
                                    'greeting' => 'Hi ' . $user->name,
                                    'thanks' => 'Thank you for using ' . url('/') . '!',
                                    'actionText' => 'Cancelled Event',
                                    'actionURL' => url('/messages'),
                                    'order_id' => ''
                                ];
                Notification::send($users, new MessageReceivedEmail($details));
                event(new UserNotification($user));
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Send Message successfully', 'data' => $messageData]);

        }else{
            $messages= new ChatMessage();
            $messages->room_id=$request->roomId;
            $messages->sender_id=$user->id;
            $messages->content=$request->message;
            $messages->save();
            $messageData=ChatMessage::where('id',$messages->id)->with(['SenderId'])->first();
            $getRoomUser=ChatRoomUser::where('room_id',$request->roomId)->where('user_id','!=',$user->id)->get()->pluck('user_id');

                $users=User::whereIn('id',$getRoomUser)->where('last_active','>',Carbon::now())->get();
                // return $users;
                                $details = [
                                    'body' =>'',
                                    'image' =>'',
                                    'title' => '<a href="'.url('/messages').'"> '.$messageData->content.'</a>',
                                    'description' => 'You received a new message',
                                    'greeting' => 'Hi ' . $user->name,
                                    'thanks' => 'Thank you for using ' . url('/') . '!',
                                    'actionText' => 'Cancelled Event',
                                    'actionURL' => url('/messages'),
                                    'order_id' => ''
                                ];
                Notification::send($users, new MessageReceivedEmail($details));
                event(new UserNotification($user));
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Send Message successfully', 'data' => $messageData]);
        }
        }else{
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }
}


    public function EnterInRoom(Request $request)
    {

        $user = auth()->user();
        if ($request->roomId) {
            $chatUser = ChatRoomUser::where('room_id', $request->roomId)->where('user_id', $user->id)->first();
            if ($chatUser) {
                User::where('id',$user->id)->update([
                    'last_active_room'=>$chatUser->room_id,
                ]);
                $ChatMessage = ChatMessage::where('room_id', $request->roomId)->where('created_at','>=',$chatUser->created_at)->with(['SenderId'])->paginate(500);
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatMessage]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => 'you can enter in this room']);
            }
        }
    }

    public function CreateRoom(Request $request)
    {
        $validator          =       Validator::make(
            $request->all(),
            [
                "roomName"             =>          "required",
            ]
        );
        $image = $request->file('file');
        $image_path = null;
        if ($validator->fails()) {
            return response()->json(["status" => "failed", 'message' => 'Group name required ', "validation_error" => $validator->errors()]);
        }
        if ($image) {
            $validate =   Validator::make($request->all(), [
                'file' => 'mimes:jpeg,jpg,bmp,png'
            ]);
            if ($validate->fails()) {
                return response()->json(["status" => "failed", 'message' => 'Group name required ', "validation_error" => $validator->errors()]);
            } else {
                $files = $image;
                $originalName = $files->getClientOriginalName();
                $name = $originalName;
                $path = storage_path('uploads/profiles/' . time() . '/');
                $newPath = $path;
                $newName = $name;
                $files->move($newPath, $newName);
                $image_path = 'storage/uploads/profiles/' . time() . '/' . $name;
            }
        }

        $user = auth()->user();
        if ($user) {
            try {
                DB::beginTransaction();
                $ChatRoom = new ChatRoom();
                $ChatRoom->created_by = $user->id;
                $ChatRoom->type = 1;
                $ChatRoom->room_name = $request->roomName;
                $ChatRoom->broadcasting = 0;
                $ChatRoom->group_image = $image_path;
                $ChatRoom->remember_token = Str::random(70);
                $ChatRoom->save();
                // if(!empty($ChatRoom)){
                //     User::where('id',$user->id)->update([
                //         'last_active_room'=>$ChatRoom->id,
                //     ]);
                // }
                $ChatRoomUser = new ChatRoomUser();
                $ChatRoomUser->user_id = $user->id;
                $ChatRoomUser->room_id = $ChatRoom->id;
                $ChatRoomUser->remember_token = Str::random(70);
                $ChatRoomUser->save();

                if(!empty($request->file('file'))){
                    if(count(json_decode($request->roomUserIds))>0){
                        foreach(json_decode($request->roomUserIds) as $JoinUser){
                            if(ChatRoomUser::where('user_id',$JoinUser)->where('room_id',$ChatRoom->id)->count()==0){
                                $ChatRoomUser = new ChatRoomUser();
                                $ChatRoomUser->user_id = $JoinUser;
                                $ChatRoomUser->room_id = $ChatRoom->id;
                                $ChatRoomUser->remember_token = Str::random(70);
                                $ChatRoomUser->save();
                            }
                        }
                    }
                }else{
                    if(count($request->roomUserIds)>0){
                        foreach($request->roomUserIds as $JoinUser){
                            if(ChatRoomUser::where('user_id',$JoinUser)->where('room_id',$ChatRoom->id)->count()==0){
                                $ChatRoomUser = new ChatRoomUser();
                                $ChatRoomUser->user_id = $JoinUser;
                                $ChatRoomUser->room_id = $ChatRoom->id;
                                $ChatRoomUser->remember_token = Str::random(70);
                                $ChatRoomUser->save();
                            }
                        }
                    }
                }
               $ChatRoom->with(['EventSlot'=>function($q){
                    $q->select('id','start_date_time');
                },'CreatedBy' => function ($q) {
                        $q->select('id', 'name', 'username','last_active_room');
                    }]);
                DB::commit();
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoom]);
            } catch (Expectation $e) {
                DB::rollBack();
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }
    }
    // update Room
    public function UpdateRoom(Request $request)
    {
    //    return  $request->all();
        $validator          =       Validator::make(
            $request->all(),
            [
                "roomName"             =>          "required",
            ]
        );
        $image = $request->file('file');
        $image_path = null;
        if ($validator->fails()) {
            return response()->json(["status" => "failed", 'message' => 'Group name required ', "validation_error" => $validator->errors()]);
        }
        if ($image) {
            $validate =   Validator::make($request->all(), [
                'file' => 'mimes:jpeg,jpg,bmp,png'
            ]);
            if ($validate->fails()) {
                return response()->json(["status" => "failed", 'message' => 'Group name required ', "validation_error" => $validator->errors()]);
            } else {
                $files = $image;
                $originalName = $files->getClientOriginalName();
                $name = $originalName;
                $path = storage_path('uploads/profiles/' . time() . '/');
                $newPath = $path;
                $newName = $name;
                $files->move($newPath, $newName);
                $image_path = 'storage/uploads/profiles/' . time() . '/' . $name;
            }
        }
        $user = auth()->user();
        if ($user) {
            try {
                DB::beginTransaction();
                if($image_path){
                    $ChatRoom = ChatRoom::find($request->roomId);
                    $ChatRoom->room_name = $request->roomName;
                    $ChatRoom->group_image = $image_path;
                    $ChatRoom->save();
                }else{
                    $ChatRoom = ChatRoom::find($request->roomId);
                    $ChatRoom->room_name = $request->roomName;
                    $ChatRoom->save();
                }
                

                if(!empty($request->file('file'))){
                    if(count(json_decode($request->roomUserIds))>0){
                        foreach(json_decode($request->roomUserIds) as $JoinUser){
                            if(ChatRoomUser::where('user_id',$JoinUser)->where('room_id',$ChatRoom->id)->count()==0){
                                $ChatRoomUser = new ChatRoomUser();
                                $ChatRoomUser->user_id = $JoinUser;
                                $ChatRoomUser->room_id = $ChatRoom->id;
                                $ChatRoomUser->remember_token = Str::random(70);
                                $ChatRoomUser->save();
                            }
                        }
                    }
                }else{
                    if(count($request->roomUserIds)>0){
                        foreach($request->roomUserIds as $JoinUser){
                            if(ChatRoomUser::where('user_id',$JoinUser)->where('room_id',$ChatRoom->id)->count()==0){
                                $ChatRoomUser = new ChatRoomUser();
                                $ChatRoomUser->user_id = $JoinUser;
                                $ChatRoomUser->room_id = $ChatRoom->id;
                                $ChatRoomUser->remember_token = Str::random(70);
                                $ChatRoomUser->save();
                            }
                        }
                    }
                }
               $ChatRoom->with(['EventSlot'=>function($q){
                    $q->select('id','start_date_time');
                },'CreatedBy' => function ($q) {
                        $q->select('id', 'name', 'username','last_active_room');
                    }]);
                DB::commit();
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoom]);
            } catch (Expectation $e) {
                DB::rollBack();
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }
    }
    // end update room
    public function CreateEventRoom(Request $request)
    {
        $user = auth()->user();
        $eventRoom= Event::where('id',$request->eventId)->where('user_fk_id',$user->id)->first();
        if ($user&&!is_null($eventRoom)) {
        $bookedEvent= EventBooking::where('status','enabled')->where('event_fk_id',$request->eventId)->where('event_slot_id',$request->slotId)->get();
        $roomCount=ChatRoom::where('slot_id',$request->slotId)->count();
        try {
                if(!$roomCount>0){
                DB::beginTransaction();
                $ChatRoom = new ChatRoom();
                $ChatRoom->created_by = $user->id;
                $ChatRoom->type = 2;
                $ChatRoom->room_name = $request->roomName;
                $ChatRoom->slot_id = (int)$request->slotId;
                // $ChatRoom->broadcasting = $request->broadcasting == false ? 0 : 1;
                $ChatRoom->broadcasting = 0;
                $ChatRoom->group_image = $request->roomImage;
                $ChatRoom->remember_token = Str::random(70);
                $ChatRoom->save();  
                // if(!empty($ChatRoom)){
                //     User::where('id',$user->id)->update([
                //         'last_active_room'=>$ChatRoom->id,
                //     ]);
                // }
                $ChatRoomUser = new ChatRoomUser();
                $ChatRoomUser->user_id = $user->id;
                $ChatRoomUser->room_id = $ChatRoom->id;
                $ChatRoomUser->remember_token = Str::random(70);
                $ChatRoomUser->save();

                if(count($bookedEvent)>0){
                    foreach($bookedEvent as $bookedUser){
                        $ChatRoomUser = new ChatRoomUser();
                        $ChatRoomUser->user_id = $bookedUser->p_user_id;
                        $ChatRoomUser->room_id = $ChatRoom->id;
                        $ChatRoomUser->remember_token = Str::random(70);
                        $ChatRoomUser->save();
                    }
                }
                    $ChatRoom = [
                        'roomId' => $ChatRoom->id,
                        'roomName' => $ChatRoom->room_name,
                        'isGrouped' => $ChatRoom->type,
                        'createdBy' => $ChatRoom->created_by,
                    ];
                    DB::commit();
                    return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoom]);
                }else{
                    $roomFirst=ChatRoom::where('slot_id',$request->slotId)->first();
                    if(!empty($roomFirst)){
                        User::where('id',$user->id)->update([
                            'last_active_room'=>$roomFirst->id,
                        ]);
                    }
                    return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $roomFirst]);

                }

            } catch (Expectation $e) {
                DB::rollBack();
            }
        } else {
            if(is_null($eventRoom)){
                return response()->json(["status" => "failed", "success" => false, "message" => 'your can`t create this group']);
            }else{
                return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);

            }
        }

        return $request;
    }
    public function addUserRoom(Request $request)
    {
        if ($request->roomId && $request->userIds) {
            $userIds = $request->userIds;
            foreach ($userIds as $userId) {
                if(ChatRoomUser::where('room_id', $request->roomId)->where('user_id', $userId)->count()>0){
                    return response()->json(["status" => 201, "success" => true, "message" => 'User  already exist in group', 'data' => true]);
                }
                if (!ChatRoomUser::where('room_id', $request->roomId)->where('user_id', $userId)->first()) {
                 
                    $ChatRoomUser = new ChatRoomUser();
                    $ChatRoomUser->room_id = $request->roomId;
                    $ChatRoomUser->user_id = $userId;
                    $ChatRoomUser->remember_token = Str::random(70);
                    $ChatRoomUser->save();
                }
                
            }
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => true]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please select the user']);
        }
    }

    public function deleteRoom(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please login again']);
        }

        $roomId = $request->roomId;
        if (!$roomId) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please select the room']);
        }

        $chatRoom = ChatRoom::where('id', $roomId)->where('created_by', $user->id)->first();
        if (!$chatRoom) {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Only admin can delete', 'data' => false]);
        }

        try {
            DB::beginTransaction();
            ChatMessage::where('room_id', $roomId)->delete();
            ChatRoomUser::where('room_id', $roomId)->delete();
            $chatRoom->delete();
            DB::commit();

            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Delete group successfully', 'data' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failed", "success" => false, "message" => 'Failed to delete group'], 500);
        }
    }
    // remove user from room
    public function removeUserFromRoom(Request $request)
    {
        $user=auth()->user();
        if($user){
            if ($request->roomId && count($request->userIds)>0) {
                $userIds = $request->userIds;
                $createdBy=ChatRoom::where('id',$request->roomId)->where('created_by',$user->id)->first();
                if(!empty($createdBy)){
                   $ChatRoomUser = ChatRoomUser::where('room_id',$request->roomId)->where('user_id',$userIds)->delete();
                   ChatRoom::where('id',$request->roomId)->where('created_by',$user->id)->update([
                    'broadcasting'=>0
                   ]);
                   if($user->last_active_room==$createdBy->room_id){
                    User::where('last_active_room',$createdBy->room_id)->update(['last_active_room'=>null]);
                   }
                   return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoomUser]);
                }else{
                 $ChatRoomUser = ChatRoomUser::where('room_id',$request->roomId)->where('user_id',$userIds)->delete();
                 if($user->last_active_room==$request->roomId){
                    User::where('last_active_room',$request->roomId)->update(['last_active_room'=>null]);
                   }      
                 return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => $ChatRoomUser]);
                }
                
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => true]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => 'Please select the user']);
            }
        }else{
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please login again']);

        }
        
    }
    //end  remove user from room

    // fetch current login or created user group
    public function fetchMyGroups(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            if($request->roomType=="MyGroups"){
                
                $conversation = ChatRoom::where('room_name','LIKE',"%{$request->search}%")->where('created_by', $user->id)->whereIn('type',[1,2])->with(['EventSlot'=>function($q){
                    $q->select('id','start_date_time');
                },'CreatedBy' => function ($q) {
                        $q->select('id', 'name', 'username','last_active_room');
                    }])->orderBy('id', 'desc')->paginate(20);
            // return $conversation;

                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Fetch Conversation', 'data' => $conversation]);
            }else{
                $conversation = ChatRoom::where('room_name','LIKE',"%{$request->search}%")->where('created_by', $user->id)->whereIn('type',[1,2])->with(['EventSlot'=>function($q){
                    $q->select('id','start_date_time');
                },'CreatedBy' => function ($q) {
                    $q->select('id', 'name', 'username','last_active_room');
                }])->orderBy('id', 'desc')->paginate(20);
            // return $conversation;

                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Fetch Conversation', 'data' => $conversation]);
            }

        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
        }
    }
    // fetch current login or created user group
    
    // Broadcasting toggle in message check or uncheck 
    public function BroadcastingToggle(Request $request){
        $user =auth()->user();
        $toggle=ChatRoom::where('created_by',$user->id)->where('id',$request->roomId)->first();
        if($toggle){
            if($toggle->broadcasting){
                ChatRoom::where('created_by',$user->id)->where('id',$request->roomId)->update([
                    'broadcasting'=>false,
                ]);
             return response()->json(["status" => $this->status_code, "success" => true, "message" => 'broadcasting disabled', 'data' => false]);
            }else{
                ChatRoom::where('created_by',$user->id)->where('id',$request->roomId)->update([
                    'broadcasting'=>true,
                ]);
             return response()->json(["status" => $this->status_code, "success" => true, "message" => 'broadcasting enabled', 'data' => true]);
            }
        }else{
            return response()->json(["status" => "failed", "success" => false, "message" => '!error']);
        }
    }
    public function moveUserRoom(Request $request){
        $user=auth()->user();
        if($user){
            $user = auth()->user();
            if ($user) {
                $conversation = ChatRoomUser::where('user_id', $user->id)->with(['ChatRoom' => function ($q) {
                    $q->with(['Message' => function ($q) {
                        $q->with(['SenderId'])->orderBy('id', 'desc')->first();
                    }, 'CreatedBy' => function ($q) {
                        $q->select('id', 'name', 'username','last_active_room');
                    }]);
                }, 'RoomUser' => function ($q) {
                    $q->with(['UserProfile' => function ($q) {
                        $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                    }]);
                }])->orderBy('id', 'desc')->paginate(20);
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Fetch Conversation', 'data' => $conversation]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => 'Pleas login again']);
            }
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'Chat initiate', 'data' => true]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please select the user']);
        }
    }
    // viewGroupPeoples 
    public function viewGroupPeoples(Request $request){
        $user=auth()->user();
        if($user){
            $roomUsers = ChatRoomUser::whereHas('ChatRoom', function($q) use ($user) {
                $q->where('created_by', $user->id);
            })
            ->where('user_id', '!=', $user->id)
            ->where('room_id', $request->roomId)
            ->with([
                'RoomUser.UserProfile' => function($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                }
            ])
            ->paginate(50);
            return response()->json(["status" => $this->status_code, "success" => true, "message" => 'fetch Group Users', 'data' => $roomUsers]);
        }else{  
            return response()->json(["status"=>"failed","message"=>"please login again","data"=>[]]);
        }
    }
    //  Search contact or creating group 
    public function searchMyContacts(Request $request){
        $user=auth()->user();
        $roomUser=ChatRoomUser::where('room_id',$request->roomId)->get()->pluck('user_id');
        // return $roomUser;
        if($user){
            if(count($roomUser)>0){
                $contacts=UserContact::whereNotIn('contact_id',$roomUser)->whereHas('ContactId',function($q)use($request){
                    $q->where('name', 'LIKE', "%{$request->search}%");
                })->with(['ContactId'])->where('user_id',$user->id)->whereNotIn('contact_id',$request->selectedUser)->limit(50)->get();            
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'fetch Contacts', 'data' => $contacts]);
            }else{
                $contacts=UserContact::whereHas('ContactId',function($q)use($request){
                    $q->where('name', 'LIKE', "%{$request->search}%");
                })->with(['ContactId'])->where('user_id',$user->id)->whereNotIn('contact_id',$request->selectedUser)->limit(50)->get();            
                return response()->json(["status" => $this->status_code, "success" => true, "message" => 'fetch Contacts', 'data' => $contacts]);
            }

        }else{
            return response()->json(["status" => "failed", "success" => false, "message" => 'login again...']);
        }

    }
   
}
