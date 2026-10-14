<?php

use App\Events\Chats\SendMessage;
use App\Http\Controllers\HomeController;
use App\Http\Resources\AuthUser\AuthUser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Authentication Routes
Broadcast::routes(['middleware' => ['auth:api']]);

Route::post('forgot-password/reset', "Api\UserDashboardController@forgotPassword")->name('Forgot.Password');
Route::post('rest-password/reset', "Api\Auth\ResetPasswordController@reset")->name('Reset.Password');
Route::post("register", "Api\UserDashboardController@userSignUp");
Route::post("skip-step", "Api\UserDashboardController@skipStepComplete")->middleware('auth:api');
Route::post("email-conformation", "Api\UserDashboardController@emailConformation");
Route::post("validUsername", "Api\UserDashboardController@validUsername")->middleware('auth:api');
Route::get('/user', 'Api\UserDashboardController@AuthUserService')->middleware('auth:api');
Route::post("/login", "Api\UserDashboardController@userLogin")->name('login');
Route::post('/validation', "Api\UserDashboardController@validate");

// events routs
Route::prefix('socialLinked')->group(function () {
  Route::post('/', 'Api\UserControllers\SocialMedia\SocialMediaController@SocialMedia');
  Route::put('/{userId?}', 'Api\UserControllers\SocialMedia\SocialMediaController@linkedSocialAccount')->middleware('auth:api');
});
Route::group(['prefix' => 'events'], function () {

  // working
  Route::post('/', 'Api\UserControllers\Events\UserEventsController@Create')->middleware('auth:api');
  Route::post('/addSlot', 'Api\UserControllers\Events\UserEventsController@AddSlots')->middleware('auth:api');
  Route::post('/update', 'Api\UserControllers\Events\UserEventsController@UpdateEvent')->middleware('auth:api');
  Route::post('/delete', 'Api\UserControllers\Events\UserEventsController@DeleteEventByFollowing')->middleware('auth:api');
  Route::post('/disable', 'Api\UserControllers\Events\UserEventsController@DisableSlotEvent')->middleware('auth:api');
  Route::post('/cancel', 'Api\UserControllers\Events\UserEventsController@CancelEventByFollowing')->middleware('auth:api');
  Route::post('/all', 'Api\UserControllers\Events\UserEventsController@allPublicEvents');
  Route::post('/edit', 'Api\UserControllers\Events\UserEventsController@getEditEvents')->middleware('auth:api');
  Route::get('/{id?}/{token?}', 'Api\UserControllers\Events\UserEventsController@eventById');
  Route::post('/auth/user/my/events', 'Api\UserControllers\Events\UserEventsController@loginUserEvents')->middleware('auth:api');
  Route::post('/my-events', 'Api\UserControllers\Events\UserEventsController@loginUserMyEvents')->middleware('auth:api');
  Route::post('/detailsSlots', 'Api\UserControllers\Events\UserEventsController@detailsSlots');
  Route::post('/upComingSlots', 'Api\UserControllers\Events\UserEventsController@eventTimeSlot');
  Route::post('/MyUpComingEvents', 'Api\UserControllers\Events\UserEventsController@MyUpComingEvents')->middleware('auth:api');  
  Route::post('/TimeConflictsChecks', 'Api\UserControllers\Events\UserEventsController@TimeConflictsChecks')->middleware('auth:api');  
  Route::post('/EditEventTimeConflictsChecks', 'Api\UserControllers\Events\UserEventsController@EditEventTimeConflictsChecks')->middleware('auth:api');  
  Route::post('/BookingTimeConflictsChecks', 'Api\UserControllers\Events\UserEventsController@BookingTimeConflictsChecks')->middleware('auth:api');  
  // none Working 
  // Route::get('/my-events', 'Api\UserControllers\Events\UserEventsController@myEventsIndex')->name('MyEventsIndex')->middleware('auth:api');
  // Route::PUT('/update/{id}', 'Api\UserControllers\Events\UserEventsController@update')->name('Events.Update')->middleware('auth:api');
  // Route::post('/delete', 'Api\UserControllers\Events\UserEventsController@destroy')->name('Events.Delete')->middleware('auth:api');
  // Route::post('/download/', 'Api\UserControllers\Events\UserEventsController@EventFileDownload')->name('Events.FileDownload')->middleware('auth:api');

});
// handel Event Delete & Edit 
Route::group(['prefix' => 'eventHandling'], function () {
  Route::post('/eventDelete', 'Api\UserControllers\Events\UserEventsController@HandelEvent')->middleware('auth:api');
  Route::post('/eventSlotDelete', 'Api\UserControllers\Events\UserEventsController@HandelSlotDelete')->middleware('auth:api');
});
// bookings
Route::group(['prefix' => 'booking'], function () {
  Route::post('/', 'Api\UserControllers\Events\EventBookingController@MyBookings')->middleware('auth:api');
  Route::post('/cancel', 'Api\UserControllers\Events\EventBookingController@CancelBookings')->middleware('auth:api');
  Route::post('/remove', 'Api\UserControllers\Events\EventBookingController@removeBookings')->middleware('auth:api');
});
// 
Route::resource('/myEvents', 'Api\UserControllers\Events\EventsDetailsController')->middleware('auth:api');

