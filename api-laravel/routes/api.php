<?php
date_default_timezone_set('America/Bogota');

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//CONTROLADORES CONFIGURACION
use App\Http\Controllers\configuracion\ModuloController;
use App\Http\Controllers\configuracion\PerfilController;
use App\Http\Controllers\configuracion\PermisoController;
use App\Http\Controllers\configuracion\UsuarioController;

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

//Endpoints para usuarios
Route::get('/usuarios',[UsuarioController::class, 'index']);
Route::get('/usuarios/despachador/{tienda}',[UsuarioController::class, 'mostrarDespachadorTienda']);
Route::get('/usuarios/despachador',[UsuarioController::class, 'mostrarDespachador']);
Route::get('/usuarios/transportador/usuario/{idUsuario}',[UsuarioController::class, 'showTransportador']); //Revisar por parte de Gabriel
Route::get('/usuarios/transportador/{tienda}',[UsuarioController::class, 'mostrarTransportadorTienda']);
Route::get('/usuarios/transportador',[UsuarioController::class, 'mostrarTransportador']);
Route::get('/usuarios/{idUsuario}',[UsuarioController::class, 'show']);
Route::post('/usuarios/confirmacion',[UsuarioController::class, 'confirmarUsuario']);
Route::post('/usuarios/contrasena/{idUsuario}',[UsuarioController::class, 'actualizarContrasena']);
Route::post('/usuarios',[UsuarioController::class, 'create']);
Route::put('/usuarios/{idUsuario}',[UsuarioController::class, 'update']);
Route::delete('/usuarios',[UsuarioController::class, 'delete']);

//Endpoints para perfiles
Route::get('/perfiles',[PerfilController::class, 'index']);
Route::get('/perfiles/{idPerfil}',[PerfilController::class, 'show']);
Route::post('/perfiles',[PerfilController::class, 'create']);
Route::put('/perfiles/{idPerfil}',[PerfilController::class, 'update']);
Route::delete('/perfiles',[PerfilController::class, 'delete']);


//Endpoints para modulos
Route::get('/modulos',[ModuloController::class, 'get']);
Route::get('/modulos/menu/{idPerfil}',[ModuloController::class, 'getMenu']);
Route::get('/modulos/{idModulo}',[ModuloController::class, 'getModulos']);
Route::post('/modulos',[ModuloController::class, 'create']);
Route::put('/modulos/{idModulo}',[ModuloController::class, 'update']);
Route::delete('/modulos',[ModuloController::class, 'delete']);

//Endpoints para permisos
Route::get('/permisos/{idPerfil}',[PermisoController::class, 'consultarPermisos']);
Route::get('/permisos/getpermisos/{idModulo}/{idPerfil}',[PermisoController::class, 'getPermisos']);
Route::get('/permisos/{idModulo}/{idPerfil}',[PermisoController::class, 'get']);
Route::post('/permisos',[PermisoController::class, 'create']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});