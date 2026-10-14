<?php

namespace App\Providers;

use App\Events\Chats\SendMessage;
use App\Events\User\SaveContact;
use App\Events\User\UserActivity;
use App\Events\User\UserNotification;
use App\Listeners\SendMessageListener;
use App\Listeners\User\CreateUserActivity;
use App\Listeners\User\SaveContactListener;
use App\Listeners\User\SendUserNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        UserActivity::class => [
            CreateUserActivity::class,
        ],
        UserNotification::class => [
            SendUserNotification::class,
        ],
        SaveContact::class => [
            SaveContactListener::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
