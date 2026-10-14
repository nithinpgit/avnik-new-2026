<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_fees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('p_user_id');
            $table->foreign('p_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('h_user_id');
            $table->foreign('h_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('event_slot_id');
            $table->foreign('event_slot_id')->references('id')->on('event_time_slots');
            $table->unsignedBigInteger('event_fk_id');
            $table->foreign('event_fk_id')->references('id')->on('events');
            $table->integer('withdraw_amount')->default(0);
            $table->string('event_date_time')->nullable();
            $table->string('amount')->nullable();
            $table->string('stripe_id')->nullable()->collation('utf8mb4_bin');
            $table->string('card_brand')->nullable();
            $table->string('card_last_four', 4)->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->boolean('paid')->nullable();
            $table->boolean('amount_refunded')->nullable();
            $table->string('refund_transaction')->nullable();
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
        Schema::dropIfExists('service_fees');
    }
}
