<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Rotas que não nescessitam de autenticação
Route::post('/auth/signin', [UserController::class, 'userAuthentication']);
Route::post('/auth/signup', [UserController::class, 'registerUsers']);
Route::post('/auth/forgotPassword', [UserController::class, 'forgotPassword']);


// Rotas que nescessitam de autenticação
Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rotas "Usuários"
    Route::put('/updateUser/{id_user}', [UserController::class, 'updateRecord']);
    Route::post('/logoutUser', [UserController::class, 'logoutUser']);
    Route::delete('/deleteUser', [UserController::class, 'deleteRecord']);

    // Rotas "Livros"
    Route::post('/registerBooks', [BooksController::class, 'registerBooks']);
    Route::put('/updateBook/{id_book}', [BooksController::class, 'updateRecord']);
    Route::get('/viewBook', [BooksController::class, 'viewRecord']);
    Route::delete('/deleteBook/{id_book}', [BooksController::class, 'deleteRecord']);

});