<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;

class FavoriteEvent extends Model
{
    //
    public function  Event(){

        return $this->belongsTo(Event::class,'id');
    }
    public function MyFavoriteEvent()
    {
        return $this->belongsTo(User::class,'id','user_id');
    }
    public function Favorite()
    {
        return $this->hasOne(Event::class,'id','event_id')->select('id','event_title','event_files','remember_token',"created_at","updated_at");
    }
}
