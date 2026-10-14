<?php
namespace App\Helpers;
use Illuminate\Http\Response;

/*
    use this reffrence for status code
https://gist.github.com/jeffochoa/a162fc4381d69a2d862dafa61cda0798

*/

class CommonHelper
{
	public static function getcleanurl($name)
    {
        $name = trim($name);
        $url = preg_replace('/[^A-Za-z0-9\-]/', '-', $name);
        $url = strtolower(str_replace("-----", "-", $url));
        $url = strtolower(str_replace("----", "-", $url));
        $url = strtolower(str_replace("---", "-", $url));
        $url = strtolower(str_replace("--", "-", $url));
        return rtrim($url, '-');
    }
	public static function get_unique_slug($title = '', $table = '', $column = '', $pId=null)
    {
        $title = self::getcleanurl($title);

        $condition[$column] = $title;

        if($pId){
            $condition['parent_id'] = $pId;
        }

        $nor = \DB::table($table)
            ->where($condition)
            ->count();
        if (!$nor) {
            return $title;
        }
        $title .= '-' . chr(rand(65, 90));
        return self::get_unique_slug($title, $table, $column);
    }

    public static function AppResponseError($message = 'Response', $data = null, $status = Response::HTTP_INTERNAL_SERVER_ERROR){

        return [
            'success'=>  false,
            'message'=> $message,
            'error'=>  $data,
            'statusCode'=> $status
        ];
    }

    public static function AppResponseSuccess($message = 'Response', $data = null, $status = Response::HTTP_OK){
        
        return [
            'success'=>  true,
            'message'=> $message,
            'data'=>  $data,
            'statusCode'=>  $status
        ];
    }
    public static function articleCategorySeedData(){

        $array =[

            [
                'parent'=> ['name'=> 'Job Opportunities', 'description'=> null],
                'child'=>[
                    ['name'=> 'Business Administration', 'description'=>null],
                    ['name'=> 'Public Administration', 'description'=>null],
                    ['name'=> 'Customer Service', 'description'=>null],
                    ['name'=> 'Commercial & Sales', 'description'=>null],
                    ['name'=> 'Purchasing, Logistics & Warehouse', 'description'=>null],
                    ['name'=> 'Design & Graphic Arts', 'description'=>null],
                    ['name'=> 'Law', 'description'=>null],
                    ['name'=> 'Educations & Training', 'description'=>null],
                    ['name'=> 'Engineers & Technicians', 'description'=>null],
                    ['name'=> 'Finance & Banking', 'description'=>null],
                    ['name'=> 'Real Estate & Construction', 'description'=>null],
                    ['name'=> 'IT & Telecommunications','description'=>null],
                    ['name'=> 'Communication & Marketing', 'description'=>null],
                    ['name'=> 'Professions, Arts & Crafts', 'description'=>null],
                    ['name'=> 'Quality & Production', 'description'=>null],
                    ['name'=> 'Retail', 'description'=>null],
                    ['name'=> 'Health & Wellness', 'description'=>null],
                    ['name'=> 'Tourism & Catering', 'description'=>null]
                ]
            ],
            [
                'parent'=> ['name'=> 'Real Estate', 'description'=>null, 'id'=> 1],
                'child'=> [
                    ['name'=> 'Houses', 'description'=>null],
                    ['name'=> 'Apartments', 'description'=>null],
                    ['name'=> 'Villas', 'description'=>null],
                    ['name'=> 'Plots', 'description'=>null],
                    ['name'=> 'Land', 'description'=>null],
                    ['name'=> 'Comercial', 'description'=>null],
                    ['name'=> 'Parkings', 'description'=>null],
                    ['name'=> 'Buildings', 'description'=>null],
                ],
            ],
            [
                'parent'=> ['name'=> 'Hotels & Accommodation', 'description'=>null, 'id'=> 3],
                'child' => [
                    ['name'=> 'Hotels', 'description'=>null],
                    ['name'=> 'Local Accommodation (very short term rent)', 'description'=>null],
                    ['name'=> 'Long Term Rent', 'description'=>null],
                ]

            ],
            [
                'parent'=> ['name'=> 'What to do / Things to do', 'description'=>null, 'id'=> 4],
                'child' => [
                    ['name'=> 'City', 'description'=>null],
                    ['name'=> 'Mountain', 'description'=>null],
                    ['name'=> 'Sea', 'description'=>null],
                    ['name'=> 'Eat & Drink', 'description'=>null],
                    ['name'=> 'Others', 'description'=>null],
                ]
            ],
            [
                'parent'=> ['name'=> 'Investment Opportunities', 'description'=>null, 'id'=>2],
                'child'=> [
                    ['name'=> 'Real Estate Property', 'description'=>null],
                    ['name'=> 'Businesses for sale', 'description'=>null],
                    ['name'=> 'Others', 'description'=>null],
                ]
            ]

        ];
        return $array;

    }
    

}