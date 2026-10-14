<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     * 
     */
    public $message;
    public function __construct($message)
    {
        //
        return $this->message=$message;
    }


    public function broadcastOn()
    {
        return new Channel('user-channel');
    }

    public function BroadcastAs(){
         return 'UserEvent';
    }
    public function BroadcastWith(){
        return ['key'=>'value'];
   }
}
