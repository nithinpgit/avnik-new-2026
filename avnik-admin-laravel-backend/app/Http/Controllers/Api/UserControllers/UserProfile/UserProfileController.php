<?php

namespace App\Http\Controllers\Api\UserControllers\UserProfile;

use App\Events\User\UserActivity;
use App\Http\Controllers\Controller;
use App\Mail\User\AccountDeactivatedEmail;
use App\Mail\ResetEmail\ResetEmail;
use App\Mail\ShareProfile\ShareProfile;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventPayment;
use App\Models\Events\EventReview;
use App\Models\Events\EventTimeSlot;
use App\Models\FavoriteUser\FavoriteUser;
use App\Models\Language\LanguageMaster;
use App\Models\ResetEmail as ModelsResetEmail;
use App\Models\UserProfile\UserProfile;
use App\Notifications\ShareEventEmail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $status_code = 200;
 /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
// return Carbon::now('UTC')->format('Y-m-d H:i:s');
        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
            
            $UserProfile = User::where('username', $request->username)->where('status', 'active')->with(['EventReviews' => function ($q) {
                $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating, COUNT(event_reviews.rating) AS average_count')
                    ->groupBy('host_id');
            },'UserProfile', 'Events' => function ($q) use ($user,$request) {
                $q->with(['EventDiscount', 'EventTimeSlot'=>function($q) use($request){
                    $q->whereDate('start_date_time','>', Carbon::now('UTC')->format('Y-m-d H:i:s'))->get();
                
                }, 'EventCreateUser'=>function($q){
                    $q->with(['EventReviews' => function ($q) {
                        $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.rating) AS average_count')
                            ->groupBy('host_id');
                    }]);
                }, 'FavoriteEvents' => function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                }, 'EventPayment'])->orderByDesc('id');
            }, 'MyFavoriteUsers' => function ($q) use ($user) {
                $q->where('user_id', $user->id);
            }, 'FavoriteUserCount'])->select('id', 'name', 'username', 'email', 'phone', 'phone_verified_status', 'email_verified_status', 'status', 'account_status', 'joined_on', 'role', 'last_login', 'date_of_created', 'last_activity', 'last_password_change')->first();
            if ($UserProfile) {
                return response()->json(['status' => $this->status_code, "message" => "Data Fetch...", "userProfile" => $UserProfile]);
            } else {
                return response()->json(["status" => "failed", "messages" => 'user does not exist']);
            }
        } else {
            $UserProfile = User::where('username', $request->username)->where('status', 'active')->with(['EventReviews' => function ($q) {
                $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating, COUNT(event_reviews.rating) AS average_count')
                    ->groupBy('host_id');
            },'UserProfile', 'Events' => function ($q) use($request) {
                $q->with(['EventDiscount', 'EventTimeSlot'=>function($q)use($request){
                    $q->whereDate('start_date_time','>', Carbon::now('UTC')->format('Y-m-d H:i:s'))->get();
                }, 'EventCreateUser'=>function($q){
                    $q->with(['EventReviews' => function ($q) {
                        $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.rating) AS average_count')
                            ->groupBy('host_id');
                    }]);
                }, 'FavoriteEvents', 'EventPayment'])->orderByDesc('id');
            }, 'MyFavoriteUsers' => function ($q) {
                $q->where('user_id', 0);
            }, 'FavoriteUserCount'])->select('id', 'name', 'username', 'email', 'phone', 'phone_verified_status', 'email_verified_status', 'status', 'account_status', 'joined_on', 'role', 'last_login', 'date_of_created', 'last_activity', 'last_password_change')->first();
            if ($UserProfile) {
                return response()->json(['status' => $this->status_code, "message" => "Data Fetch...", "userProfile" => $UserProfile]);
            } else {
                return response()->json(["status" => "failed", "messages" => 'user does not exist']);
            }
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // return $request->file;
        $validator =  Validator::make($request->all(),[
            'file' => 'max:20480',
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed","message"=>"Accept only 2MB file size", "validation_error" => $validator->errors()]);
        }else{
        try {
            $files = $request->file;
            $originalName = $files->getClientOriginalName();
            $name = $originalName;
            $file_size = $files->getSize();
            $file_extension = $files->getClientOriginalExtension();
            $path = storage_path('uploads/profiles/' . time() . '/');
            $newPath = $path;
            $newName = $name;
            $files->move($newPath, $newName);
            $userProfile = UserProfile::where('user_fk_id', auth()->user()->id)->first();
            if ($userProfile) {
                $fileData = UserProfile::where('user_fk_id', auth()->user()->id)->update([
                    'profile_picture' => 'storage/uploads/profiles/' . time() . '/' . $name
                ]);
            } else {
                $fileData = new UserProfile();
                $fileData->user_fk_id = auth()->user()->id;
                $fileData->profile_picture = 'storage/uploads/profiles/' . time() . '/' . $name;
                $fileData->remember_token = Str::random(60);
                $fileData->save();
            }
            $User = User::where('id', auth()->user()->id)->with('UserProfile')->first();

            return response()->json(['status' => $this->status_code, "message" => "Profile Picture Updated", "data" => $User]);
        } catch (\PDOException $e) {

            return response()->json(["status" => "failed", "success" => false, "message" => 'Something wrong please upload again']);
        }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return $id;
    }
     
    // Show Upcoming Events Slot 
    public function showUpcomingEventsSlot(Request $request)
    {
        $UserProfile = User::where('username', $request->profileId)->where('status', 'active')->select('id')->first();
        if ($UserProfile) {
            $UserUpcomingSlot = EventTimeSlot::with([
                    'Events',
                    'EventBooking' => function ($q) {
                        $q->where('status', 'enabled');
                    },
                    'EventPayment'
                ])
                ->whereHas('Events', function ($q) use ($UserProfile) {
                    $q->where('user_fk_id', $UserProfile->id);
                })
                // use UTC for comparison consistently
                ->where('start_date_time', '>=', Carbon::now('UTC')->toDateTimeString())
                ->first();

            return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $UserUpcomingSlot]);
        } else {
            return response()->json(["status" => 201, "message" => "Data not found ", 'data' => []]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {


        //    return $request->all();

        $user = auth()->user();
        $validator =   Validator::make(
            $request->all(),
            [
                'name' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", 'success' => false, "validation_error" => $validator->errors()]);
        }else{

        if ($user->id == $request->currentUserId) {
            if ($request->aboutMe && $request->edit) {
                $userData = UserProfile::where('user_fk_id', $user->id)->first();
                if ($userData) {
                    $updateProfile = UserProfile::where('user_fk_id', $user->id)->update([
                        'user_fk_id' => $user->id,
                        'about_me' => $request->aboutMe,
                    ]);
                } else {
                    $updateProfile = new UserProfile();
                    $updateProfile->user_fk_id = $user->id;
                    $updateProfile->about_me = $request->aboutMe;
                    $updateProfile->save();
                }

                return response()->json(['status' => $this->status_code, "message" => "Profile Updated", "data" => $updateProfile]);
            } else {


                try {
                    if ($request->password && $request->password_confirmation) {
                        $validator =   Validator::make(
                            $request->all(),
                            [
                                'password' => ['required', 'string', 'min:8', 'confirmed'],
                            ]
                        );

                        if ($validator->fails()) {
                            return response()->json(["status" => "failed", 'success' => false, "validation_error" => $validator->errors()]);
                        }
                    }


                    DB::beginTransaction();

                    if (auth()->user()->id == $request->currentUserId) {

                        if ($request->password && $request->password_confirmation) {
                            $userChanges = user::find(auth()->user()->id)->update([
                                'password' => Hash::make($request->password),
                            ]);
                        }
                        $username=User::where('username',$request->username)->where('id','!=',$user->id)->first();
                        $userChanges = user::find(auth()->user()->id)->update([
                            'name' => $request->name,
                            'username' => $request->username&&!empty($username)? $user->username : $request->username,
                            'phone' => $request->phone ? $request->phone : $user->phone,
                        ]);


                        $userData = UserProfile::where('user_fk_id', $user->id)->first();
                        if ($userData) {

                            $updateProfile = UserProfile::where('user_fk_id', $user->id)->update(
                                [
                                    'language' => $request->language ? json_encode($request->language) : $userData->language,
                                    'skill' => $request->skill ? $request->skill : $userData->skill,
                                    'address' => $request->address ? $request->address : $userData->address,
                                    'date_of_birth' => $request->dateOfBirth ? $request->dateOfBirth : $user->dateOfBirth,
                                    
                                    'gender' => $request->gender ? $request->gender : $userData->gender,
                                    'profession' => $request->profession ? json_encode($request->profession) : $userData->profession,
                                    'alt_address' => $request->altAddress ? $request->altAddress : $userData->profession,
                                    'country' => $request->country ? $request->country : $userData->country,
                                    'state' => $request->state ? $request->state : $userData->state,
                                    'city' => $request->city ? $request->city : $userData->city,
                                    'zip_code' => $request->zipCode ? $request->zipCode : $userData->zip_code,
                                ]
                            );
                        } else {

                            $updateProfile = new UserProfile();
                            $updateProfile->user_fk_id = $user->id;
                            if ($request->language) {
                                $updateProfile->language = json_encode($request->language);
                            }
                            $updateProfile->date_of_birth = $request->dateOfBirth;
                            $updateProfile->gender = $request->gender;

                            $updateProfile->skill = $request->skill;
                            $updateProfile->address = $request->address;
                            $updateProfile->alt_address = $request->altAddress;
                            if ($request->profession) {
                                $updateProfile->profession = json_encode($request->profession);
                            }
                            $updateProfile->country = $request->country;
                            $updateProfile->state = $request->state;
                            $updateProfile->city = $request->city;
                            $updateProfile->zip_code = $request->zipCode;
                            $updateProfile->remember_token = Str::random(60);
                            $updateProfile->save();
                        }
                        DB::commit();

                        return response()->json(['status' => $this->status_code, "message" => "Profile Updated", "data" => User::find(auth()->user()->id)]);
                    } else {
                        return response()->json(["status" => "failed", 'success' => false, "message" => 'Please login with email and change the update']);
                    }
                } catch (\PDOException $e) {

                    DB::rollBack();
                    // return "!oops";
                    return $e->getMessage();
                }
            }
        } else {

            return response()->json(["status" => "failed", "message" => 'sorry you can not edit this profile']);
        }
        }

      }

    public function deactivateAccount(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(["status" => "failed", "message" => "Please login first"]);
        }

        $upcomingBookings = EventBooking::where('status', 'enabled')
            ->where('start_date_time', '>=', Carbon::now('UTC')->toDateTimeString())
            ->where(function ($query) use ($user) {
                $query->where('p_user_id', $user->id)
                    ->orWhere('h_user_id', $user->id);
            })
            ->count();

        if ($upcomingBookings > 0) {
            return response()->json([
                "status" => "failed",
                "message" => "You have active bookings. Cancel those upcoming events before you can deactivate account."
            ]);
        }

        $walletRows = EventPayment::where('amount', '>', 0)
            ->where('withdraw_amount', 0)
            ->where('released', 1)
            ->where('to_user', $user->id);
        $grossWalletAmount = (float) $walletRows->sum('amount');
        $availableWalletAmount = round($grossWalletAmount * 80 / 100, 2);
        $payoutProcessed = false;
        $payoutHeldInWallet = false;
        $eventIds = Event::where('user_fk_id', $user->id)->pluck('id');

        DB::beginTransaction();

        try {
            Event::whereIn('id', $eventIds)->update([
                'status' => 0,
                'is_active' => 0,
            ]);

            EventTimeSlot::whereIn('event_fk_id', $eventIds)->update([
                'status' => 'disabled',
            ]);

            User::where('id', $user->id)->update([
                'status' => 'deactivated',
                'account_status' => 1,
            ]);

            if ($availableWalletAmount > 50 && $user->sca_id) {
                try {
                    $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
                    $stripe->transfers->create([
                        'amount' => (int) round($availableWalletAmount * 100),
                        'currency' => 'usd',
                        'destination' => $user->sca_id,
                    ]);

                    $walletRows->update([
                        'withdraw_amount' => 1,
                    ]);

                    $payoutProcessed = true;
                } catch (\Exception $e) {
                    $payoutHeldInWallet = true;
                }
            } elseif ($availableWalletAmount > 50) {
                $payoutHeldInWallet = true;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                "status" => "failed",
                "message" => "Unable to deactivate account right now. Please try again."
            ]);
        }

        if ($user->token()) {
            $user->token()->revoke();
        }

        try {
            Mail::to($user->email)->send(new AccountDeactivatedEmail([
                'name' => $user->name,
                'availableWalletAmount' => $availableWalletAmount,
                'payoutProcessed' => $payoutProcessed,
                'payoutHeldInWallet' => $payoutHeldInWallet,
            ]));
        } catch (\Exception $e) {
        }

        $message = 'Account deactivated successfully.';

        if ($payoutProcessed) {
            $message .= ' Wallet amount has been transferred to your bank.';
        } elseif ($payoutHeldInWallet) {
            $message .= ' No bank account was found, so your wallet amount will remain in the deactivated account.';
        }

        return response()->json([
            'status' => $this->status_code,
            'message' => $message,
            'data' => [
                'walletAmount' => $availableWalletAmount,
                'payoutProcessed' => $payoutProcessed,
                'payoutHeldInWallet' => $payoutHeldInWallet,
            ],
        ]);
    }

    public function ResetEmail(Request $request)
    {

        if ($request->email != auth()->user()->email && $request->email != null && $request->email != '') {
            $validator =   Validator::make(
                $request->all(),
                [
                    "email" =>  "required|email|unique:users",
                ]
            );
            if ($validator->fails()) {
                return response()->json(["status" => "failed", 'success' => false, "validation_error" => $validator->errors()]);
            } else {
                ModelsResetEmail::where('email', auth()->user()->email)->where('new_email', $request->email)->delete();
                $token = Str::random(70);
                $Reset = new ModelsResetEmail();
                $Reset->email = auth()->user()->email;
                $Reset->new_email = $request->email;
                $Reset->token = Hash::make($token);
                $Reset->save();
                $data = ["email" => $Reset->email, "new_email" => $Reset->new_email, "token" => $token];
                Mail::to(auth()->user()->email)->send(new ResetEmail($data));
                return response()->json(['status' => $this->status_code, "message" => "Reset Email Link Send to Your Email", "data" => true]);
            }
        }
    }
    public function RestEmailConformation(Request $request)
    {

        if ($request->token && $request->email) {
            $email = ModelsResetEmail::where('email', $request->email)->orderByDesc('created_at')->first();
            if ($email) {
                $timeDiff = Carbon::now()->diffInMinutes(Carbon::parse($email->created_at));
                // return $email->created_at;
                if (!Hash::check($request->token, $email->token)) {
                    return  response()->json(["status" => "failed", "message" => "Reset Email Link Expire Try Again"]);
                } else {
                    $validator = User::where('email', $email->new_email)->count();
                    if ($validator > 0) {
                        return response()->json(["status" => "failed", 'success' => false, "message" => 'email already exist']);
                    } else {
                        if ($timeDiff <= 60) {
                            $user = User::where('email', $request->email)->update([
                                "email" => $email->new_email,
                                'email_verified_at' => Carbon::now(),
                                'email_verified_status' => "success",
                            ]);
                            if ($user) {
                                ModelsResetEmail::where('email', $request->email)->delete();
                            } else {
                                return  response()->json(["status" => "failed", "message" => "Something wrong "]);
                            }

                            return response()->json(['status' => $this->status_code, "message" => "Email Reset Successfully", "data" => $user]);
                        } else {

                            ModelsResetEmail::where('email', $request->email)->delete();
                            return  response()->json(["status" => "failed", "message" => "Reset Email Link Time Expire Try Again "]);
                        }
                    }
                }
            } else {
                return  response()->json(["status" => "failed", "message" => "Reset Email Link Expire Try Again "]);
            }
        } else {
            return  response()->json(["status" => "failed", "message" => "Reset Email Link Expire Try Again "]);
        }
    }
    public function ShareProfile(Request $request)
    {

        if ($request->currentUserId == auth()->user()->id) {
            $validator =   Validator::make(
                $request->all(),
                [
                    "email" =>  "required|email",
                ]
            );
            if ($validator->fails()) {
                return response()->json(["status" => "failed", 'success' => false, "validation_error" => $validator->errors()]);
            } else {
                if ($request->email == auth()->user()->email) {
                    return response()->json(["status" => "failed", 'success' => false, "message" => 'You can not send your own email']);
                } else {
                    $data = [
                        'url' => $request->profileUrl,
                        'name' => auth()->user()->name,
                    ];

                    Mail::to($request->email)->send(new ShareProfile($data));
                    return response()->json(['status' => $this->status_code, "message" => "Shared Successfully ", "data" => true]);
                }
            }
        } else {
            return response()->json(["status" => "failed", 'success' => false, "message" => 'you need to login first']);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showSlotDetailsWithEvents(Request $request)
    {
        if ($request->startDate != '') {
            $user = User::where('username', $request->profileId)->where('status', 'active')->select('id')->first();
            if (!$user) {
                return response()->json(["status" => "failed", "messages" => 'user does not exist']);
            }
            $eventActivity = Event::where('user_fk_id', $user->id)
                ->with(['EventTimeSlot' => function ($q) use ($request) {
                    $q->where('start_date_time', '>=', Carbon::now('UTC')->toDateTimeString())
                        ->with(['EventBooking', 'EventPayment'])
                        ->where('start_date', $request->startDate)
                        ->orderBy('start_date');
                }])
                ->whereHas('EventTimeSlot', function ($q) use ($request) {
                    $q->where('start_date_time', '>=', Carbon::now('UTC')->toDateTimeString())
                        ->where('start_date', $request->startDate);
                })
                ->get();
            $events = [];
            foreach ($eventActivity as $Activity) {
                if ($Activity->EventTimeSlot->count() > 0) {
                    $events[] = collect($Activity);
                }
            }
            if ($eventActivity) {
                return response()->json(['status' => $this->status_code, "message" => "Data Fetch...", "slotDetails" => $events]);
            }
            $user = User::where('username', $request->profileId)->where('status', 'active')->select('id')->first();
            if (!$user) {
                return response()->json(["status" => "failed", "messages" => 'user does not exist']);
            }
            $eventActivity=Event::where('user_fk_id',$user->id)->with(['EventTimeSlot'=>function($q)use($request){
                $q->where('start_date_time','>=',now()->timezone($request->tz)->toDateTimeString())->with(['EventBooking','EventPayment'])->orderBy('start_date');
            }])->whereHas('EventTimeSlot',function($q)use($request){
                $q->where('start_date_time','>=',now()->timezone($request->tz)->toDateTimeString());
            })->get(); 
            if ($eventActivity) {
                return response()->json(['status' => $this->status_code, "message" => "Data Fetch...", "slotDetails" => $eventActivity]);
            } else {
                return response()->json(["status" => "failed", "messages" => 'user does not exist']);
            }
        }
        

    }
    
    public function destroy($id)
    {
        //
    }

    public function showAllLanguages()
    {
        //
        $languages = LanguageMaster::all();
        return response()->json($languages);
    }
    public function showAllCountries()
    {
        $Countries = DB::table('countries')->get();
        return response()->json($Countries);
    }
    // show Profile Calenders events
    public function showEventsProfileCalenders(Request $request){
        event(new UserActivity($request->ip()));
        if (!$request->profileId) {
            return response()->json(["status" => "failed", "messages" => 'page not found']);
        }

        $user = User::where('username', $request->profileId)->where('status', 'active')->select('id')->first();
        if (!$user) {
            return response()->json(["status" => "failed", "messages" => 'user does not exist']);
        }

        try {
            // normalize incoming range to UTC dates
            $start = $request->activeStart ? Carbon::parse($request->activeStart)->setTimezone('UTC')->toDateString() : null;
            $end = $request->activeEnd ? Carbon::parse($request->activeEnd)->setTimezone('UTC')->toDateString() : null;

            $query = Event::join('event_time_slots', 'events.id', '=', 'event_time_slots.event_fk_id')
                ->where('events.user_fk_id', $user->id);

            if ($start && $end) {
                $query->whereBetween('event_time_slots.start_date', [$start, $end]);
            } elseif ($start) {
                $query->where('event_time_slots.start_date', '>=', $start);
            } elseif ($end) {
                $query->where('event_time_slots.start_date', '<=', $end);
            }

            $eventActivity = $query->select('event_time_slots.start_date')
                ->groupBy('event_time_slots.start_date')
                ->get();

            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Data Fetch Successfully ", 'data' => $eventActivity]);
        } catch (\Exception $e) {
            return response()->json(["status" => "failed", "messages" => 'Invalid date range or request']);
        }
    }
}
