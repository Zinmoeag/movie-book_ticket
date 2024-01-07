<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/ii', function () {
    $token = bin2hex(random_bytes(16));

    Session::put('chat_token', $token);

    return response()->json([
        'chat_token' => $token
    ]);
});

Route::post('/chat/admin', function () {
    return response()->json([
        'stes' => request()->all()
    ]);
});
