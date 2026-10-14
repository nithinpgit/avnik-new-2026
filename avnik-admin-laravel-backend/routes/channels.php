<?php

use App\Models\Chat\ChatRoomUser;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('ConversationsChannel', function ($user) {
    return $user->id==ChatRoomUser::where('user_id',$user->id)->first()->user_id;
});
Broadcast::channel('SendMessageChannel.{room_id}', function ($user,$room_id) {
    //  if(ChatRoomUser::where('room_id',$room_id)->where('user_id',$user->id)->count()>0)
        // return true;
        // return false;
     return $user;
});
// Broadcast::channel('SendMessageChannel.', function ($user) {
//      return $user;
// });


