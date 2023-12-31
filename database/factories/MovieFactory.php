<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "movie" => fake()->name(),
            'slug'=>fake()->slug(),
            "release_date" => fake()->date(),
            "duration" => "1:300",
            'movie_photo' => 'blah blah'
        ];
    }
}
