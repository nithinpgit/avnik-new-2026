<?php

namespace App\Http\Controllers\Api\UserControllers\UserContacts;

use App\Http\Controllers\Controller;
use App\Models\UserContacts\UserContact;
use App\User;
use Illuminate\Http\Request;

class UserContactsController extends Controller
{
    //

    public function getContactList(Request $request)
    {
        $user = auth()->user();
        $query = $request->input('query');
        if ($user) {
            $contactList = UserContact::where('user_id', $user->id)
            ->whereHas('ContactId', function($q) use ($query) {
                if ($query && (strlen($query) > 2 || strlen($query) == 0)) {
                $q->where('name', 'LIKE', '%' . $query . '%');
                }
            })
            ->with([
                'ContactId' => function($q) {
                $q->select('id', 'name', 'username');
                $q->with(['UserProfile' => function ($q) {
                    $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url', 'country');
                }]);
                }
            ])
            ->orderBy('id', 'desc')
            ->paginate(20);
            return response()->json(["status" => 200, "success" => true, "message" => 'Contact list', 'data' =>  $contactList]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => 'Please select the user']);
        }
    }
}
