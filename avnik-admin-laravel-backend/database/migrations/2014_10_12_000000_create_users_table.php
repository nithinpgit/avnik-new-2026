<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('stripe_customer_id')->nullable();
            $table->string('sca_id')->nullable();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('phone_verified_status')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('email_verified_status')->nullable();
            $table->string('social_user_id')->nullable();
            $table->string('social_nickname')->nullable();
            $table->string('social_avatar')->nullable();
            $table->string('social_avatar_original')->nullable();
            $table->string('social_profile_url')->nullable();
            $table->string('social_refreshToken')->nullable();
            $table->string('social_expiresIn')->nullable();
            $table->text('social_token')->nullable();
            $table->string('social_provider')->nullable();
            $table->string('status')->default('active');
            $table->boolean('account_status')->default(0);
            $table->string('joined_on');
            $table->string('password')->nullable();
            $table->string('role')->default('user');
            $table->string('last_ip')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->dateTime('date_of_created')->nullable();
            $table->dateTime('last_activity')->nullable();
            $table->dateTime('last_active')->nullable();
            $table->string('last_active_room')->nullable();
            $table->enum('read_notification',['0','1'])->default('0');
            $table->dateTime('last_password_change')->nullable();
            $table->enum('skip_steps',['0','1'])->default('0');
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
        Schema::dropIfExists('users');
    }
}
