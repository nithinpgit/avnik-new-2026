<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;

class EventFile extends Model
{
    //
    public function Event()
    {

        return $this->belongsTo(Event::class,'id','event_fk_id');

    }
    public function FileManager()
    {

        return $this->belongsTo(FileManager::class,'id');

    }
    public function FileManagerFile()
    {

        return $this->hasOne(FileManager::class,'id','file_manger_id');

    }
    public function User(){

        return $this->belongsTo(User::class,'id');

    }
    public function EventFilePayment()
    {
        return $this->hasMany(EventFilePayment::class,'event_file_fk_id');
    }
}
