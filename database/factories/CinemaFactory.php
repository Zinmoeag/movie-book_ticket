<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cinema;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CinemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cinema_name' => fake()->name(),
            'cinema_location' => strval(rand(100000,9999999)),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Cinema $cinema) {
           \App\Models\Room::factory(5)->create(['cinema_id' => $cinema->id, 'room_type' => rand(1,2)]);
        });
    }
}
