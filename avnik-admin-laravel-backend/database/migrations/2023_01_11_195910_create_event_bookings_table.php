<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->unsignedBigInteger('event_slot_id');
            $table->foreign('event_slot_id')->references('id')->on('event_time_slots');
            $table->unsignedBigInteger('p_user_id');
            $table->foreign('p_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('h_user_id');
            $table->foreign('h_user_id')->references('id')->on('users');
            $table->string('meeting_room_id')->nullable();
            $table->string('meeting_room_server_id')->nullable();
            $table->string('meeting_room_start_time')->nullable();
            $table->string('meeting_room_end_time')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('start_date_time')->nullable();
            $table->string('end_date_time')->nullable();
            $table->integer('booked_seats')->default(0);
            $table->string('duration')->default(0);
            $table->integer('total_seats')->default(1);
            $table->integer('cost')->default(0);
            $table->enum('cost_type',['free','paid'])->default('free');
            $table->string('status')->default('enabled');
            $table->enum('delete_status',['0','1'])->default('1');
            $table->string('host_status')->nullable();
            $table->integer('current_duration')->nullable();
            $table->string('current_status',255)->nullable();
            $table->text('event_data')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_bookings');
    }
}
