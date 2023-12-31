<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cinema;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RoomFactory extends Factory
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
            'room_number' => self::$number++,
            'cinema_id' => '1',
            'room_type' => 1,
        ];
    }
}
