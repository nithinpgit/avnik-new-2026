<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->unsignedBigInteger('event_time_slot_id');
            $table->foreign('event_time_slot_id')->references('id')->on('event_time_slots');
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->integer('to_user')->default(0);
            $table->boolean('blocked_user')->default(0);
            $table->boolean('withdraw_amount')->default(0);
            $table->boolean('released')->default(0);
            $table->string('event_date_time')->nullable();
            $table->string('amount')->nullable();
            $table->string('stripe_id')->nullable()->collation('utf8mb4_bin');
            $table->string('card_brand')->nullable();
            $table->string('card_last_four', 4)->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->boolean('paid')->nullable();
            $table->boolean('extended')->default(0);
            $table->integer('extended_id')->nullable();
            $table->string('accept_by_host')->default('pending');
            $table->boolean('amount_refunded')->default(0);
            $table->string('refund_transaction')->nullable();
            $table->string('refunded_amount',255)->default(0);
            $table->integer('refunded_percentage')->default(0);
            $table->string('refund_description',255)->nullable();
            $table->string('refund_id')->nullable();
            $table->string('transaction_id')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_payments');
    }
}
