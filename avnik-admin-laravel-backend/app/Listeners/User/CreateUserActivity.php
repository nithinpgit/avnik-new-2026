<?php

namespace App\Listeners\User;

use App\Events\User\UserActivity;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\User;
use Auth;
use Carbon\Carbon;
class CreateUserActivity
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserActivity  $event
     * @return void
     */
    public function handle(UserActivity $event)
    {
        //
        if(auth()->check()){
            User::where('id',auth()->user()->id)->update([
                'last_ip'=>$event->userip,
                'last_activity'=>Carbon::now(),
                'last_active'=>Carbon::now(),
            ]);
        }  
    }
}
