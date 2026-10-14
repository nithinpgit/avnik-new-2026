<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventBooking extends Model
{
    use SoftDeletes;
    //
     protected function historyMeta(): array
    {
        return [
            'history_table' => 'event_booking_histories',
            'fk'            => 'event_booking_id',
        ];
    }
    public function Events()
    {
        return $this->hasOne(Event::class,'id','event_fk_id');
    }
    public function HostUser()
    {
        return $this->hasOne(User::class,'id','h_user_id');
    }
    public function ParticipantUser()
    {
        return $this->hasOne(User::class,'id','p_user_id');
    }
    public function EventPayment()
    {
        return $this->hasMany(EventPayment::class,'event_fk_id','event_fk_id');
    }
    public function EventTimeSlot()
    {
        return $this->hasMany(EventTimeSlot::class,'event_slot_id','id');
    }
    public function Extended()
    {
        return $this->hasMany(ExtendDuration::class,'room_id','meeting_room_id');
    }
    public function Reviews()
    {
        return $this->hasMany(EventReview::class,'slot_id','event_slot_id');
    }
}
