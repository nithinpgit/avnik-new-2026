<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserControllers\SupportTicketController;
use App\Http\Controllers\Api\AdminControllers\AdminSupportTicketController;

// User Support Routes
Route::middleware(['auth:api'])->group(function () {
    // User ticket routes
    Route::prefix('support/tickets')->group(function () {
        Route::post('/', [SupportTicketController::class, 'getTickets']);
        Route::post('/create', [SupportTicketController::class, 'createTicket']);
        Route::get('/{ticketId}', [SupportTicketController::class, 'getTicketDetails']);
        Route::post('/message/add', [SupportTicketController::class, 'addMessage']);
        Route::post('/close', [SupportTicketController::class, 'closeTicket']);
        Route::post('/reopen', [SupportTicketController::class, 'reopenTicket']);
        Route::get('/unread/count', [SupportTicketController::class, 'getUnreadCount']);
    });
});

// Admin Support Routes
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::prefix('admin/support/tickets')->group(function () {
        Route::post('/', [AdminSupportTicketController::class, 'getAllTickets']);
        Route::get('/{ticketId}', [AdminSupportTicketController::class, 'getTicketDetails']);
        Route::post('/response', [AdminSupportTicketController::class, 'addAdminResponse']);
        Route::post('/status/update', [AdminSupportTicketController::class, 'updateTicketStatus']);
        Route::post('/priority/update', [AdminSupportTicketController::class, 'updateTicketPriority']);
        Route::post('/assign', [AdminSupportTicketController::class, 'assignTicket']);
        Route::post('/close', [AdminSupportTicketController::class, 'closeTicket']);
        Route::get('/stats/overview', [AdminSupportTicketController::class, 'getTicketStats']);
    });
});
