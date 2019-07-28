<?php

use Illuminate\Http\Request;

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

Route::group(['prefix'=>'v1','namespace' => 'api\v1'], function () {
    // Public routes

    Route::post('user/create', 'UserController@store');

    Route::get('login','AuthController@login');
    Route::get('refresh_token','AuthController@refresh_token');




    Route::group(['middleware'=>'auth:api'],function (){
        //Login required routes
        Route::get('orders','OrderController@index');
        Route::group(['middleware'=>'onlyActiveUser'],function () {
            // These routes can be accessed only by actived users

        });
    });
});

