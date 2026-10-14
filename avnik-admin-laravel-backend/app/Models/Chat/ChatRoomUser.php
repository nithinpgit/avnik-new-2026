<?php

namespace App\Models\Chat;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatRoomUser extends Model
{
    //
    use SoftDeletes;
    protected $fillable = ['user_id','room_id'];
    public function RoomUser(){
       return $this->hasOne(User::class,'id','user_id')->select('id','name','username','last_active_room');
    }
    public function ChatRoom(){
        return $this->hasOne(ChatRoom::class,'id','room_id');
    }
    
}
