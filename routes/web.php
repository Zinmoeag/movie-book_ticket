<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CinemaController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RoomController;

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

Route::get('/',[MovieController::class, 'show']);

Route::get('/schedule/{movie:slug}', [ScheduleController::class, 'schedule'])->name('schedule');

Route::get('/book/{movie:slug}', [MovieController::class, 'book'])->name("book.seats");

Route::post('/book/{schedule:slug}', [BookingController::class, 'book'])->name("book.post");

Route::get('book/confirmation/{booking}', [BookingController::class, "confirmation"])->name('book.confirm');


Route::prefix('chat')->group(function (){
    Route::get('/{user}',[ChatController::class, 'showUserChat'])->name('chat.user.show');
    Route::post('/admin/{sender}', [ChatController::class, 'userSend']);
});

Route::middleware('admin', 'auth')->group(function () {
    Route::get('/admin',[AdminController::class, 'index'])->name('admin');
    Route::get('/admin/movie', [MovieController::class, 'AdminIndex'])->name('admin.movie');
    Route::get('/admin/movie/edit/all', [MovieController::class, 'editAll'])->name('admin.movie.edit.all');
    Route::get('/admin/movie/edit/{movie:slug}', [MovieController::class, 'edit'])->name('admin.movie.edit');
    Route::post('/admin/movie/update/{movie:slug}',[MovieController::class, 'update'])->name('admin.movie.update');
    Route::get('/admin/movie/create', [MovieController::class, 'create'])->name('admin.home');
    Route::post('/admin/movie/create', [MovieController::class, 'store'])->name('admin.movie.create');
    Route::delete('/admin/movie/delete/{movie:slug}', [MovieController::class, 'destroy'])->name('admin.movie.delete');
    Route::get('/admin/schedule', [ScheduleController::class, 'adminIndex'])->name('admin.schedule');
    Route::get('/admin/schedule/create', [ScheduleController::class, 'create'])->name('admin.schedule.create');
    Route::post('/admin/schedule/create', [ScheduleController::class, 'store'])->name('admin.schedule.store');
    Route::get('/admin/schedule/{schedule:slug}', [ScheduleController:: class, "room"])->name('admin.schedule.room');
    Route::get('/admin/schedule/edit/{schedule:slug}', [ScheduleController:: class, "edit"])->name('admin.schedule.edit');
    Route::put('/admin/schedule/update/Date/{schedule:slug}', [ScheduleController:: class, "updateDate"])->name('admin.schedule.update.date');
    Route::put('/admin/schedule/update/movie/{schedule:slug}', [ScheduleController:: class, "updateMovie"])->name('admin.schedule.update.movie');
    Route::put('/admin/schedule/update/room/{schedule:slug}', [ScheduleController:: class, "updateSeat"])->name('admin.schedule.update.room');
    Route::get('/admin/cinema/new', [CinemaController::class, 'create'])->name('admin.cinema.create');
    Route::post('/admin/cinema/new', [CinemaController::class, 'store'])->name('admin.cinema.store');
    Route::get('/admin/room/new', [RoomController::class, 'create'])->name('admin.room.create');
    Route::post('/admin/room/new', [RoomController::class, 'store'])->name('admin.room.store');
    
    Route::get('/admin/booking',[BookingController::class, 'adminIndex'])->name('admin.booking');
    Route::delete('/admin/booking/delete/{booking}',[BookingController::class, 'destroy'])->name('admin.booking.destroy');
    Route::post('/admin/booking/approve/{booking}',[BookingController::class, 'approve'])->name('admin.booking.approve');
    
    Route::get('/admin/chat', [ChatController::class, 'chatUser'])->name('admin.chat');
    Route::get('/admin/chat/{user}', [ChatController::class, 'chatUser'])->name('admin.chat.user');
    Route::post('/admin/chat/{user}', [ChatController::class, 'adminSend']);
    
    Route::post('/buy/{schedule:slug}', [BookingController::class, 'buy'])->name("buy.post");
});


require __DIR__.'/auth.php';
