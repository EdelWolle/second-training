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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('profiledata','SessionController@getProfilData');

Route::post('updatesession','SessionController@updatesession');

Route::post('thumbs','SessionController@thumbs');

Route::post('getworkers','SearchController@getWorkers');

Route::group(['middleware' => ['web']], function () {
	Route::get('session','SessionController@getSession');
});
