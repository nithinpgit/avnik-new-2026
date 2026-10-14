<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupportTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('ticket_id')->unique(); // e.g., TKT-ABC123DEF456
            $table->string('title', 255);
            $table->enum('category', ['Technical', 'Payment', 'Booking', 'Profile', 'Other'])->default('Other');
            $table->enum('priority', ['Low', 'Medium', 'High', 'Critical'])->default('Medium');
            $table->longText('description');
            $table->string('attachment')->nullable(); // File path to attachment
            $table->enum('status', ['Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'])->default('Open');
            $table->unsignedBigInteger('assigned_to')->nullable()->index(); // Admin ID
            $table->boolean('is_read')->default(0); // User read status
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('support_tickets');
    }
}
