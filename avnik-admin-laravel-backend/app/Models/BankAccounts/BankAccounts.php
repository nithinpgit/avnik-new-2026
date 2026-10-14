<?php

namespace App\Models\BankAccounts;

use Illuminate\Database\Eloquent\Model;

class BankAccounts extends Model
{
    //
    protected $fillable=['user_fk_id','account_number','account_holder_name','ifsc_code','bank_name','account_status','account_verified_status'];
}
