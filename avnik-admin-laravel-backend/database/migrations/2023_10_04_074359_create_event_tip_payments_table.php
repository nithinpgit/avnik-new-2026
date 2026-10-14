<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventTipPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_tip_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->unsignedBigInteger('to_user_id');
            $table->foreign('to_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->unsignedBigInteger('event_slot_id');
            $table->foreign('event_slot_id')->references('id')->on('event_time_slots');
            $table->string('pay_by')->nullable();
            $table->string('payer_id')->nullable();
            $table->string('refund_id')->nullable();
            $table->string('refund_transaction_id')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('description')->nullable();
            $table->string('amount')->nullable();
            $table->string('amount_refunded')->nullable();
            $table->integer('withdraw_amount')->default(0);
            $table->string('refund_status')->nullable();
            $table->string('status')->nullable();
            $table->boolean('paid')->default(false);
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
        Schema::dropIfExists('event_tip_payments');
    }
}
