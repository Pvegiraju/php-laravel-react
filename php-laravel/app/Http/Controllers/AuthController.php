<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        Log::info('AuthController: ' . implode(', ', $fields) .'');
        $user = User::where('email', $request->email)->first();
        if ($user) {
            return response()->json(['errors' => ['message' => 'User already exists with email: ' . $request->email]], 400);
        }

        $user = User::create($fields);
        Log::info('$request->name: ' . $request->name);
        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken,
        ];
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'errors' => [
                    'email' => ['The provided credentials are incorrect.']
                ]
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    } 
    
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.' 
        ];
    }

    public function delete(string $id)
    {
        Log::info('Delete-id: ' . $id);
        $user = User::findOrFail($id);
        if ($user) {
            $user->delete();
            return ['message' => 'The user was deleted'];
        }

        return ['message' => 'The user not found'];
    }

}
