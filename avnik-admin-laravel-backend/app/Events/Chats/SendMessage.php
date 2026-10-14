<?php

namespace App\Events\Chats;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldBroadcastNow
{
     use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
  public $message;
  
  public function __construct($message)
  {
      $this->message = $message;
  }
  public function broadcastOn()
  {

      return new PresenceChannel('SendMessageChannel'.$this->message->room_id);
    //   return new Channel('SendMessageChannel');
  }
  public function broadcastWith()
  {
        return  [$this->message];
  }
  public function broadcastAs()
  {
        return 'SendUserMessage';
  }
}
