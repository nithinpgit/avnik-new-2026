<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;

class EventFilePayment extends Model
{
    protected $fillable = ['to_user_id', 'user_fk_id', 'event_file_fk_id','event_fk_id'];
    //
    public function Event()
    {
        return $this->belongsTo(Event::class,'id');
    }
    public function EventFile(){
        return $this->belongsTo(EventFile::class,'id');
    }
    public function User()
    {
        return $this->belongsTo(User::class,'id');
    }
    public function PaidUser()
    {
        return $this->hasOne(User::class,'id','user_fk_id')->select('id','name','email','username','phone');
    }
    public function ToUser()
    {
        return $this->hasOne(User::class,'id','to_user_id')->select('id','name','email','username','phone');
    }
    
}
