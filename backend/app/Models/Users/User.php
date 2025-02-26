<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; 

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'deleted_at'
    ];


    // public function createUser ($request): array {

    //     $user = self::create([
    //         'email' => $request->input('email'),
    //         'name' => $request->input('name'),
    //         'password' => Hash::make($request->input('password')),
    //     ]);
    
    //     return [
    //         'id_user' => $user->id,
    //         'name' => $user->name,
    //         'email' => $user->email,
    //         'created_at' => $user->created_at->format('d/m/Y'),
    //     ];

    // }

}
