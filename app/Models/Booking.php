<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_name',
        'user_phone',
        'user_email',
        'schedule_id',
        'price',
    ];

    public function Schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function seats()
    {
        return $this->belongsToMany(Seat::class);
    }

    public function ddd(){
        Booking::whereHas('schedule', function($query){
            $query->whereHas('movie', function($query){
                $query->where("id",1);
            });
        });
    }
}
