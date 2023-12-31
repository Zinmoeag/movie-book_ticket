<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie',
        'slug',
        "duration",
        'movie_photo',
        'release_date'
    ];

    public function dates()
    {
        return $this->belongsToMany(Date::class, 'schedules')->withPivot('slug');
    }

    public function getMoviePhotoAttribute($value)
    {
        return env('APP_URL').'/storage/' . $value;
    }
}