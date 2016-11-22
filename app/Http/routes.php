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
Route::get('/', 'placetopay\payment@index');
//Verificar Datos del cliente
Route::post('valClient', 'placetopay\payment@getClient');
//Consultar estados de las transacciones
Route::get('ConsultPay', function () {
    return view('Home.ConsultTransaction');
});
Route::post('SearchTransaction', 'placetopay\payment@SearchTransaction');
//Ruta para registrar la persona que realiza la transaccion y empezar con el proceso de pago
Route::post('RegisterTransaction', 'placetopay\payment@RegisterTransaction');
//Ruta para crear la transaccion
Route::post('createTransacction', 'placetopay\payment@createTransacction');
//Ruta para Verificar el estado de la transaccion
Route::get('VerifyTransaction/{reference}', 'placetopay\payment@VerifyTransaction');


