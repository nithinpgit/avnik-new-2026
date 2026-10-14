<?php

namespace App\Models\Chat;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatMessage extends Model
{
    //
    use SoftDeletes;
    public function SenderId(){
        return $this->hasOne(User::class,'id','sender_id')->select('id','name','username','last_active_room');
    }
}
