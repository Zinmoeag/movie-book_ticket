<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


///admin  --> middleware('admin')
Route::get('/admin/movie', [MovieController::class, 'AdminIndex'])->name('admin.movie');
Route::get('/admin/movie/edit/all', [MovieController::class, 'editAll'])->name('admin.movie.edit.all');
Route::get('/admin/movie/edit/{movie:slug}', [MovieController::class, 'edit'])->name('admin.movie.edit');
Route::post('/admin/movie/update/{movie:slug}',[MovieController::class, 'update'])->name('admin.movie.update');
Route::get('/admin/movie/create', [AdminController::class, 'index'])->name('admin.home');
Route::post('/admin/movie/create', [MovieController::class, 'store'])->name('admin.movie.create');
Route::delete('/admin/movie/delete/{movie:slug}', [MovieController::class, 'destroy'])->name('admin.movie.delete');
Route::get('/admin/schedule', [ScheduleController::class, 'adminIndex'])->name('admin.schedule');
Route::get('/admin/schedule/create', [ScheduleController::class, 'create'])->name('admin.schedule.create');
Route::post('/admin/schedule/create', [ScheduleController::class, 'store'])->name('admin.schedule.store');
Route::get('/admin/schedule/{schedule:slug}', [ScheduleController:: class, "room"])->name('admin.schedule.room');
Route::get('/admin/schedule/edit/{schedule:slug}', [ScheduleController:: class, "edit"])->name('admin.schedule.edit');
Route::put('/admin/schedule/update/Date/{schedule:slug}', [ScheduleController:: class, "updateDate"])->name('admin.schedule.update.date');
Route::put('/admin/schedule/update/movie/{schedule:slug}', [ScheduleController:: class, "updateMovie"])->name('admin.schedule.update.movie');

Route::post('/buy/{schedule:slug}', [BookingController::class, 'buy'])->name("buy.post");

require __DIR__.'/auth.php';
