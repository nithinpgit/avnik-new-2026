<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $event->event_title }}</title>
@php 
$eventFiles = json_decode($event->event_files, true);
// Check if event_files has data and grab the 0th index file_url
if (!empty($eventFiles) && is_array($eventFiles) && isset($eventFiles[0]['file_url'])) {
    $eventBanner = $eventFiles[0]['file_url'];
}
@endphp

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:title" content="{{ $event->event_title }}">
    <meta property="og:description" content="{{ $event->event_description }}">
    <meta property="og:image" content="{{  asset($eventBanner) }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $event->event_title }}">
    <meta name="twitter:description" content="{{ $event->event_description }}">
    <meta name="twitter:image" content="{{  asset($eventBanner) }}">

    <!-- SEO -->
    <meta name="description" content="{{ $event->event_description }}">

    <!-- Redirect to React URL -->
    <!-- <script>
        window.location.replace("{{ url('/event?token='.$event->remember_token.'&event='.$event->id) }}");
    </script> -->

    <!-- Fallback redirect if JS disabled -->
    <meta http-equiv="refresh" content="3;url={{ url('/event?token='.$event->remember_token.'&event='.$event->id) }}">
</head>

<body style="font-family: Arial, sans-serif; text-align:center; padding-top:100px;">

    <h2>Redirecting...</h2>

    <p>
        If you are not redirected automatically,
        <a href="{{ url('/event?token='.$event->remember_token.'&event='.$event->id) }}">
            click here
        </a>
    </p>

</body>
</html>