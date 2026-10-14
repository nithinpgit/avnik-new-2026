<?php
/**
* Create Migration
* @author    Subham Singh Rawat <rwtshubhu5569@gmail.com>
* @author    Deepak Kumar <deepak@dktechoworlds.com>
* @copyright 2020 DkTechworlds Websolution (https://dktechworlds.com)
*/
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserFeedbackReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_feedback_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk_id');
            $table->foreign('user_fk_id')->references('id')->on('users');
            $table->string('customer_id')->nullable();
            $table->text('description')->nullable();
            $table->string('rating')->nullable();
            $table->string('status')->default(0);
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
        Schema::dropIfExists('user_feedback_reviews');
    }
}
