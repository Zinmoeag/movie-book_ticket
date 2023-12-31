<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Schedule;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->slug(),
            'movie_id' => 1,
            'date_id' => rand(1,6),
            'room_id' => rand(1,30),
        ];
        
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Schedule $schedule) {
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'A',
                "seat_type" => "normal",
            ]);
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'B',
                "seat_type" => "normal",
            ]);
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'C',
                "seat_type" => "normal",
            ]);
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'D',
                "seat_type" => "normal",
            ]);
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'E',
                "seat_type" => "normal",
            ]);
            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'F',
                "seat_type" => "normal",
            ]);

            \App\Models\Seat::factory(18)->create([
                "schedule_id" => $schedule->id,
                'row' => 'G',
                "seat_type" => "normal",
            ]);

            \App\Models\Seat::factory(6)->create([
                "schedule_id" => $schedule->id,
                'row' => 'H',
                "seat_type" => "couple",
            ]);
        });
    }
}
