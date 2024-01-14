<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'room_type',
        'cinema_id',
        'total_seats',
    ];

    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'schedules');
    }

    public function dates()
    {
        return $this->belongsToMany(Date::class, 'schedules');
    }

    public function cinema(){
        return $this->belongsTo(Cinema::class);
    }
}
