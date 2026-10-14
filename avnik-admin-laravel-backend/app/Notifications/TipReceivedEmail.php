<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\DB;

class TipReceivedEmail extends Notification
{
    use Queueable;
    private $data;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        $this->data =$data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $emailTemplate = DB::table('email_templates')->where('type','PassworodResetEmail')->first();
        $template = $emailTemplate->body;
        // Render the dynamic content using Blade
        $template = str_replace('{{AV_name}}', $notifiable->name, $template);
        $template = str_replace('{{AV_orderId}}', $this->data['order_id'], $template);
        $template = str_replace('{{AV_eventUrl}}', $this->data['actionURL'], $template);
        return (new MailMessage)
            ->subject('Your booking confirmation')
            ->view('Email.layout', ['content' => $template]);   
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
            'image'=>$this->data['image'],
            'title'=>$this->data['title'],
            'description'=>$this->data['description'],
            'actionURL'=>$this->data['actionURL'],
        ];
    }
}
