<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/avnik-admin', 'Admin.Admin');
Route::group(['prefix' => 'admin', 'middleware' => ['auth:api']], function () {
  Route::post('/payment/release', 'Api\AdminControllers\Payments\PaymentController@store');
});