//Events Review Controller
Route::group(['prefix' => 'reviews', 'middleware' => ['auth:api']], function () {
  Route::post('/', 'Api\UserControllers\Events\EventsReviewsController@store');
  Route::post('/add', 'Api\UserControllers\Events\EventsReviewsController@giveReviews');
  Route::match(['put', 'patch'], '/', 'Api\UserControllers\Events\EventsReviewsController@update');
  Route::post('/edit', 'Api\UserControllers\Events\EventsReviewsController@edit');
});
Route::post('/reviews/profile', 'Api\UserControllers\Events\EventsReviewsController@showOnProfile');
Route::post('/reviews/event', 'Api\UserControllers\Events\EventsReviewsController@showOnEvents');


// End Reviews 
//Events Banks Controller
Route::group(['prefix' => 'banks', 'middleware' => ['auth:api']], function () {
  Route::post('/list', 'Api\UserControllers\Payments\PaymentBankController@index');
  Route::post('/add', 'Api\UserControllers\Payments\PaymentBankController@store');
  Route::post('/update', 'Api\UserControllers\Payments\PaymentBankController@update');
  Route::delete('/{id}', 'Api\UserControllers\Payments\PaymentBankController@destroy');
  Route::post('/payouts', 'Api\UserControllers\Payments\PaymentBankController@initiatePayout');
  Route::match(['put', 'patch'], '/', 'Api\UserControllers\Payments\PaymentBankController@update');
  Route::post('/verified', 'Api\UserControllers\Payments\PaymentBankController@verified');
});
// End banks controller
//Events cards Controller
Route::group(['prefix' => 'cards', 'middleware' => ['auth:api']], function () {
  Route::post('/', 'Api\UserControllers\Payments\PaymentCardController@index');
  Route::post('/add', 'Api\UserControllers\Payments\PaymentCardController@store');
  Route::match(['put', 'patch'], '/', 'Api\UserControllers\Payments\PaymentCardController@update');
  Route::delete('/{id}', 'Api\UserControllers\Payments\PaymentCardController@destroy');
  
});
// End cards controller
//Joining Request Controller
Route::group(['middleware' => ['auth:api']], function () {
  Route::resource('/joiningRequest', 'Api\UserControllers\Events\JoinRequestController')->middleware('auth:api');
});
// UserPayments controller
Route::group(['middleware' => ['auth:api']], function () {
  Route::resource('/userPayments', 'Api\UserControllers\UserPayments\UserPaymentController');
  Route::post('/userPayments/refund', 'Api\UserControllers\UserPayments\UserPaymentController@create');
});
// Report Controller
Route::group(['middleware' => ['auth:api']], function () {
  Route::resource('/reports', 'Api\UserControllers\Report\ReportController');
});
Route::group(['prefix' => 'favorite'], function () {
  Route::post('/', 'Api\UserControllers\Events\FavoriteController@Favorite')->middleware('auth:api');
  Route::post('/list', 'Api\UserControllers\Events\FavoriteController@index')->middleware('auth:api');
});

