<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Torann\GeoIP\Facades\GeoIP;

class SearchController extends Controller
{

	public function __construct(){
		$this->middleware('guest');
	}


    public function getWorkers(Request $request)
    {
    	$data = $request->json()->all();
    	$job = htmlspecialchars($data['job']);
    	$country = htmlspecialchars($data['country']);
    	$city = htmlspecialchars($data['city']);
    	$c = htmlspecialchars($data['c']);

    	if(strlen($city) <= 0){
    		$ip = array_values((array)geoip('105.159.187.54'))[0];
    		$country = $ip['country'];
    		$city = $ip['city'];
    	}

    	if($c == "1"){
    		$workers = DB::table('users')->where('country', $city)->orWhere('city', $city)->select('first_name', 'familly_name', 'user_img', 'thumbs_up', 'thumbs_down', 'profesion', 'country', 'city', 'username')->get();
    	}else if($c == "2"){
    		$workers = DB::table('users')->where([['city', $city], ['country', $country]])->select('first_name', 'familly_name', 'user_img', 'thumbs_up', 'thumbs_down', 'profesion', 'country', 'city', 'username')->get();
    	}else{
    		$workers = DB::table('users')->where([['city', $city], ['country', $country]])->orWhere([['city', $country], ['country', $city]])->select('first_name', 'familly_name', 'user_img', 'thumbs_up', 'thumbs_down', 'profesion', 'country', 'city', 'username')->get();
    	}


    	$jobWords = explode(' ', $job);
    	if(!in_array($job, $jobWords)){
    		array_unshift($jobWords, $job);
    	}
    	

    	$array = [];
    	if(strlen($job) > 0){
		  $exist = [];
		  for ($i=0; $i < count($jobWords); $i++) {
			for ($j=0; $j < count($workers); $j++) { 
				if (strpos(strtolower($workers[$j]->profesion), strtolower($jobWords[$i])) !== false) {
					if(!in_array($workers[$j]->username, $exist)){
						array_push($array, $workers[$j]);
						array_push($exist, $workers[$j]->username);
					}
				}
			}
		  }
    	}else{
    		$array = $workers;
    	}
    	return json_encode($array);    	
    }
}
