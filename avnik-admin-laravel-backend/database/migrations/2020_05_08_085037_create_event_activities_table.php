<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->string('event_status')->nullable();
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
        Schema::dropIfExists('event_activities');
    }
}
