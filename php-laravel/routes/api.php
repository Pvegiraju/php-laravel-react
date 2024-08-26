<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/', function () {
    return 'APU';
});

Route::get('test-mongo', function (Request $request) {
    $connection = DB::connection('mongodb');
    $msg = 'Connection successful!';
    try {
        $connection->command(['ping' => 1]);
    } catch (\Exception $e) {
        $msg = 'Connection failed!' . $e->getMessage();
    }
    return $msg;
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [AuthController::class, 'delete'])->middleware('auth:sanctum');

Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');
