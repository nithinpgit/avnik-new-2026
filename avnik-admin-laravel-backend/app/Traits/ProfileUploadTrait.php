<?php

namespace App\Traits;

use DB;
use File;
use App\User;
use App\Models\UserProfile\UserProfile;
use Carbon\Carbon;

trait ProfileUploadTrait
{

    private function UploadProfile($file, $folder)
    {
        $destinationPath = '/storage/app/'.$folder;

        $file_name = time().'-'.$file->getClientOriginalName();
        $file->move($destinationPath, $file_name); 

        return $file_name;
    }

}
