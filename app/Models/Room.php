<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class room extends Model
{
    use HasFactory;

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
