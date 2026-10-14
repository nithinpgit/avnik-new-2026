<?php

namespace App\Models\Education;

use Illuminate\Database\Eloquent\Model;

class UserEducation extends Model
{
    public $table='user_educations';
    protected $fillable = ['user_fk_id'];
}
