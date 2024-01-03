<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Date;
use App\Models\Movie;
use App\Models\Seat;
use App\Utilities\DateFilter;
use App\Utilities\MovieData;
use App\Utilities\ScheduleMaker;
use App\Models\Room;
use App\Models\Cinema;
use App\Utilities\RoomLayoutGenerator;
use App\Utilities\MovieRooms;
use Carbon\Carbon;
use App\Utilities\SeatsMaker;



class ScheduleController extends Controller
{

    private $adminPrefix = 'Admin/Schedule/';
    private $schedule;

    public function __construct()
    {
        $this->schedule = new ScheduleMaker;
    }

    public function adminRoute($path)
    {
        return $this->adminPrefix . $path;
    }

    public function schedule(Movie $movie)
    {
        
        $showDateString = request()->input('time');

        if($showDateString)
        {
            $schedule = $this->schedule->getScheduleByDate($showDateString);

            // dd($schedule);
            $events  = new MovieRooms($schedule);
            $dates  = DateFilter::filter($movie->dates, '/schedule/'.$movie->slug);
            if(empty($dates)){
                return Inertia::render("Error/CommingSoon",[]);
            }

            return Inertia::render('Book',[
                'currentDate' => $showDateString,
                'showDates' => $dates,
                'movie' => $movie,
                'showEvents' => $events->get(),
            ]);
        }else{

            $isExist = $movie->dates()->where('date', Carbon::now()->toDateString())->first();

            $defaultDate = $isExist ? $isExist->date : $movie->dates->first()?->date ;

            return redirect('/schedule/'.$movie->slug.'?time='.$defaultDate);
        }
    }


    public function adminIndex()
    {
        $schedules  = Schedule::latest()
                ->filter(request(['date', 'movie']))
                ->with([
                    'movie' ,
                    'date',
                    'room' => fn($query) => $query->with('cinema'),
                ])
                ->withCount([
                    'seats as available_seats' => function ($query) {
                        $query->where('status', 3);
                    }
                ])->get();

        $filteredSchedules = $schedules->groupBy(function($item){
            return $item->date['date'];
        });

        $dates = DateFilter::filter(Date::all(), '/admin/schedule');

        return Inertia::render($this->adminRoute("Schedule"), [
            'schedules' => $filteredSchedules,    
            'dates' => $dates,
            'movies' => MovieData::getDropDownValue('slug'),
        ]);
    }

    public function create(Request $request)
    {

        $movies = MovieData::getDropDownValue('id');

        if(!$movies){
            return to_route('admin.movie.create');
        }

        $cleanData  = $request->validate([
            'cinema' => 'exists:cinemas,id|integer'
        ]);

        $cinemaId = $cleanData['cinema'] ?? null;

        $dates = Date::groupBy('date')
                ->select(['date'])
                ->get();

        $time = Date::groupBy('time')
                ->select(['time'])
                ->get(); 

        //cinema and rooms
        $cinemas = Cinema::latest()->with(['rooms'])->get();


        return Inertia::render($this->adminRoute('Create'), [
            'movies' => $movies,
            'cinemas' => $cinemas,
        ]);
    }

    public function store()
    {
        $cleanData = request()->validate([
            'movie_id' => 'required',
            'room_id' => 'required',
            'date' => 'required',
            'time' => 'required'
        ]);

        $this->schedule->createSchedule($cleanData);

        return to_route('admin.schedule');
        
    }

    public function room(Schedule $schedule)
    {
        $scheduleSeats = new SeatsMaker($schedule->seats);

        // $seatId = 259;

        $requestSeatId = request()->input('seat_id');

        // dd($requestSeatId);
        $seat = Seat::find($requestSeatId);
        $bookingInfo = $seat ? $seat->bookings()->with('seats')->first() : null;

        // dd($schedule->bookings->load('seats'));

        return Inertia::render($this->adminRoute('Room'),[
            'schedule' => $schedule,
            'seats' => $schedule->seats,
            'room' => $schedule->room->load(['cinema']),
            'movie' => $schedule->movie,
            'date' => $schedule->date,
            'book_seat'=>$schedule->bookings->load('seats')
        ]);
    }

    public function edit(Schedule $schedule)
    {
        $movies = MovieData::getDropDownValue('id');

        return Inertia::render($this->adminRoute('Edit'),[
            'schedule' => $schedule,
            'movies' => $movies
        ]);
    }

    public function updateDate(Schedule $schedule)
    {
        $cleanData = request()->validate([
            'date' => 'required',
            'time' => 'required',
        ]);

        $this->schedule->updateDate($schedule, $cleanData['date'], $cleanData['time']);
  
    }

    public function updateMovie(Schedule $schedule)
    {
        $cleanData = request()->validate([
            'movie_id' => 'required',
        ]);

        $schedule->update([
            'movie_id' => $cleanData['movie_id'],
        ]);
        
    }
}
 