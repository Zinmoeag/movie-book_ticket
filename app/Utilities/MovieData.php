<?php

namespace App\Utilities;

use App\Models\Movie;

class MovieData
{

    public static function getDropDownValue($valueType)
    {
        $movies = Movie::all()->map(function ($item) use($valueType) {
            return [
                'id' => $item->id,
                'name' => $item->movie,
                'value' => $item[$valueType],

            ];
        });

        if(empty($movies->toArray())){
            return null;
        }

        return $movies;
    }
}