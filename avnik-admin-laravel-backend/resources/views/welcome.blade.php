<!doctype html>
<html lang={{ str_replace('_', '-', app()->getLocale()) }}>
<head>
    <meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- CSRF Token -->
    <style>
        .avnik-multiSelect{
            z-index: 4!important;
    position: relative!important;
        }

        .react-time-picker__wrapper{
            border:none!important;
        }
       

       /* Full calendar css start*/
        .fc-highlight {
                background: #1453887d !important;
        }
        .react-calendar{
            border:none !important;
        }
       /* Full calendar css End */
       
    </style>
<meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">
<title id="web-title">{{ config('app.name', 'Laravel') }}</title>
<link rel="apple-touch-icon" sizes="57x57" href={{asset('../assets/images/favicon/apple-icon-57x57.png')}}>
<link rel="apple-touch-icon" sizes="60x60" href={{asset('../assets/images/favicon/apple-icon-60x60.png')}}>
<link rel="apple-touch-icon" sizes="72x72" href={{asset('../assets/images/favicon/apple-icon-72x72.png')}}>
<link rel="apple-touch-icon" sizes="76x76" href={{asset('../assets/images/favicon/apple-icon-76x76.png')}}>
<link rel="apple-touch-icon" sizes="114x114" href={{asset('../assets/images/favicon/apple-icon-114x114.png')}}>
<link rel="apple-touch-icon" sizes="120x120" href={{asset('../assets/images/favicon/apple-icon-120x120.png')}}>
<link rel="apple-touch-icon" sizes="144x144" href={{asset('../assets/images/favicon/apple-icon-144x144.png')}}>
<link rel="apple-touch-icon" sizes="152x152" href={{asset('../assets/images/favicon/apple-icon-152x152.png')}}>
<link rel="apple-touch-icon" sizes="180x180" href={{asset('../assets/images/favicon/apple-icon-180x180.png')}}>
<link rel="icon" type="image/png" sizes="192x192" href={{asset('../assets/images/favicon/android-icon-192x192.png')}}>
<link rel="icon" type="image/png" sizes="32x32" href={{asset('../assets/images/favicon/favicon-32x32.png')}}>
<link rel="icon" type="image/png" sizes="96x96" href={{asset('../assets/images/favicon/favicon-96x96.png')}}>
<link rel="icon" type="image/png" sizes="16x16" href={{asset('../assets/images/favicon/favicon-16x16.png')}}>
<!-- Styles -->

    <link href={{asset('../css/app.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/avnik-fonts.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/dev.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/avnik-scroll.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/bootstrap.min.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/font-awesome.min.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/main-avnik.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/reset.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/mfb.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/responsive.css')}} rel="stylesheet">
    <link href={{asset('../assets/css/chosen.css')}} rel="stylesheet">
    <link rel="stylesheet" href={{asset('../assets/css/jquery.horizontalmenu.css')}}>
    <link href={{asset('../assets/css/wickedpicker.min.css')}} rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossorigin="anonymous" />
</head>
    <body>
        <div id="root" class="fix-footer">

        </div> 
    <script src={{asset('../js/app.js')}} defer></script>
    <script src={{ asset('../js/bootstrap.min.js') }}></script>


    <script src={{asset('../assets/js/jquery-3.5.1.min.js')}}></script>
    <script src={{asset('../assets/js/avnik-helpers.js')}} ></script>
    <script defer src={{asset('../assets/js/avnik-scroll.js')}}></script>
    <script defer src={{asset('../assets/js/main-avnik.js')}}></script>
    <script src={{asset('../assets/js/jquery.imagelistexpander.js')}} defer></script>
    <script src={{asset('../assets/js/mfb.js')}} defer></script>
    <script defer src={{asset('../assets/js/jquery.horizontalmenu.js')}}></script>
    <script defer src={{asset('../assets/js/chosen.jquery.js')}}></script>
    

 {{--jquery script  --}}
 <script src={{asset('../assets/js/wickedpicker.min.js')}}></script>
 <script defer src={{asset('../assets/js/bootstrap-datepicker.js')}}></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous"></script>    

    <script>
        toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        }
    </script>
<script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
</body>      
</html>
