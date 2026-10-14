<?php

namespace App\Models\Chat;

use App\User;
use Illuminate\Database\Eloquent\Model;

class ChatConversation extends Model
{
    //
    public function Users(){
        return $this->belongsTo(User::class,'user_id')->select('id','name','username');
    }
}
