<?php

namespace App\Http\Controllers\Api\UserControllers\SocialMedia;

use App\Events\User\UserActivity;
use App\Http\Controllers\Controller;
use App\Mail\User\UserRegisterEmail;
use App\Models\SocialIdentify\SocialIdentifier;
use App\Models\UserProfile\UserProfile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PDOException;

class SocialMediaController extends Controller
{
    //
public $status_code=200;
    public function SocialMedia(Request $request)
    {
       
        $user=User::where('email',$request->email)->first();
        if(!is_null($user)){
             $socialIdentifiers=SocialIdentifier::where('user_fk_id',$user->id)->where('provider_name',$request->provider)->where('provider_id',$request->provider_id)->first();
             if(!is_null($socialIdentifiers)){
                try{
                    if (!is_null($user)&&!is_null($socialIdentifiers)) {
                        $user = User::where('id',$user->id)->with('UserProfile')->first();
                        $data['token'] = $user->createToken('MyApp')->accessToken;
                        $data['name']  = $user->name;
                        event(new UserActivity(request()->ip()));
                        return response()->json(["status" => $this->status_code,"success" => true, "message" => "You have logged in successfully", "data" => $user,"accessToken"=>$data['token'] ]);
                    }else {
                        return response()->json(["status" => "failed", "success" => false, "message" => "Sorry something was wrong."]);
                    }
                }catch(\PDOException $e){
   
                }  
             }else{
                 
                try{

                    DB::beginTransaction();
                    
                        $socialIdentifiersCreate=new SocialIdentifier();
                        $socialIdentifiersCreate->provider_name=$request->provider;
                        $socialIdentifiersCreate->provider_id=$request->provider_id;
                        $socialIdentifiersCreate->user_fk_id=$user->id;
                        $socialIdentifiersCreate->remember_token=Str::random(70);
                        $socialIdentifiersCreate->save();

                        $checkProfile=UserProfile::where('user_fk_id',$user->id)->first();
                        if(!is_null($checkProfile)){
                            $UserProfileOLD= UserProfile::where('user_fk_id',$user->id)->update([
                            'social_profile_picture_url'=>$checkProfile->social_profile_picture_url!=null?$checkProfile->social_profile_picture_url:$request->provider_pic,
                            'user_fk_id'=>$user->id,
                            'remember_token'=>Str::random(70)
                            ]);
                            
                        }else{
                            $UserProfileOLD=new UserProfile();
                            $UserProfileOLD->social_profile_picture_url=$request->provider_pic;
                            $UserProfileOLD->user_fk_id=$user->id;
                            $UserProfileOLD->remember_token=Str::random(70);
                            $UserProfileOLD->save();
                        }
                       
                        if (!is_null($user)&&!is_null($socialIdentifiersCreate)) {
                            $user = User::where('id',$user->id)->with('UserProfile')->first();
                            $data['token'] = $user->createToken('MyApp')->accessToken;
                            $data['name']  = $user->name;
                            event(new UserActivity(request()->ip()));
                            DB::commit();
                            return response()->json(["status" => $this->status_code,"success" => true, "message" => "You have logged in successfully", "data" => $user,"accessToken"=>$data['token'] ]);
                        }else {
                            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
                        }
                   
                }catch(\PDOException $e){
                    DB::rollBack();
                } 
             } 
        }else{
            try{
                DB::beginTransaction();
                $username='avnik';
                if($request->email){
                    $emailExplode=explode('@',$request->email);
                    $username=$emailExplode[0];
                }
                $userCreate = new User();
                $userCreate->name=$request->name;
                $userCreate->username= $username.rand(0,999999);
                $userCreate->email    = $request->email;
                $userCreate->joined_on=Carbon::now();
                $userCreate->save();

                $socialIdentifiers=new SocialIdentifier();
                $socialIdentifiers->provider_name=$request->provider;
                $socialIdentifiers->provider_id=$request->provider_id;
                $socialIdentifiers->user_fk_id=$userCreate->id;
                $socialIdentifiers->remember_token=Str::random(70);
                $socialIdentifiers->save();
                $UserProfile=new UserProfile();
                $UserProfile->social_profile_picture_url=$request->provider_pic;
                $UserProfile->user_fk_id=$userCreate->id;
                $UserProfile->remember_token=Str::random(70);
                $UserProfile->save();
                if(!is_null($userCreate)&&!is_null($socialIdentifiers)) {
                        if($userCreate->email){
                            $user=User::where('id',$userCreate->id)->first();
                            Mail::to($userCreate->email)->send(new UserRegisterEmail($user));
                        }
                        $NewUser = User::where('id',$userCreate->id)->with('UserProfile')->first();
                        $data['token'] = $NewUser->createToken('MyApp')->accessToken;
                        $data['name']  = $NewUser->name;
                        event(new UserActivity(request()->ip()));

                    DB::commit();
                    return response()->json(["status" => $this->status_code,"success" => true, "message" => "You have logged in successfully", "data" => $NewUser,"accessToken"=>$data['token']]);
                }else{
                    return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! try again"]);
                }
                
            }catch(\PDOException $e){
                DB::rollBack();
            } 
        }
       
    }



    public function linkedSocialAccount(Request $request,$userId){
        $user=auth()->user();
        if($user->id==$userId){
            $socialIdentifiers=SocialIdentifier::where('user_fk_id',$user->id)->where('provider_name',$request->provider)->where('provider_id',$request->provider_id)->first();
            try{
               if(is_null($socialIdentifiers)){
                   DB::beginTransaction();
                   $addNew= new SocialIdentifier();
                   $addNew->user_fk_id=$user->id;
                   $addNew->provider_name=$request->provider;
                   $addNew->provider_id=$request->provider_id;
                   $addNew->remember_token=Str::random(70);
                   $addNew->save();
                   $checkProfile=UserProfile::where('user_fk_id',$user->id)->first();
                        if(!is_null($checkProfile)){
                            $UserProfileOLD= UserProfile::where('user_fk_id',$user->id)->update([
                            'social_profile_picture_url'=>$checkProfile->social_profile_picture_url!=null?$checkProfile->social_profile_picture_url:$request->provider_pic,
                            'user_fk_id'=>$user->id,
                            'remember_token'=>Str::random(70)
                            ]);
                            
                        }else{
                            $UserProfileOLD=new UserProfile();
                            $UserProfileOLD->social_profile_picture_url=$request->provider_pic;
                            $UserProfileOLD->user_fk_id=$user->id;
                            $UserProfileOLD->remember_token=Str::random(70);
                            $UserProfileOLD->save();
                        }
                    DB::commit();
                   return response()->json(["status" => $this->status_code,"success" => true, "message" => "You are linked successfully", "data"=>$addNew]);

               }else{

                    return response()->json(["status" => "failed", "success" => false, "message" => "Your account linked already..."]);
               }                 
            }catch(PDOException $e){
                DB::rollBack();
            }
        }else{

            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! try again"]);
        }
    }


}
