<?php

namespace App\Models\Events;

use App\Models\Categories\Categories;
use App\Models\EventDiscount\EventDiscount;
use App\Models\Favorites\Favorite;
use App\Models\Traits\HasHistory;
use App\Models\UserProfile\UserProfile;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes,HasHistory;
    //
    protected function historyMeta(): array
    {
        return [
            'history_table' => 'event_histories',
            'fk'            => 'event_fk_id',
        ];
    }
    public function EventTimeSlot()
    {
        return $this->hasMany(EventTimeSlot::class,'event_fk_id');
    }
    public function EventBooking()
    {
        return $this->hasMany(EventBooking::class,'event_fk_id');
    }
    public function EventSlot()
    {
        return $this->belongsTo(EventTimeSlot::class,'event_fk_id','id');
    }
    
    //
    public function EventFile()
    {
        return $this->hasMany(EventFile::class,'event_fk_id');
    }
    public function EventActivity()
    {
        return $this->hasMany(EventActivity::class,'event_fk_id');
    }
    public function EventCreateUser(){

        return $this->hasOne(User::class,'id','user_fk_id');

    }
    public function User(){

        return $this->belongsTo(User::class,'event_fk_id','id');

    }

    public function FavoriteEvents(){
        
        return $this->hasOne(Favorite::class,'event_id','id');
    }
    public function EventsParentCategory(){
        
        return $this->hasOne(Categories::class,'id','event_category');
    }
    public function EventsChildCategory(){
        
        return $this->hasOne(Categories::class,'id','event_sub_category');
    }
    public function FavoriteCount(){
        
        return $this->hasMany(Favorite::class,'event_id','id');
    }

    public function EventFilePayment()
    {
        return $this->hasMany(EventFilePayment::class,'event_fk_id','id');
    }
    public function EventDiscount()
    {
        return $this->hasOne(EventDiscount::class,'event_fk_id');
    }
    public function EventPayment()
    {
        return $this->hasMany(EventPayment::class,'event_fk_id','id');
    }

    public function Favorite(){
        return $this->belongsTo(FavoriteEvent::class,'event_id','id');
    }
    public function  EventReviews(){

        return $this->hasOne(EventReview::class,'event_id','id');
    }
    public function  EventReview(){

        return $this->hasMany(EventReview::class,'event_id','id');
    } 
    

}
