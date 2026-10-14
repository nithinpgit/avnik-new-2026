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

class CreateSkillmastersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill_masters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
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
        Schema::dropIfExists('skillmasters');
    }
}
