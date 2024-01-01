<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'movie_id',
        'date_id',
        'room_id',
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function date()
    {
        return $this->belongsTo(Date::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }


    public function seats()
    {
        return $this->hasMany(Seat::class);
    }


    public function scopeFilter($query, $filter)
    {
        $query->when($filter['date'] ?? false , function ($query, $date) {
            $query->whereHas('date',function($query) use($date) {
                $query->where("date", $date);
            });
        });

        $query->when($filter['movie'] ?? false, function($query, $movie) {
            $query->whereHas('movie', function($query) use($movie) {
                $query->where('slug', $movie);
            });
        }); 
    }

    public function scopeGetSchedule($query, $filter)
    {
        $query->where(function($query) use($filter){
            $query->whereHas('date', function($query) use($filter) {
                $query->where('date', $filter['date']);
            })->whereHas('date', function($query) use($filter) {
                $query->where('time', $filter['time']);
            })->whereHas('room', function($query) use($filter){
                $query->where('id', $filter['roomId']);
            });
        });
    }

}
