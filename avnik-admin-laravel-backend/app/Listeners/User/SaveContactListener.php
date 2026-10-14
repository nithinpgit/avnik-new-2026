<?php

namespace App\Listeners\User;

use App\Models\UserContacts\UserContact;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Str;

class SaveContactListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($userId)
    {
        //
        if(auth()->check()){
           $findContact= UserContact::where('user_id',auth()->user()->id)->where('contact_id',$userId)->count();
           $findMy= UserContact::where('contact_id',auth()->user()->id)->count();
            if($findContact==0){
                $contact= new UserContact();
                $contact->user_id=auth()->user()->id;
                $contact->contact_id=$userId;
                $contact->remember_token=Str::random(70);
                $contact->save();
            }
            if($findMy==0){
                $contact= new UserContact();
                $contact->user_id=auth()->user()->id;
                $contact->contact_id=$userId;
                $contact->remember_token=Str::random(70);
                $contact->save();
            }
            
        }  
    }
}
