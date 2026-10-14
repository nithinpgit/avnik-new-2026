<?php


namespace App\Helpers;


  class UserLocalTime
  {
   public static function getCurrentUserTimeZone(){
        // $ip="178.128.117.77";
        $ip = file_get_contents("http://ipecho.net/plain");
        $url = 'http://ip-api.com/json/'.$ip;
        $tz = file_get_contents($url);
        $tz = json_decode($tz,true)['timezone'];

        return $tz;
    }

} 
