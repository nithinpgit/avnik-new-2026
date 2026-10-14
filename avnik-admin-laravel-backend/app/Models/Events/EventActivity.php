<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;

class EventActivity extends Model
{
    //
    public function Event()
    {
        return $this->belongsTo(Event::class,'id');
    }
    public function User(){
        return $this->belongsTo(User::class,'id');
    }
}