Route::group(['prefix' => 'profile'], function () {

  Route::post('/username', 'Api\UserControllers\UserProfile\UserProfileController@index');
  Route::put('/update/{id}', 'Api\UserControllers\UserProfile\UserProfileController@update')->middleware('auth:api');
  Route::post('/', 'Api\UserControllers\UserProfile\UserProfileController@store')->middleware('auth:api');
  Route::post('/share', 'Api\UserControllers\UserProfile\UserProfileController@ShareProfile')->middleware('auth:api');
  Route::post('/resetEmail', 'Api\UserControllers\UserProfile\UserProfileController@ResetEmail')->middleware('auth:api');
  Route::post('/email/conformation', 'Api\UserControllers\UserProfile\UserProfileController@RestEmailConformation');
  Route::post('/favorite/', 'Api\UserControllers\UserProfile\UserProfileController@FavoriteUser')->middleware('auth:api');
  Route::post('/slotDetails', 'Api\UserControllers\UserProfile\UserProfileController@showSlotDetailsWithEvents');
  Route::post('/upcomingEventsSlot','Api\UserControllers\UserProfile\UserProfileController@showUpcomingEventsSlot');
  Route::post('/showEventsProfileCalenders','Api\UserControllers\UserProfile\UserProfileController@showEventsProfileCalenders')->middleware('auth:api', 'throttle:200,1');

});
// Language Master
Route::group(['prefix' => 'languages'], function () {
  Route::get('/', 'Api\UserControllers\UserProfile\UserProfileController@showAllLanguages')->middleware('auth:api');
});
// Countries Master
Route::group(['prefix' => 'countries'], function () {
  Route::get('/', 'Api\UserControllers\UserProfile\UserProfileController@showAllCountries')->middleware('auth:api');
});
// Skills Master
Route::group(['prefix' => 'skills'], function () {
  Route::get('/', 'Api\UserControllers\UserProfile\UserProfileController@showAllSkills')->middleware('auth:api');
});


Route::post('/saveRecordings', 'Api\UserControllers\FileManager\FileManagerController@saveRecordings');
Route::group(['prefix' => 'fileManager'], function () {
  Route::post('/', 'Api\UserControllers\FileManager\FileManagerController@multipleFileStore')->middleware('auth:api');
  Route::post('/list', 'Api\UserControllers\FileManager\FileManagerController@showAuthUserFiles')->middleware('auth:api');
  Route::post('/deleteSingleFile', 'Api\UserControllers\FileManager\FileManagerController@DeleteSingleFile')->middleware('auth:api');
  Route::post('/deleteMultipleFile', 'Api\UserControllers\FileManager\FileManagerController@DeleteMultipleFile')->middleware('auth:api');
  Route::post('/createFolder', 'Api\UserControllers\FileManager\FileManagerController@createFolder')->middleware('auth:api');
  Route::post('/download', 'Api\UserControllers\FileManager\FileManagerController@DownloadFile')->middleware('auth:api');
  Route::post('/rename', 'Api\UserControllers\FileManager\FileManagerController@RenameFile')->middleware('auth:api');
  Route::post('/move', 'Api\UserControllers\FileManager\FileManagerController@MoveFile')->middleware('auth:api');
  Route::post('/fileFilter', 'Api\UserControllers\FileManager\FileManagerController@FileFilter')->middleware('auth:api');
});

