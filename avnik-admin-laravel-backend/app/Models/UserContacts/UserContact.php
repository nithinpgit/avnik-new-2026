<?php

namespace App\Models\UserContacts;

use App\User;
use Illuminate\Database\Eloquent\Model;

class UserContact extends Model
{
    //
    public function ContactId(){
     
        return $this->hasOne(User::class,'id' ,'contact_id')->select('id','name','username');
    
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
