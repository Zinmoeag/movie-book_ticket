<?php


namespace App\Utilities;

class DateFilter
{

    public static function filter($array,$uri)
    {
        $filteredDates = [];
        foreach($array as $date)
        {
            $isExisted  = false;


            foreach($filteredDates as $filteredDate)
            {
                if($date->date === $filteredDate['name'])
                {
                    $isExisted = true;
                    break;
                }
            }

            if (!$isExisted) {

                $dateObj = [
                    'name' => $date->date,
                    'value' => $date->date
                ];
                $filteredDates[] = $dateObj;
            }
            
        }
    
        return $filteredDates;
    }


    public function getDateDropdown()
    {

    }


    public function get()
    {
        return $this->filteredDates;
    }
}