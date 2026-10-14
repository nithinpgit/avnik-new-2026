<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserControllers\Share\UserSocailShareController;
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

Route::get('/share/event/{id}', [UserSocailShareController::class, 'eventShare'])->name('share.event');

Route::get('/share/profile/{id}', [UserSocailShareController::class, 'profileShare'])->name('share.profile');

Route::get('/storage/{path}', function (string $path) {
    $safePath = str_replace(['..', '\\'], ['', '/'], $path);
    $file = storage_path($safePath);

    if (!is_file($file)) {
        abort(404);
    }

    return response()->file($file);
})->where('path', '.*');

Route::get('/public/{path}', function (string $path) {
    $safePath = str_replace(['..', '\\'], ['', '/'], $path);
    $file = public_path($safePath);

    if (!is_file($file)) {
        abort(404);
    }

    return response()->file($file);
})->where('path', '.*');

Route::view('/{path?}', 'welcome')->where('path', '.*')->name('react');