Route::group(['prefix' => 'meetingRoom'], function () {
  Route::post('/', 'Api\UserControllers\MeetingRoom\MeetingRoomController@create')->middleware('auth:api');
  Route::post('/quickMeet', 'Api\UserControllers\MeetingRoom\MeetingRoomController@quickMeet')->middleware('auth:api');
  Route::match(['put', 'patch'], '/block', 'Api\UserControllers\MeetingRoom\MeetingRoomController@blockUser')->middleware('auth:api');
  Route::match(['put', 'patch'], '/extend', 'Api\UserControllers\MeetingRoom\MeetingRoomController@extendDuration')->middleware('auth:api');
  Route::match(['put', 'patch'], '/', 'Api\UserControllers\MeetingRoom\MeetingRoomController@update')->middleware('auth:api');
});

Route::group(['prefix' => 'payments'], function () {
  Route::get('/', 'Api\UserControllers\Payments\StripePaymentController@index')->middleware('auth:api');
  Route::post('/', 'Api\UserControllers\Payments\StripePaymentController@store')->middleware('auth:api');
  Route::post('/eventFile', 'Api\UserControllers\Payments\StripePaymentController@EventFilePaymentStore')->middleware('auth:api');
  Route::delete('/', 'Api\UserControllers\Payments\StripePaymentController@destroy')->middleware('auth:api');
  Route::match(['put', 'patch'], '/', 'Api\UserControllers\Payments\StripePaymentController@update')->middleware('auth:api');
  //make invoice routes here
  Route::get('/invoice/{id}', 'Api\UserControllers\UserPayments\UserPaymentController@invoice')->middleware('auth:api');
});
Route::group(['prefix' => 'contacts', 'middleware' => ['auth:api']], function () {
  Route::post('/', 'Api\UserControllers\UserContacts\UserContactsController@getContactList');
});

Route::group(['prefix' => 'notifications', 'middleware' => ['auth:api']], function () {
  Route::get('/', 'Api\UserControllers\Notifications\UserNotificationController@index');
  Route::get('/unread', 'Api\UserControllers\Notifications\UserNotificationController@unreadNotifications');
  Route::put('/{id}/read', 'Api\UserControllers\Notifications\UserNotificationController@markAsRead');
});

//  Chat controllers
Route::group(['prefix' => 'messages', 'middleware' => ['auth:api']], function () {
  Route::post('/', 'Api\UserControllers\Chats\UserChatsController@getConversations');
  Route::post('/initiate', 'Api\UserControllers\Chats\UserChatsController@initiateChat');
  Route::post('/createRoom', 'Api\UserControllers\Chats\UserChatsController@CreateRoom');
  Route::post('/UpdateRoom', 'Api\UserControllers\Chats\UserChatsController@UpdateRoom');
  Route::post('/createEventRoom', 'Api\UserControllers\Chats\UserChatsController@CreateEventRoom');
  Route::post('/addToRoom', 'Api\UserControllers\Chats\UserChatsController@addUserRoom');
  Route::post('/removeUserFromRoom', 'Api\UserControllers\Chats\UserChatsController@removeUserFromRoom');
  Route::post('/deleteRoom', 'Api\UserControllers\Chats\UserChatsController@deleteRoom');
  Route::post('/enterRoom', 'Api\UserControllers\Chats\UserChatsController@EnterInRoom');
  Route::post('/myGroups', 'Api\UserControllers\Chats\UserChatsController@fetchMyGroups');
  Route::post('/viewGroupPeoples', 'Api\UserControllers\Chats\UserChatsController@viewGroupPeoples');
  Route::post('/sendMessage', 'Api\UserControllers\Chats\UserChatsController@sendMessage');
  Route::post('/moveUserRoom', 'Api\UserControllers\Chats\UserChatsController@moveUserRoom');
  Route::post('/broadcastingToggle', 'Api\UserControllers\Chats\UserChatsController@BroadcastingToggle');
  Route::post('/searchMyContacts', 'Api\UserControllers\Chats\UserChatsController@searchMyContacts');
});
// categories list controller

Route::group(['prefix'=>'categories','middleware' => ['auth:api']],function(){
  Route::get('/', 'Api\UserControllers\Events\EventsCategoriesController@showParentCategories');
  Route::post('/', 'Api\UserControllers\Events\EventsCategoriesController@showChildCategories');

});
