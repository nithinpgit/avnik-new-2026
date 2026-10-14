<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->foreign('sender_id')->references('id')->on('users');
            $table->unsignedBigInteger('room_id');
            $table->foreign('room_id')->references('id')->on('chat_rooms');
            $table->longText('content')->nullable();
            $table->longText('file')->nullable();
            $table->string('file_type',10)->nullable();
            $table->string('file_size',100)->nullable();
            $table->string('file_name',255)->nullable();
            $table->boolean('is_file')->default(0);
            $table->timestamps();         
            $table->timestamp('deleted_at')->nullable();   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_messages');
    }
}
