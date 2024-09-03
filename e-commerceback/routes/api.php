<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usercontroller;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/regist",[usercontroller::class,'register']);
Route::post("/add",[usercontroller::class,'add']);
Route::post("/login",[usercontroller::class,'login']);
Route::get("/products",[usercontroller::class,'products']);
Route::post("/delete",[usercontroller::class,'delete']);
Route::post("/search",[usercontroller::class,'search']);
Route::get("/update/{id}",[usercontroller::class,'getupdate']);
Route::post("/update/{id}",[usercontroller::class,'putupdate']);




