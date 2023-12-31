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
                "price" => 6000, 
            ],
            [
                'price' => 8000,
            ],
            [
                'price' => 16000,
            ],
        ];

        Price::insert($prices);
    }
}
