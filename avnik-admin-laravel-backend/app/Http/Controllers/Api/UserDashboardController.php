<?php
 
namespace App\Http\Controllers\Api;
 
use App\Events\User\UserActivity;
use App\Events\User\UserNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\AuthUser\AuthUser;
use App\Mail\User\UserForgotPasswordEmail;
use App\Mail\User\UserRegisterEmail;
use App\Models\UserProfile\UserProfile;
use App\Notifications\RegistrationConfirmationEmail;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
 
class UserDashboardController extends Controller
{
    private $status_code    =        200;
    //skip complete step
    public function skipStepComplete(Request $request){
        if(Auth()->check()){
            User::where('id',Auth()->user()->id)->update([
                'skip_steps'=>'1'
            ]);
            return response()->json(["status" => 200, "message" => "success", "data" => '']);
        }else{
            return response()->json(["status" => "failed", "message" => "please login", "data" => '']);
        }
    }
    //email Conformation
    public function emailConformation(Request $request){
        $token =$request->token;
        $email=$request->email;
        $userEmail=User::where('email',$email)->first();
        if(hash::check($token,$userEmail->remember_token)&&$email==$userEmail->email){
            if($userEmail->email_verified_at==null||$userEmail->email_verified_at==''){
                User::where('email',$email)->update([
                    'email_verified_at'=>Carbon::now()
                ]);
                $emailTemplate = DB::table('email_templates')->where('type','Registration')->first();
                $template = $emailTemplate->body;
   
   
                // $emailContent = view()->make('Email.EventCreatedEmail.index', $this->EventCreateNotification)->render();
                $template = str_replace('{{AV_name}}', $userEmail->name, $template);
                $template = str_replace('{{AV_phone}}', $userEmail->phone, $template);
                $template = str_replace('{{AV_userName}}', $userEmail->username, $template);
                $template = str_replace('{{AV_email}}', $userEmail->email, $template);
   
                // $emailContent =   view('Email.EventCreatedEmail.index',['content' => $template]);
   
                Mail::to($userEmail->email)->send(new UserRegisterEmail($template));
                return response()->json(["status" => 200, "message" => "success", "data" => '']);
            }else{
                return response()->json(["status" => 201, "message" => "your email already verify ", "data" => '']);
            }
        }else{
            return response()->json(["status" => "failed", "message" => "resend conformation link", "data" => '']);
        }
    }
    // User Registration
    public function userSignUp(Request $request,$token=null) {
        $validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            "email"             =>          "required|email|unique:users",
            "username"          =>          "required||alpha_dash|unique:users",
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            "phone"             =>          "unique:users|max:15"
        ]);
 
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }
        $rememberToken=Str::random(80);
        $name       =       $request->name;  
        $userDataArray          =       array(
            "name"         =>                $name,
            "username"          =>           now()->timestamp,
            "email"              =>          $request->email,
            "phone"              =>          $request->phone,
            "password"           =>          hash::make($request->password),
            "joined_on"          =>          Carbon::now(),
            "remember_token"     =>    hash::make($rememberToken)
        );
 
        $user_status    =    User::where("email", $request->email)->first();
 
        if(!is_null($user_status)) {
           return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! email already registered"]);
        }
                     
        $user    =  User::create($userDataArray);
   
        if(!is_null($user)) {
            $user=User::where('id',$user->id)->first();
            $details = [
                'body' =>'',
                'image' =>'',
                'title' => '<a href="'.url('/email-conform/'. $rememberToken . '/' . $user->email).'" target="_blank">Email Confirmation </a>',
                'description' => 'Email Conformation',
                'greeting' => 'Hi ' . $user->name,
                'thanks' => 'Thank you for using ' . url('/') . '!',
                'actionText' => 'View Event',
                'actionURL' => '<a href="'.url('/email-conform/'. $rememberToken . '/' . $user->email).'" target="_blank">Email Confirmation </a>',
                'order_id' => ''
            ];
 
        // $emailContent =   view('Email.EventCreatedEmail.index',['content' => $template]);
 
            Notification::send($user, new RegistrationConfirmationEmail($details));
            event(new UserNotification($user));
 
           $userProfile= UserProfile::where('user_fk_id',$user->id)->count();
           if($userProfile>0){
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
           }else{
            return response()->json(["status" => 201, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
           }
        }else {
            return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
        }
    }
 
// Social Media Login
   public function  SocialMediaLogin(Request $request){
 
 
 
   }
    // User Login
    public function userLogin(Request $request) {
 
        $uniqueEmailValidator          =       Validator::make($request->all(),
            [
                "email"             =>          "required|email|unique:users",
                "name"              =>           "required|string",
            ]
        );
        if($uniqueEmailValidator->fails()){
            $validator          =       Validator::make($request->all(),
            [
                "email"             =>          "required|email|",
                "password"          =>          "required"
            ]
          );
        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        // check if entered email exists in db
        $email_status    =   User::where("email", $request->email)->first();
        // if email exists then we will check password for the same email
        if(!is_null($email_status)) {
            $reactivateAccount = $email_status->status === 'deactivated';
            if (Auth::attempt(['email' => $request->email,'password' => $request->password])) {
                $user = $request->user();
                if ($reactivateAccount) {
                    User::where('id', $user->id)->update([
                        'status' => 'active',
                        'account_status' => 0,
                    ]);
                }
                $user = User::where('id',$user->id)->with('UserProfile')->first();
                $data['token'] = $user->createToken('MyApp')->accessToken;
                $data['name']  = $user->name;
                event(new UserActivity(request()->ip()));
                \Log::info('Login attempt from IP: ' . request()->ip());
                $userProfile= UserProfile::where('user_fk_id',$user->id)->count();
                $userDetail= User::where('id',$user->id)->where('skip_steps','1')->count();
                $loginMessage = $reactivateAccount ? "Your account has been reactivated successfully" : "You have logged in successfully";
                if($userDetail>0){
                    return response()->json(["status" => $this->status_code,"success" => true, "message" => $loginMessage, "data" => $user,"accessToken"=>$data['token'] ]);
                }else{
                    if($userProfile>0){
                        return response()->json(["status" => $this->status_code,"success" => true, "message" => $loginMessage, "data" => $user,"accessToken"=>$data['token'] ]);
                    }else{
                        return response()->json(["status" => 201,"success" => true, "message" => $loginMessage, "data" => $user,"accessToken"=>$data['token'] ]);
                    }
                }
               
            }else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
            }
        }
        else {
           return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        }
        }else{
           
            $password= Str::random(12);
            $rememberToken=Str::random(80);
            $name       =       $request->name;  
           $userDataArray          =       array(
            "name"         =>                $name,
            "username"          =>           now()->timestamp,
            "email"              =>          $request->email,
            // "phone"              =>          $request->phone,
            "password"           =>          hash::make($password),
            "joined_on"          =>          Carbon::now(),
            "remember_token"     =>          hash::make($rememberToken)
        );
 
        $user    =  User::create($userDataArray);
        $data['token'] = $user->createToken('MyApp')->accessToken;
        $data['name']  = $user->name;
        if(!is_null($user)) {
            $user=User::where('id',$user->id)->first();
            $details = [
                'body' =>'',
                'image' =>'',
                'title' => '<a href="'.url('/email-conform/'. $rememberToken . '/' . $user->email).'" target="_blank">Email Confirmation </a>',
                'description' => 'Email Conformation',
                'greeting' => 'Hi ' . $user->name,
                'thanks' => 'Thank you for using ' . url('/') . '!',
                'actionText' => 'View Event',
                'actionURL' => '<a href="'.url('/email-conform/'. $rememberToken . '/' . $user->email).'" target="_blank">Email Confirmation </a>',
                'order_id' => ''
            ];
 
        // // $emailContent =   view('Email.EventCreatedEmail.index',['content' => $template]);
 
            Notification::send($user, new RegistrationConfirmationEmail($details));
            event(new UserNotification($user));
 
           $userProfile= UserProfile::where('user_fk_id',$user->id)->count();
           if($userProfile>0){
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user,"accessToken"=>$data['token']]);
           }else{
            return response()->json(["status" => 201, "success" => true, "message" => "Registration completed successfully", "data" => $user,"accessToken"=>$data['token']]);
           }
        }else {
            return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
        }
        }
       
    }
 
    // Get User Details By Email
   
    public function userDetail($email) {
   
        $user               =       array();
        if($email != "") {
            $user           =       User::where('id', $email)->first();
         if($user){
            event(new UserActivity(request()->ip()));
            return  response()->json($user);
         }else{
            return response()->json(["status" => "failed", "success" => false, "message" => "User Name doesn't exist."]);
         }
        }
    }
 
    // Get Auth || Login User Data
    public function  AuthUserService(Request $request){
           
        if(auth()->user()){
            $user=User::where('id',auth()->user()->id)->with('UserProfile')->first();
           
            event(new UserActivity(request()->ip()));
            return response()->json(["status" => $this->status_code,"success" => true, "message" => 'Welcome to Avnik '.auth()->user()->name, "data" =>$user]);
 
        }else{
                return response()->json(["status" => "failed", "success" => false, "message" => "User doesn't exist."]);
        }
 
    }
 
 
