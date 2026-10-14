<?php

namespace App\Http\Middleware;

use Fideloper\Proxy\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string|null
     */
    protected $proxies = '*';

    /**
     * Trust Host + Proto from the edge proxy.
     * Do NOT trust X-Forwarded-Port: the internal proxy listens on :7000 and would
     * make Laravel emit https://staging.avnik.com:7000/... behind host TLS nginx.
     * Port comes from the Host header instead (e.g. 127.0.0.1:7000 locally).
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_HOST
        | Request::HEADER_X_FORWARDED_PROTO;
}
