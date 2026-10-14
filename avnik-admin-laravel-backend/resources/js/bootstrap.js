window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) { }

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from "laravel-echo"
// import Auth from "./Routes/Auth";

// window.pusher = require('pusher-js');
//  var pusher = new Pusher('f09671b0f92097410bd3');
//  window.Echo = new Echo({
//      broadcaster: 'pusher',
//      key: process.env.MIX_PUSHER_APP_KEY,
//      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//      encryption: false,
//      client: pusher,
//      authEndpoint: "/api/broadcasting/auth",
//      auth: {
//         headers: {
//         'Authorization': `Bearer ${Auth.getAccessToken()}`},
//         },
//  });

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     wssPort: 6001,
//     forceTLS: false,
//     disableStats: true,
//     authEndpoint: "/api/broadcasting/auth",
//     encrypted:false,
//     auth: {
//         headers: {
//             'Authorization': `Bearer ${Auth.getAccessToken()}`
//         },
//     },
//     enabledTransports: ['ws', 'wss']
// });
// console.log(
//     {key: process.env.MIX_PUSHER_APP_KEY}
// )
//  var pusher = new Pusher('f09671b0f92097410bd3');
//  var channel = pusher.subscribe('UserChannel');
//  channel.bind('.SendMessage', function(data) {
//    alert(JSON.stringify(data));
//  });