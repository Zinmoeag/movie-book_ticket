<?php

namespace App\Utilities;

use App\Models\Booking;
use App\Models\Seat;
use App\Models\Price;

class BookingHandling 
{

    public function getSeatIds($seats)
    {
        return collect($seats)->map(function ($seat) {
            return $seat['id'];
        })->toArray();
    }
    public function storeRecord($data, $schedule, $seatId, $action)
    {   
        $bookingSeats = Seat::whereIn('id', $seatId)->get();

        $totalPrice = 0;
        foreach($bookingSeats as $seat){
            $totalPrice += Price::where('role', $seat->role)->first()->price;
        }

        $booking = Booking::create([
            "user_name" => $data["name"],
            'user_phone' => $data['phone'],
            'user_email' => $data['email'],
            'schedule_id' => $schedule->id,
            'status' => $action,
            'price' => $totalPrice
        ]);

        $booking->seats()->attach($seatId);

        return $booking;

        
    }
}