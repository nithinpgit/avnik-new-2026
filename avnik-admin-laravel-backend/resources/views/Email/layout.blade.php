<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email By Avnik</title>
</head>
<link href="{{asset('css/app.css')}}" rel="stylesheet">
<body>
    <div style="background-color: #f4f4f4; padding: 20px;">
       
        <div>
            {!!htmlspecialchars_decode($content)!!}
        </div>
    </div>
</body>
</html>
