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
use App\Events\AdminBookingEvent;

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

        $booking = $this->bookingHandling->storeRecord($validated, $schedule, $seatId, 1);
        
        $seats  = Seat::updateStatus($seatId, 1);

        event(new BookEvent(
            $seats->get()->toArray(), 
            $schedule->slug
        ));

        event(new AdminBookingEvent(
            $schedule->slug, 
            $booking->load('seats')
        ));
    }


    public function adminIndex()
    {
        $bookingId = request()->input('booking_id');

        return Inertia::render('Admin/Booking/Booking',[
            'booking' => Inertia::lazy(fn () => Booking::where('id',$bookingId)->with([
                'seats',
                'schedule' => fn($query) => $query->with(['room' => fn($query) => $query->with('cinema')]),
            ])->first()),
        ]);
    }


    public function buy(BookingPostRequest $request, Schedule $schedule){
        $validated = $request->safe()->only(['name', 'email', 'phone' , 'seat' ]);

        $seatId = $this->bookingHandling->getSeatIds($validated['seat']);

        $booking = $this->bookingHandling->storeRecord($validated, $schedule, $seatId, 2);

        $seats = Seat::updateStatus($seatId, 2);

        event(new BookEvent(
            $seats->get()->toArray(), 
            $schedule->slug
        ));

        event(new AdminBookingEvent(
            $schedule->slug, 
            $booking->load('seats')
        ));
    }


    public function Confirmation(Booking $booking)
    {
   
        return Inertia::render('BookingConfirmation', [
            'booking' => BookingData::make($booking),
        ]);
    }

    public function destroy(Booking $booking)
    {
        $seatIds = $booking->seats->map(function($seat){
            return $seat->id;
        });

        Seat::updateStatus($seatIds,3);

        $booking->seats()->detach();
        $booking->delete(); 

        return to_route('admin.booking');
    }


}
