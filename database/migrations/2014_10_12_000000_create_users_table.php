<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('first_name');
            $table->string('familly_name');
            $table->string('email')->unique();
            $table->string('country');
            $table->string('city');
            $table->string('password');
            $table->text('skills')->nullable();
            $table->string('profesion')->default('');
            $table->text('bio')->nullable();
            $table->string('phone')->default('');
            $table->boolean('phone_show')->default(0);
            $table->string('contact_email')->default('');
            $table->integer('thumbs_up')->default(0);
            $table->integer('thumbs_down')->default(0);
            $table->string('user_img')->default('user_img.jpg');
            $table->string('user_back_img')->default('1uBpG3o.jpg');
            $table->string('activation_code')->nullable();
            $table->boolean('status')->default(0);
            $table->boolean('work_status')->default(0);
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
        Schema::dropIfExists('users');
    }
}
