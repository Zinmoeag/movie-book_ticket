<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BookingPostRequest;
use App\Models\Schedule;
use App\Models\Booking;
use App\Models\Seat;
use App\Models\Movie;
use App\Models\date;
use App\Models\Room;
use Inertia\Inertia;
use App\Utilities\Bookingdata;
use App\Utilities\BookingHandling;
use App\Events\BookEvent;

class BookingController extends Controller
{

    private $bookingHandling;

    public function __construct()
    {
        $this->bookingHandling = new BookingHandling();
    }

    public function book(BookingPostRequest $request,Schedule $schedule) {
        
        $validated = $request->safe()->only(['name', 'email', 'phone' , 'seat' ]);

        $seatId = $this->bookingHandling->getSeatIds($validated['seat']);

        $booking = $this->bookingHandling->storeRecord($validated, $schedule, $seatId);
        
        $seats  = Seat::updateStatus($seatId, 1);

        event(new BookEvent($seats->get()->toArray(), $schedule->slug));
    }


    public function buy(BookingPostRequest $request, Schedule $schedule){
        $validated = $request->safe()->only(['name', 'email', 'phone' , 'seat' ]);

        $seatId = $this->bookingHandling->getSeatIds($validated['seat']);

        $this->bookingHandling->storeRecord($validated, $schedule, $seatId);

        $seats = Seat::updateStatus($seatId, 2);
        
        event(new BookEvent($seats->get()->toArray(), $schedule->slug));
    }


    public function Confirmation(Booking $booking)
    {
   
        return Inertia::render('BookingConfirmation', [
            'booking' => BookingData::make($booking),
        ]);
    }
}
