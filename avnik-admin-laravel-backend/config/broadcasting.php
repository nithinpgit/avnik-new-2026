<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default broadcaster that will be used by the
    | framework when an event needs to be broadcast. You may set this to
    | any of the connections defined in the "connections" array below.
    |
    | Supported: "pusher", "redis", "log", "null"
    |
    */

    'default' => env('BROADCAST_DRIVER', 'redis'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that will be used
    | to broadcast events to other systems or over websockets. Samples of
    | each available type of connection are provided inside this array.
    |
    */

    'connections' => [

        'pusher' => [
            // 'driver' => 'pusher',
            // 'key' => env('PUSHER_APP_KEY'),
            // 'secret' => env('PUSHER_APP_SECRET'),
            // 'app_id' => env('PUSHER_APP_ID'),
            // 'options' => [
            //     'cluster' => env('PUSHER_APP_CLUSTER'),
            //     'host' => env('LARAVEL_WEBSOCKETS_HOST', '127.0.0.1'),
            //     'useTLS' => env('USE_TLS',false),
            //     'port' => env('LARAVEL_WEBSOCKETS_PORT',6001),
            //     'scheme' => env('LARAVEL_SCHEEME','http'),
            //     'curl_options' => [
            //         CURLOPT_SSL_VERIFYHOST => 0,
            //         CURLOPT_SSL_VERIFYPEER => 0,
            //     ],
            // ],
            'driver' => 'pusher',
            'key' => "f09671b0f92097410bd3",
            'secret' => "571e4e787251169d2cc8",
            'app_id' => 1211775,
            'options' => [
                'cluster' => 'ap2',
                'host' => '127.0.0.1',
                'useTLS' =>false,
                'port' => 6001,
                'scheme' => 'http',
                'curl_options' => [
                    CURLOPT_SSL_VERIFYHOST => 0,
                    CURLOPT_SSL_VERIFYPEER => 0,
                ],
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
