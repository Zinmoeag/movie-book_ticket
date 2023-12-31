<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Date;
use Carbon\Carbon;


class DateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'date' => Carbon::now()->toDateString(),
                'time' => '08:30',
            ],
            [
                'date' => Carbon::now()->toDateString(),
                'time' => '10:30',
            ],
            [
                'date' => Carbon::now()->toDateString(),
                'time' => '14:30',
            ],
            [
                'date' => Carbon::now()->add(1,'day')->toDateString(),
                'time' => '08:30',
            ],
            [
                'date' => Carbon::now()->add(1,'day')->toDateString(),
                'time' => '10:30',
            ],
            [
                'date' => Carbon::now()->add(1,'day')->toDateString(),
                'time' => '14:30',
            ],

        ];
        Date::insert($data);
    }
}
