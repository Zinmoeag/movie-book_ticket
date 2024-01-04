<?php

namespace App\Utilities;

use App\Models\Booking;
use App\Models\Seat;

class BookingHandling 
{

    public function getSeatIds($seats)
    {
        return collect($seats)->map(function ($seat) {
            return $seat['id'];
        })->toArray();
    }
    public function storeRecord($data, $schedule, $seatId)
    {   
        $bookingSeats = Seat::whereIn('id', $seatId)->get();

        $totalPrice = 0;
        foreach($bookingSeats as $seat){
            $totalPrice += $seat->price->price;
        }

        $booking = Booking::create([
            "user_name" => $data["name"],
            'user_phone' => $data['phone'],
            'user_email' => $data['email'],
            'schedule_id' => $schedule->id,
            'price' => $totalPrice
        ]);

        $booking->seats()->attach($seatId);

        return $booking;

        
    }
}