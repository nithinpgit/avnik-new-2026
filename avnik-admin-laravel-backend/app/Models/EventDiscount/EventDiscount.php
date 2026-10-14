<?php

namespace App\Models\EventDiscount;

use Illuminate\Database\Eloquent\Model;

class EventDiscount extends Model
{
    //
    public function Event()
    {
        return $this->belongsTo(Event::class,'id');
    }
}
