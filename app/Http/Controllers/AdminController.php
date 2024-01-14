<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Movie;
use App\Utilities\BookingSeatRating;

class AdminController extends Controller
{
    private $bookingRate;
    public function __construct()
    {
        $this->bookingRate = new BookingSeatRating();
    }
    
    public function Index()
    {
        $movies = Movie::where('status', 'on_theatre')->get();
        // dd($this->bookingRate->getSeatsCount());
        // dd(new BookingSeatRating());

        $movieSeatsCounts = [];
        foreach($movies as $movie){
            $movieSeatsCounts[$movie->movie]  = $this->bookingRate->getSeatsCountByMovie($movie);        
        }

        // $bookingRate = round(($totalBookedSeats/$totalSeats) * 100, 2);
     

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'movie_seat_rating' => $movieSeatsCounts,
        ]);
    }
}
