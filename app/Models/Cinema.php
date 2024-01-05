<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cinema extends Model
{
    use HasFactory;

    protected $fillable = [
        'cinema_name',
        'cinema_location'
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

}