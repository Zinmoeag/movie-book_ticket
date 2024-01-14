<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_id',
        'seat_type',
        'row',
        'role',
        'status',
        'seat_number',
    ];

    public function Seat()
    {
        return $this->belongsTo(Scheduleg::class);
    }

    public function Price()
    {
        return $this->belongsTo(Price::class);
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class);
    }

    public static function scopeUpdateStatus($query, $seats, $status)
    {
        $query->whereIn('id', $seats)->update(['status' => $status]);
    }

}