<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $user->name }}</title>

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:title" content="{{ $user->name }}">
    
    <meta property="og:description" 
          content="{{ $user->bio ?? 'Check out this profile on our platform.' }}">

    <meta property="og:image" 
          content="{{ $user->profile_picture ? asset($user->profile_picture) : asset('default-profile.jpg') }}">

    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="profile">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">

    <meta name="twitter:title" 
          content="{{ $user->name }}">

    <meta name="twitter:description" 
          content="{{ $user->about_me ?? 'Check out this profile on our platform.' }}">

    <meta name="twitter:image" 
          content="{{ $user->profile_picture ? asset($user->profile_picture) : asset('default-profile.jpg') }}">
          
    <!-- SEO -->
    <meta name="description" 
          content="{{ $user->about_me ?? 'Check out this profile on our platform.' }}">

    <!-- Redirect -->
     

    <!-- Fallback -->
    <meta http-equiv="refresh" 
          content="3;url={{ url('/profile/'.$user->username) }}">
</head>
<body style="font-family: Arial, sans-serif; text-align:center; padding-top:100px;">

    <h2>Redirecting...</h2>
    <p>
        If you are not redirected automatically,
        <a href="{{ url('/profile/'.$user->username) }}">click here</a>
    </p>
</body>
</html>