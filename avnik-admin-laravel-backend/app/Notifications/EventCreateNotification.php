<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Str;
class EventCreateNotification extends Notification
{
    use Queueable;

    private $EventCreateNotification;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($EventCreateNotification)
    {
        //
        $this->EventCreateNotification =$EventCreateNotification;
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
        $emailTemplate = DB::table('email_templates')->where('type','CreateEventEmail')->first();
        $template = $emailTemplate->body;

        // Render the dynamic content using Blade
        $renderedTemplate = Blade::compileString($template);
        // $emailContent = view()->make('Email.EventCreatedEmail.index', $this->EventCreateNotification)->render();
        $template = str_replace('{{AV_name}}', $notifiable->name, $template);
        $template = str_replace('{{AV_cost}}', '$20', $template);

        // $emailContent =   view('Email.EventCreatedEmail.index',['content' => $template, 'data'=> $this->EventCreateNotification]);

        return (new MailMessage)
            ->subject('New Event Created Successfully')
            ->view('Email.layout', ['content' => $template]);
        // return (new MailMessage)
        // ->greeting($this->EventCreateNotification['greeting'])
        // ->line($this->EventCreateNotification['body'])
        // ->action($this->EventCreateNotification['actionText'], $this->EventCreateNotification['actionURL'])
        // ->line($this->EventCreateNotification['thanks']);
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
            'image'=>$this->EventCreateNotification['image'],
            'title'=>$this->EventCreateNotification['title'],
            'description'=>$this->EventCreateNotification['description'],
            'actionURL'=>$this->EventCreateNotification['actionURL'],

        ];
    }
}
