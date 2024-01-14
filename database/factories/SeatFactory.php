<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    private static $number = 1;

    public function definition(): array
    {
        return [
            'schedule_id' => 1,
            'seat_number' => self::$number++,
            'seat_type' => 'normal',
            'row' => 'A',
            'status' => "avaliable",
        ];
    }
}
