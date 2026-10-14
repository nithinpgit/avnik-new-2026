<?php

namespace App\Models\Favorites;

use App\Models\Events\Event;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    //
    public function MyFavoriteUsers(){
        return $this->hasOne(User::class,'id','to_user')->select('id','name','username');
    }
    public function MyFavoriteEvents(){
        return $this->hasOne(Event::class,'id','event_id');
    }

}
