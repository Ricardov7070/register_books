<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes; 

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password'
    ];


    // Realiza a criação do usuário
    public function createUser ($request): array {

        $user = self::create([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
        ]);
    
        return [
            'id_user' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at->format('d/m/Y'),
        ];

    }


    // Realiza a atualização cadastral do usuário selecionado
    public function updateUser ($request, $id_user): array {

        $user = self::findOrFail($id_user);

        $user->update([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
        ]);

        return [
            'id_user' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'updated_at' => $user->updated_at->format('d/m/Y'),
        ];

    }


    // Realiza a exclusão do usuário selecionado
    public function deleteUser ($id_user): array {

        $user = self::findOrFail($id_user);

        $userData = [
            'id_user' => $user->id,
            'name' => $user->name,
        ];

        $user->delete();

        return $userData;

    }


    // Realiza a validação de existência do usuário
    public function userValidation ($request): array {
 
        return self::where('name', $request->input('name'))
            ->where('email', $request->input('email'))
            ->whereNull('deleted_at')
            ->get()
            ->toArray();

    }


    // Realiza a validação de existência dos endereçõs de email cadastrados dos usuários 
    public function userEmailValidation ($request): array {
        
        return self::where('email', $request->input('email'))
            ->whereNull('deleted_at')
            ->get()
            ->toArray();

    }


    // Realiza a geração da senha temporária de acesso do usuário
    public function randomUserPassword ($existingUser): string {

        $temporaryPassword = Str::random(8);

        $user = self::findOrFail($existingUser[0]['id']);

        $user->update([
            'password' => Hash::make($temporaryPassword),
        ]);

        return $temporaryPassword;

    }


    // Realiza a verificação de existência do usuário selecionado no banco de dados
    public function searchUser ($id_user): ?User {
         
        return self::where('id', $id_user)
            ->whereNull('deleted_at')
            ->first();

    }

}
