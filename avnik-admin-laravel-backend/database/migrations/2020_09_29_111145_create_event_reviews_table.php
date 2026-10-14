<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('slot_id');
            $table->foreign('slot_id')->references('id')->on('event_time_slots');
            $table->unsignedBigInteger('receiver_id')->default(0);
            $table->unsignedBigInteger('host_id')->default(0);
            $table->unsignedBigInteger('comment_id')->default(0);
            $table->longText('comment_to_host')->nullable();
            $table->longText('comment_to_user')->nullable();
            $table->float('rating')->default(0);
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
        Schema::dropIfExists('event_reviews');
    }
}
