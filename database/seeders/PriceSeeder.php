<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Price;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            [
                'role' => 1,
                "price" => 6000, 
            ],
            [
                'role' => 2,
                'price' => 7000,
            ],
            [
                'role' => 3,
                'price' => 8000,
            ],
            [
                'role' => 4,
                'price' => 16000,
            ],
        ];

        Price::insert($prices);
    }
}
