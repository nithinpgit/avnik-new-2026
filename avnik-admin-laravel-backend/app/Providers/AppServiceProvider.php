<?php

namespace App\Providers;

use App\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Stripe\Stripe;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        // User::setStripeKey(Config::get('services.stripe.secret'));

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (!$this->app->runningInConsole()) {
            $request = $this->app['request'];

            // Follow the scheme the browser / edge proxy actually used so the same
            // stack works for http://localhost:7000, http://127.0.0.1:7000, and
            // https://staging.avnik.com. Do not upgrade plain HTTP just because
            // FORCE_HTTPS is set (that broke local proxy access).
            $forwardedProto = strtolower((string) $request->header('X-Forwarded-Proto', ''));
            $wantsHttps = $request->isSecure()
                || $forwardedProto === 'https'
                || strpos($forwardedProto, 'https') === 0;

            if ($wantsHttps) {
                URL::forceScheme('https');
            }
        }

        Stripe::setApiKey(config('services.stripe.secret'));
        Schema::defaultStringLength(191);
    }
}
