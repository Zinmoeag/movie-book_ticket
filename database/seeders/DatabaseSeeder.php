<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@gmail.com',
            'password' => 11111111,
            'role' => 'admin'
        ]);

        
        \App\Models\Cinema::factory(10)->create();
        
        \App\Models\Movie::factory(10)->create();
  
        \App\Models\Schedule::factory(2)->create();
        
        $this->call([
            // ScheduleSeeder::class,
            DateSeeder::class,
            PriceSeeder::class
        ]);
    }
}
