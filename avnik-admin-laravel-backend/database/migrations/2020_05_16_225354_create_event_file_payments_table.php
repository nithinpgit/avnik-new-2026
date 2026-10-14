<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventFilePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_file_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->unsignedBigInteger('to_user_id');
            $table->foreign('to_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->unsignedBigInteger('event_file_fk_id');
            $table->foreign('event_file_fk_id')->references('id')->on('file_managers');
            $table->string('pay_by')->nullable();
            $table->string('payer_id')->nullable();
            $table->string('refund_id')->nullable();
            $table->string('refund_transaction_id')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('description')->nullable();
            $table->string('amount')->nullable();
            $table->string('amount_refunded')->nullable();
            $table->boolean('withdraw_amount')->default(0);
            $table->boolean('released')->default(0);
            $table->string('event_date_time')->nullable();
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
        Schema::dropIfExists('event_file_payments');
    }
}
