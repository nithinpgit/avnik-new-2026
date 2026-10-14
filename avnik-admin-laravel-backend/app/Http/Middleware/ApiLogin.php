<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class ApiLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
        // $secret = DB::table('oauth_clients')
        //     ->where('id', '9296517c-2e76-4710-82eb-1e57035ff0ba')
        //     ->pluck('secret')
        //     ->first();

        // $request->merge([
        //     'grant_type' => 'password',
        //     'client_id' => '9296517c-2e76-4710-82eb-1e57035ff0ba',
        //     'client_secret' => $secret,
        // ]);
        return $next($request)->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', '*')
        ->header('Access-Control-Allow-Credentials', true)
        ->header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Token-Auth,Authorization')
        ->header('Accept', 'application/json');
    }
}
