<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Seat;
use App\Models\Schedule;

class IsAvaliable implements ValidationRule
{

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    private $schedule;

    public function __construct($scheduleId){

        $this->schedule = Schedule::where('slug', $scheduleId)->first();
    }   

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        //check seat is avaliable and existed and correct schedule
        $isExist = Seat::where("id", $value)
                ->where('status', 3)
                ->where('schedule_id', $this->schedule->id)->exists();

        if(!$isExist){
            $fail('seat is invalid bratha');
        }
    }
}
