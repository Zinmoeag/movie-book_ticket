<?php

namespace App\Utilities;

use App\Models\Movie;
use App\Models\Schedule;

class BookingSeatRating 
{


    public function getSeatsCountByMovie($movie)
    {
        $schedules = Schedule::where('movie_id',$movie->id)
        ->withCount(['seats'])
        ->withCount(['seats as bought_seat' => function($query){
            $query->where('status','bought');
        }])
        ->withCount(['seats as booked_seat' => function($query){
            $query->where('status','booked');
        }])->get();


        $totalSeats = 0;
        $totalBookedSeats = 0;
        foreach($schedules as $schedule){
            $totalSeats += $schedule->seats_count;
            $totalBookedSeats += $schedule->bought_seat;
        }

        return [
            'key' => $movie->slug,
            'movie_name' => $movie->movie,
            'total_seats' => $totalSeats,
            'bought_seats' => $totalBookedSeats,
        ];


    

    }

    
}