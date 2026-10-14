<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Avnik Registration Succefully</title>
</head>
<link href="{{asset('css/app.css')}}" rel="stylesheet">
<body>
    <div>
        <h1>Hi {{$user->name}} Welcome  to avnik.com </h1>
        <table class="table">
            <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User Name</th>
            </thead>
            <tbody>
                <tr>
                <td>{{$user->name}}</td>
                    <td>{{$user->email}}</td>
                    <td>{{$user->phone}}</td>
                    <td>{{$user->username}}</td>
                </tr>
            </tbody>
        </table>
       <div class="row">
           <div class="col-12">
               {{"name:".''.$user->name.' '."Phone:".''.$user->phone.' '."Email:".''.$user->email.''."UserName:".''.$user->username}}
           </div>
       </div>
    </div>
</body>
</html>