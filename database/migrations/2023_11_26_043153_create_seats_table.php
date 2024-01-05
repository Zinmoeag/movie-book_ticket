<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id')->unsigned();
            $table->string('seat_type');
            $table->integer('seat_number');
            $table->string('row');
            $table->enum('role', ['front', 'mid', 'back', 'couple'])->default('front');
            $table->enum('status', ['booked', 'bought', 'avaliable'])->default('avaliable');
            $table->foreignId('price_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
