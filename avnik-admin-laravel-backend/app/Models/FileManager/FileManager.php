<?php

namespace App\Models\FileManager;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileManager extends Model
{
    use SoftDeletes;
    //
    public function EventFile()
    {
        return $this->hasOne(EventFile::class,'id','file_manager_id');
    }
    
}
