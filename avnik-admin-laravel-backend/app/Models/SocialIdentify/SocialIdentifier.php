<?php

namespace App\Models\SocialIdentify;

use Illuminate\Database\Eloquent\Model;

class SocialIdentifier extends Model
{
    protected $fillable = ['user_fk_id','provider_name','provider_id','remember_token'];
}
