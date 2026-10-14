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

class Conversations implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $Conversations;
    public function __construct($Conversations)
    {
        $this->Conversations = $Conversations;
    }
    public function broadcastOn()
    {
        return new PresenceChannel('ConversationsChannel');
    }
    public function broadcastWith()
    {
        return $this->Conversations;
    }
    public function broadcastAs()
    {
        return 'Conversations';
    }
}
