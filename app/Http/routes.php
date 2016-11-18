<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
//*******************************PAGINA DE BIENVENIDA********************************//
////Direccionamiento a la pagina de bienvenida
Route::get('Home', [
    'middleware' => 'auth',
    'uses' => 'Home\HomeController@index'
]);

