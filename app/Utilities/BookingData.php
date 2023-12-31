<?php

namespace App\Utilities;

use App\Models\Schedule;
use App\Models\Booking;
use App\Models\Seat;
use App\Models\Movie;
use App\Models\date;
use App\Models\Room;

class BookingData {

    private $bookingRawData;

    private $movie;
    private $date;
    private $room;
    private $seat;
    private $booking;
    

    private function __construct ($booking){
        $this->bookingRawData = $booking->load('seats');
        $schedule = $this->bookingRawData->schedule;

        $this->movie = Movie::where('id', $schedule->movie_id)->first();
        $this->date = Date::where('id', $schedule->date_id)->first();
        $this->room = Room::where('id', $schedule->room_id)->first()->load('cinema');
    }
    
    public static function make($booking){

        $book = new BookingData($booking);

        return [
            'booking_id' => $book->bookingRawData->id,
            'booking_user_name' => $book->bookingRawData->user_name,
            'booking_user_phone' => $book->bookingRawData->user_phone,
            'movie_name' => $book->movie->movie,
            'cinema_name' => $book->room->cinema->cinema_name,
            'room_number' => $book->room->room_number,
            'schedule' => [
                'date' => $book->date->date,
                'time' => $book->date->time, 
            ],
            'seats' => $book->bookingRawData->seats->toArray(),
            'price' => $book->bookingRawData->price,
        ];

    }

}