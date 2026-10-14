<?php

namespace App\Models\UserProfile;

use App\Models\Events\Event;
use App\User;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
     protected $fillable = ['user_fk_id','about_me','profile_picture','language','skill','country','state','city','social_profile_picture_url','remember_token'];

     public function User(){

          return $this->belongsTo(User::class, 'id');

     }
}
