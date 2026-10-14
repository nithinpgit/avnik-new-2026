<?php

namespace App;

use App\Models\Chat\ChatConversation;
use App\Models\Chat\ChatRoomUser;
use App\Models\Events\Event;
use App\Models\Events\EventActivity;
use App\Models\Events\EventFile;
use App\Models\Events\EventFilePayment;
use App\Models\Events\EventPayment;
use App\Models\Events\EventReview;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\FavoriteEvent;
use App\Models\Favorites\Favorite;
use App\Models\FavoriteUser\FavoriteUser;
use App\Models\UserProfile\UserProfile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens,Notifiable,Billable;
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','username','joined_on','phone','phone_verified_at','phone_verified_status','email_verified_at','email_verified_status','social_user_id','social_nickname','social_avatar','social_avatar_original','social_profile_url','social_refreshToken','social_expiresIn','social_token','social_provider','status','account_status','role','last_ip','last_login','date_of_created','last_activity','last_active','last_password_change','remember_token', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function Event(){
     
        return $this->belongsTo(Event::class, 'user_fk_id');
    
    }
    public function Events(){
     
        return $this->hasMany(Event::class, 'user_fk_id','id');
    
    }

    public function EventFile(){

        return $this->hasMany(EventFile::class, 'user_fk_id');
        
    }

    public function EventTimeSlot(){
        return $this->hasMany(EventTimeSlot::class, 'user_fk_id');
    }

    public function EventActivity(){
        return $this->hasMany(EventActivity::class, 'user_fk_id');
    }

    public function UserProfile(){

        return $this->hasOne(UserProfile::class, 'user_fk_id','id');

    }
    public function UserProfileFilter(){

        return $this->hasOne(UserProfile::class, 'user_fk_id','id')->select('id','profile_picture','country');

    }   

    public function EventFilePayment(){
        return $this->hasMany(EventFilePayment::class, 'user_fk_id');
    }

    public function EventPayment()
    {
        return $this->hasMany(EventPayment::class,'user_fk_id','id');
    }
    public function EventPaymentSlot()
    {
        return $this->belongsTo(EventPayment::class,'user_fk_id','id');
    }
    public function MyFavoriteUsers()
    {
        return $this->hasOne(Favorite::class,'to_user','id');
    }
    public function FavoriteUserCount()
    {
        return $this->hasMany(Favorite::class,'to_user','id');
    }
   
    public function FavoriteEvent()
    {
        return $this->hasOne(Favorite::class,'user_id','id');
    }
    public function FavoriteEventCount()
    {
        return $this->hasMany(Favorite::class,'user_id','id');
    }
   
   
    // Chat system relationships  
    
    public function ChatRoomUsers()
    {
        return $this->hasMany(ChatRoomUser::class);
    }

    public function ChatConversation()
    {
        return $this->hasMany(ChatConversation::class,'id');
    }
    public function EventReviews()
    {
        return $this->hasOne(EventReview::class,'host_id','id');
    }
    

}
