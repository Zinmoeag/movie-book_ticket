<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time'
    ];

    public function room()
    {
        return $this->belongsToMany(Room::class,"schedules")->withPivot(['slug', 'room_id']);
    }

    public function scopeGetbyDateRoom($query, $target) 
    {
        $query = $query->where('date', $target);
    }

    public function scopeGetByTimeDate($query, $time, $date, $roomId)
    {
        $query = $query
            ->where('date', $date )
            ->where('time',$time)
            ->whereHas('room', function ($query) use($roomId){
                $query->where('id', $roomId);
            })
            ->with(['room' => fn($query) => $query->with('cinema')]);
    }
}