// Send Forget  Password Link
 
    public function forgotPassword(Request $request){
 
        if($request->email){
           $user= User::where('email',$request->email)->first();
           if(!is_null($user)){
            $resetCount= DB::table('password_resets')->where('email',$user->email)->count();
           if($resetCount>0){
                DB::table('password_resets')->where('email',$user->email)->update([
                    'email' => $request->email,
                    'token' =>  Str::random(80), //change 80 to any length you want
                    'created_at' => Carbon::now()
                ]);
           }else{
                DB::table('password_resets')->insert([
                    'email' => $request->email,
                    'token' => Str::random(80), //change 80 to any length you want
                    'created_at' => Carbon::now()
                ]);
           }
                   
           $tokenData = DB::table('password_resets')->where('email', $request->email)->first();
           $token = $tokenData->token;
           $email = $request->email;
           $url=url();
           $userData=[
               'token'=>$token,
               'email'=>$email,
               'url'=>$url,
               'name'=>$user->name,
           ];
             Mail::to($email)->send(new UserForgotPasswordEmail($userData));
             event(new UserActivity(request()->ip()));
             return  response()->json(["status" => $this->status_code,"message"=>"Reset Link Sending on your email please check your inbox"]);
 
            }else{
 
            return response()->json(["status" => "failed", "success" => false, "message" => "User Email doesn't exist."]);
           }
        }
    }
 
 
// Reset Password
 
    public function ResetPassword(Request $request){
 
        $validator          =       Validator::make($request->all(),
            [
                "email"             =>          "required|email",
                "token"          =>          "required"
            ]
        );
 
        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
 
            return response()->json($request->all());
    }
   
   
    public function validUsername(Request $request){
        $user=auth()->user();
        if($request->username){
            try{
                $username=User::where('username',$request->username)->where('id','!=',$user->id)->first();
                if(!empty($username)) {        
                    return response()->json(["status" => "failed", "validation_error" => '']);
                }else{
                    return response()->json(["status" => 200, "messages" =>'username valid','data'=>'']);
                }  
            }catch(Exception $e){
                return $e;
            }
        }
       
       
 
    }
 
}
 
 