<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventTimeSlot extends Model
{
    use SoftDeletes;
    //
    protected function historyMeta(): array
    {
        return [
            'history_table' => 'event_time_slot_histories',
            'fk'            => 'event_time_slot_id',
        ];
    }
    public function Event()
    {
        return $this->belongsTo(Event::class,'id');
    }
    public function User(){
        return $this->belongsTo(User::class,'id');
    }
    public function EventBooking()
    {
        return $this->hasMany(EventBooking::class,'event_slot_id','id');
    }
    public function EventPayment()
    {
        return $this->hasMany(EventPayment::class,'event_time_slot_id');
    }
    public function Events()
    {
        return $this->hasOne(Event::class,'id','event_fk_id');
    }
    public function Extended()
    {
        return $this->hasMany(ExtendDuration::class,'room_id','meeting_room_id');
    }
    public function Reviews()
    {
        return $this->hasMany(EventReview::class,'slot_id','id');
    }
    
}
