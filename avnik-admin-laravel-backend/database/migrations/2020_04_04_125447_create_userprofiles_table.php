<?php
/**
* Create Migration
* @author    Subham Singh Rawat <rwtshubhu5569@gmail.com>
* @author    Deepak Kumar <deepak@dktechoworlds.com>
* @copyright 2020 DkTechworlds Websolution (https://dktechworlds.com)
*/
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserprofilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->text('about_me')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('language')->nullable();
            $table->string('skill')->nullable();
            $table->string('profession')->nullable();
            $table->text('address')->nullable();
            $table->text('alt_address')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->text('social_media_urls')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('social_profile_picture_url')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('userprofiles');
    }
}
