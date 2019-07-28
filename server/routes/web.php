<?php

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

//Route::get('/', function () {
//    return 'Hey darling!!';
//},['as'=>'home']);

Route::get('/home',['as' => '/', 'uses' =>  function () {
    return 'Hey darling!!';
}]);

Route::get('/',['as' => 'notAuthenticated', 'uses' =>  function () {
    return ['error_message'=>'you are not authenticated'];
}]);