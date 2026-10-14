<?php

namespace App\Models\Certification;

use Illuminate\Database\Eloquent\Model;

class UserCertification extends Model
{
    public $table='user_certificates';
    protected $fillable = ['user_fk_id'];
}
