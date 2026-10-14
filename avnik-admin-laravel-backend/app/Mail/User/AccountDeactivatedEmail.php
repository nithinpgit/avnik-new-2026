<?php

namespace App\Mail\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AccountDeactivatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $content = '<p>Hi ' . e($this->details['name']) . ',</p>';
        $content .= '<p>Your account has been deactivated successfully.</p>';

        if (!empty($this->details['payoutProcessed'])) {
            $content .= '<p>Your available wallet amount of $' . number_format((float) $this->details['availableWalletAmount'], 2) . ' has been transferred to your bank account.</p>';
        } elseif (!empty($this->details['payoutHeldInWallet'])) {
            $content .= '<p>Your available wallet amount of $' . number_format((float) $this->details['availableWalletAmount'], 2) . ' remains in your deactivated account because no bank account was added.</p>';
        }

        $content .= '<p>If you wish to reactivate the account, please log in again.</p>';

        return $this->subject('Your account has been deactivated')
            ->view('Email.layout', ['content' => $content]);
    }
}
