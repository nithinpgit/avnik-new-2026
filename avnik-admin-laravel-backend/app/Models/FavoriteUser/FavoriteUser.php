<?php

namespace App\Models\FavoriteUser;

use App\User;
use Illuminate\Database\Eloquent\Model;

class FavoriteUser extends Model
{
    //
    public function MyFavoriteUsers(){

        return $this->belongsTo(User::class,'id','from_user_id');

    }
    public function FavoriteMe(){

        return $this->belongsTo(User::class,'id','to_user_id');
        
    }
    public function FromUser(){

        return $this->hasOne(User::class,'id','from_user_id')->select('id','name','username','email');
        
    }
    public function ToUser(){

        return $this->hasOne(User::class,'id','to_user_id')->select('id','name','username','email');
        
    }
    
    

}
