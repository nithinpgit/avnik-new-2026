<?php

namespace App\Http\Resources\AuthUser;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AuthUser extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    
     public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'email'=>$this->email,
        ];
    }
}
