<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Schedule;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'slug' => "shiedkdsgkkdlsg",
                'movie_id' => 1,
                'room_id' => 1,
                'date_id' => 1,
                
            ],
            [
                'slug' => "shiedkdsgkkddddlsg",
                'movie_id' => 1,
                'room_id' => 3,
                'date_id' => 2,
                
            ],
            [
                'slug' => "shiedkdsgkkddfdlsg",
                'movie_id' => 1,
                'room_id' => 6,
                'date_id' => 3,
                
            ],
            [
                'slug' => "dkdsgkkddddlsg",
                'movie_id' => 1,
                'room_id' => 12,
                'date_id' => 4,
                
            ],
            [
                'slug' => "shiedkdsgkgdsbdsg",
                'movie_id' => 1,
                'date_id' => 5,
                'room_id' => 16,
                
            ],
            [
                'slug' => "shiedkdgsgdsdddlsg",
                'movie_id' => 1,
                'date_id' => 6,
                'room_id' => 17,
                
            ],
        ];

        Schedule::insert($data);
    }
}
