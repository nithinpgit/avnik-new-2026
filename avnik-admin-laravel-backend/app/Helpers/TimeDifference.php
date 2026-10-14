<?php

namespace App\Helpers;

use Carbon\Carbon;

class TimeDifference
{
    public static function DifferenceBetween($timeslots)
    {
                $created = new Carbon($timeslots);
                $now = Carbon::now();
                $difference = ($created->diff($now)->days < 1)
                    ? 'Today'
                    
                : $created->diffForHumans($now);
            
            return $difference;
    }
    public static function DifferenceDays($timeslots)
    {
        return Carbon::createFromTimeStamp(strtotime($timeslots))->diffInDays();
            
    }
}

?>