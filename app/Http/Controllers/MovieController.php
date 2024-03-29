<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Movie;
use App\Models\Schedule;
use App\Models\Room;
use App\Utilities\MovieRooms;
use App\Utilities\DateFilter;
use App\Utilities\SeatsMaker;
use App\Models\Event;
use App\Http\Requests\MovieStoreRequest;
use App\Http\Requests\MovieUpdateRequest;
use Illuminate\Support\Facades\Storage;
use App\Models\Price;

class MovieController extends Controller
{
    public function show()
    {
        return Inertia::render('Welcome', [
            'movies' => Movie::where('status', 'on_theatre')->latest()->paginate(3),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Movie/Create');
    }

    public function AdminIndex()
    {   
        return $this->latestMovies('Admin/Movie/Movie');
    }

    public function latestMovies($path)
    {
        return Inertia::render($path,[
            'movies' => Movie::latest()->get(),
        ]);
    }

    private function makeSlug($name){
        return join("_", explode(" ", strtolower($name)));
    }

    private function saveImageAndGetPath ($imageFile) {
        $path = Storage::putFile('/public/movie', $imageFile);
        $path = trim($path, "/public");

        return $path;
    }

    
    public function book (Movie $movie)
    {
        $date  = request()->input('date');
        $time  = request()->input('time');
        $roomId  = request()->input('roomId');

        $schedule = Schedule::latest()->getSchedule(request(['date','time','roomId']))->first();

        try {
            if($schedule){
                $movieSeat = new SeatsMaker($schedule->seats);
     
                return Inertia::render('ScheduleRoom',[
                    'date' => [
                        "current_date" => $date,
                        'current_time' => $time,
                    ],
                    'movie' => $movie,
                    "room" => $schedule->room->load('cinema'),
                    'schedule' => $schedule->slug,
                    "scheduleSeat" => $movieSeat->make(),
                    'seats' => $movieSeat->make(),
                    'price' => Price::all(),
                ]);
            }
 
            
        } catch (\Throwable $th) {
            throw $th;
            return abort(404);
        }
    }

    public function store(MovieStoreRequest $request)
    {
        $validated = $request->safe()->only(['movie', 'movie_photo', 'duration' , 'release_date' ]);

        $slug = $this->makeSlug($validated['movie']);

        $path = $this->saveImageAndGetPath($validated['movie_photo']);

        Movie::create([
            'movie' => $validated['movie'],
            'slug' => $slug,
            'duration' => $validated['duration'],
            'release_date' => $validated['release_date'],
            'movie_photo' => $path
        ]);

        return to_route('admin.movie');
    }


    public function editAll()
    {
        return $this->latestMovies('Admin/Movie/EditAll');
    }

    public function edit(Movie $movie)
    {
        return Inertia::render('Admin/Movie/Edit',[
            'movie' => $movie,
        ]);
    }

    public function update(MovieUpdateRequest $request, Movie $movie)
    {
        $cleanData = $request->safe()->only(['movie', 'movie_photo', 'duration' , 'release_date' ]);
            
        //filter null value
        $updateData = [];
        foreach($cleanData as $key => $value){
            if($value){
                //if movie name update slug have to be update
                if($key === "movie"){
                    $updateData['slug'] = $this->makeSlug($value);
                }
                if($key === "movie_photo"){
                    $updateData[$key] = $this->saveImageAndGetPath($value);
                }else{                    
                    $updateData[$key] = $value;
                }
            }
        }

        //check update array is empty or not
        if(!empty($updateData)){
            $movie->update($updateData);
            return to_route('admin.movie');
        }
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();

        return to_route('admin.movie');
    }
}

