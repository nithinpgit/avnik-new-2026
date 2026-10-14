<?php

namespace App\Mail\ShareProfile;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SharePrfile extends Mailable
{
    use Queueable, SerializesModels;
    
    public $event;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($event)
    {
        //
        $this->event=$event;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('Email.ShareProfile.ShareProfile');
    }
}
