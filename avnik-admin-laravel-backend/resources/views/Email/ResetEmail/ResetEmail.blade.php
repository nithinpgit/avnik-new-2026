<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Rest Email</title>
</head>
<body>
    <div>
        <table class="table">
        
            <a href={{url('/reset/email/'.$event['email']).'/'.$event['token']}} class="btn default-btn">Confirm Reset Email</a>
        </table>
    </div>
</body>
</html>