<?php

namespace App\Listeners\User;

use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserNotification
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
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        //
        if(auth()->check()){
            User::where('id',auth()->user()->id)->update([
                'read_notification'=>'0',
            ]);
        }
    }
}
