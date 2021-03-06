<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserController extends Controller
{
    //Get all Users in database
    public function getAllUsers() {
        return User::all();
    }

    //Get user by id
    public function getUserById($id) {
        return User::find($id);
    }

    //Create a user in dadabase
    public function createUser(Request $request) {
        return User::create($request->all());
    }

    //Update a user in database
    public function updateUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    //Delete a user in database
    public function deleteUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->delete();
        return 204;
    }
}
