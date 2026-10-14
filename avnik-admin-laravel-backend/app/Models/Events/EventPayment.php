<?php

namespace App\Models\Events;

use App\Models\Traits\HasHistory;
use App\User;
use Illuminate\Database\Eloquent\Model;

class EventPayment extends Model
{
      use HasHistory;
    //
    // protected $fillable=[
    // 'id',
    // 'amount_refunded',
    // 'refunded_amount',
    // 'refund_id',
    // 'refund_description',
    // 'refunded_percentage',
    // 'user_fk_id'
    // ,'event_time_slot_id',
    // 'event_fk_id',
    // 'to_user'
    // ,'blocked_user'
    // ,'withdraw_amount'
    // ,'released',
    // 'event_date_time',
    // 'amount',
    // 'stripe_id',
    // 'card_brand',
    // 'card_last_four',
    // 'trial_ends_at',
    // 'paid',
    // 'extended',
    // 'extended_id',
    // 'accept_by_host'
    // ,'amount_refunded'
    // ,'refund_transaction'
    // ,'refund_id'
    // ,'transaction_id',
    // 'description',
    // 'status'];
     protected $casts = [
        'payment_snapshot' => 'array',
    ];

    protected function historyMeta(): array
    {
        return [
            'history_table' => 'event_payment_histories',
            'fk'            => 'event_payment_id',
        ];
    }
    public function EventTimeSlot()
    {
        return $this->belongsTo(EventTimeSlot::class,'event_time_slot_id','id');
    }
    public function User()
    {
        return $this->belongsTo(User::class,'id','user_fk_id');
    }
    public function PaidUser()
    {
        return $this->hasOne(User::class,'id','user_fk_id')->select('id','name','email','username','phone');
    }
    public function ToUser()
    {
        return $this->hasOne(User::class,'id','to_user')->select('id','name','email','username','phone');
    }
    public function Event()
    {
        return $this->belongsTo(Event::class,'id','event_fk_id');
    }
    
    public function Events()
    {
        return $this->hasOne(Event::class,'id','event_fk_id');
    }
    public function EventTimeSlots()
    {
        return $this->hasOne(EventTimeSlot::class,'id','event_time_slot_id');
    }
    
}
