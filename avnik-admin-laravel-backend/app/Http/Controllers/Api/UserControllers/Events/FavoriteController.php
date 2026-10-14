<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Contacts\Contact;
use App\Models\Events\Event;
use App\Models\Events\FavoriteEvent;
use App\Models\Favorites\Favorite;
use App\Models\FavoriteUser\FavoriteUser;
use App\User;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FavoriteController extends Controller
{
    //
    private $status_code = 200;

    public function index(Request $request)
    {

        $user = auth()->user();
        if($request->filterBy=="All"){
            $MyFavorites=Favorite::where('user_id',$user->id)->with(['MyFavoriteUsers'=> function($q){
                $q->with(['UserProfile'=>function($q){
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url','country');
                }]);
            },'MyFavoriteEvents'=> function($q){
                $q->select('id', 'event_files','user_fk_id','event_title','event_type','cost','remember_token');
            }])->whereHas('MyFavoriteEvents',function($query)use($request){
                $query->orWhere('event_title', 'LIKE', "%$request->searchQuery%");
            })->whereHas('MyFavoriteUsers',function($query)use($request){
                $query->orWhere('name', 'LIKE', "%$request->searchQuery%");
            })->paginate(20);
        }else if($request->filterBy=="Users"){
            $MyFavorites=Favorite::where('user_id',$user->id)->with(['MyFavoriteUsers'=> function($q){
                $q->with(['UserProfile'=>function($q){
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url','country');
                }]);
            }])->whereHas('MyFavoriteUsers',function($query)use($request){
                $query->where('name', 'LIKE', "%$request->searchQuery%");
            })->paginate(20);
        }else if($request->filterBy=="Events"){
            $MyFavorites=Favorite::where('user_id',$user->id)->with(['MyFavoriteEvents'=> function($q){
                $q->select('id', 'event_files','user_fk_id','event_title','event_type','cost','remember_token');
            }])->whereHas('MyFavoriteEvents',function($query)use($request){
                $query->where('event_title', 'LIKE', "%$request->searchQuery%");
            })->paginate(20);
        }else{
            $MyFavorites=Favorite::where('user_id',$user->id)->with(['MyFavoriteUsers'=> function($q){
                $q->with(['UserProfile'=>function($q){
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url','country');
                }]);
            },'MyFavoriteEvents'=> function($q){
                $q->select('id', 'event_files','user_fk_id','event_title','event_type','cost','remember_token');
            }])->whereHas('MyFavoriteEvents',function($query)use($request){
                $query->orWhere('event_title', 'LIKE', "%$request->searchQuery%");
            })->whereHas('MyFavoriteUsers',function($query)use($request){
                $query->orWhere('name', 'LIKE', "%$request->searchQuery%");
            })->paginate(20);
        }
        return response()->json(["status" => $this->status_code, "message" => "Fetch Favorite List Successfully ", 'data' => $MyFavorites]);
    }
    //  Favorite Event Toggle

    public function Favorite(Request $request){

        $user=auth()->user();
        $event=Event::where('user_fk_id',$user->id)->where('id',$request->eventId)->count();
        $FavUser=Favorite::where('user_id',$user->id)->where('to_user',$request->userId)->count();
        if(User::where('id',$request->userId)->count()<=0&&$request->userId){
            return response()->json(["status" => "failed", "message" => "this user no longer existing",]);
        }elseif(Event::where('id',$request->eventId)->count()<=0&&$request->eventId){
            return response()->json(["status" => "failed", "message" => "this Event no longer existing",]);
        }else{
            if($user->id!=$request->userId&&$request->userId){
                if ($FavUser>0) {
                    $favorite = Favorite::where('user_id', $user->id)->where('to_user', $request->userId)->delete();
                    return response()->json(["status" => $this->status_code, "message" => "Removed from favorites", 'data' => $favorite]);
                } else {
                    try{
                        $favorite = new Favorite();
                        $favorite->user_id = $user->id;
                        $favorite->to_user = $request->userId;
                        $favorite->remember_token = Str::random(60);
                        $favorite->save();
                        return response()->json(["status" => $this->status_code, "message" => "Added to favorites", 'data' => $favorite]);
                    }catch(Exception $e){
                        return $e;
                    }
                   

                }
            }else if($event<=0&&$request->eventId){
                 if (Favorite::where('user_id', $user->id)->where('event_id', $request->eventId)->count() > 0) {
                    $favorite = Favorite::where('user_id', $user->id)->where('event_id', $request->eventId)->delete();
                    return response()->json(["status" => $this->status_code, "message" => "Removed from favorites", 'data' => $favorite]);
                } else {
                    $favorite = new Favorite();
                    $favorite->user_id = $user->id;
                    $favorite->event_id = $request->eventId;
                    $favorite->remember_token = Str::random(60);
                    $favorite->save();
                    return response()->json(["status" => $this->status_code, "message" => "Added to favorites", 'data' => $favorite]);
                }
            }else{
                return response()->json(["status" => "failed", "message" => '!Sorry you cant do this action']);
            }
        }

       


    }



}
