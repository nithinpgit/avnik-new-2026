<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->text('event_files')->nullable();
            $table->string('event_title')->nullable();
            $table->string('event_type')->nullable();
            $table->text('event_description')->nullable();
            $table->boolean('event_visible')->default(1);
            $table->string('event_repeat_type')->nullable();
            $table->integer('event_repeat_interval')->default(1);
            $table->string('event_repeat_by_day')->nullable();
            $table->text('event_sub_category')->nullable();
            $table->text('event_category')->nullable();
            $table->text('event_tags')->nullable();
            $table->longText('event_invited_people')->nullable();
            $table->bigInteger('number_of_seats')->nullable();
            $table->LongText('event_invited_by_email')->nullable();
            $table->LongText('event_invited_note')->nullable();
            $table->integer('steps')->default(0);
            $table->integer('auto_accept_participant')->default(0);
            $table->boolean('status')->default(1);
            $table->date('date_of_create')->nullable();
            $table->string('timezone')->nullable();
            $table->string('duration')->nullable();
            $table->string('eventSubscriptionType')->nullable();
            $table->integer('version')->default(1);
            $table->unsignedBigInteger('parent_event_id')->nullable();
            $table->boolean('is_active')->default(1);
            $table->string('cost')->default(0);
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
        Schema::dropIfExists('events');
    }
}
