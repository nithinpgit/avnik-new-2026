<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;

class EventReview extends Model
{
    //
    public function  Event(){

        return $this->belongsTo(Event::class,'id','event_id');
    }
    public function  User(){

        return $this->belongsTo(User::class,'id','user_id');
    }
    public function  Events(){

        return $this->hasOne(Event::class,'id','event_id');
    }
    public function  EventSlot(){

        return $this->hasOne(EventTimeSlot::class,'id','slot_id');
    }
    public function  Sender(){

        return $this->hasOne(User::class,'id','user_id')->select('id','name','username');
    }
    public function  Receiver(){

        return $this->hasOne(User::class,'id','receiver_id')->select('id','name','username');
    }
    public function  Average(){

        return $this->hasMany(Event::class,'id','event_id');
    }
    



    
    
}
