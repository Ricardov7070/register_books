<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\userManagementRequests\UserLoginRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Users\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    protected $modelUsers;


    public function __construct (User $modelUsers) {

        $this->modelUsers = $modelUsers;

    }


    public function userAuthentication(UserLoginRequest $request): JsonResponse {
        
        Log::info('🔵 Requisição recebida:', $request->all());

        try {

            $credentials = $request->only('email', 'password');

            $user = User::where('email', $credentials['email'])->whereNull('deleted_at')->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials!',
                ], 400);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => 'Login successful!',
                'id_user' => $user->id,
                'user' => $user->name,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);

        } catch (ValidationException $e) {
            
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors(),
            ], 400);

        } catch (\Throwable $th) {

            Log::error('🔴 Erro inesperado no login: ' . $th->getMessage(), ['exception' => $th]);

            return response()->json([
                'error' => 'An error occurred, try again!',
            ], 500);

        }

    }

}
