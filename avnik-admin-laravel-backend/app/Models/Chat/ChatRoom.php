<?php

namespace App\Models\Chat;

use App\Models\Events\EventTimeSlot;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatRoom extends Model
{
    use SoftDeletes;
    public function ChatRoomUser(){
        return $this->hasMany(ChatRoomUser::class,'room_id','id');
    }
    public function CreatedBy(){
        return $this->hasOne(User::class,'id','created_by')->select('id','name','username','last_active_room');
    }
    public function ChatWith(){
        return $this->hasOne(User::class,'id','single_chat_id')->select('id','name','username','last_active_room');
    }
    public function Message(){
        return $this->hasOne(ChatMessage::class,'room_id','id');
    }
    public function EventSlot(){
        return $this->hasOne(EventTimeSlot::class,'id','slot_id');
    }   
}
