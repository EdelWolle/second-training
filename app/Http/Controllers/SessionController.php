<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\User;

class SessionController extends Controller
{

	public function __construct(){
		
	}

    public function getSession(Request $request)
    {
    	$user = Auth::user();
        if(!$user){
            return json_encode(array(
            'username'=> '',
            'first_name'=> '',
            'familly_name'=> '',
            'country'=> '',
            'city'=> '',
            'user_img'=> '',
            'user_back_img'=> '',
            'skills'=> '',
            'profession'=> '',
            'phone'=> '',
            'bio'=> '',
            'phone_show'=> '',
            'contact_email'=> '',
            'thumbs_up'=> '',
            'thumbs_down'=> '',
            'work_status'=> ''
          ));
        }
    	return json_encode(array(
    		'username'=> $user->username,
    		'first_name'=> $user->first_name,
    		'familly_name'=> $user->familly_name,
    		'country'=> $user->country,
    		'city'=> $user->city,
    		'user_img'=> $user->user_img,
            'user_back_img'=> $user->user_back_img,
    		'skills'=> explode("$$", $user->skills),
    		'profession'=> $user->profesion,
    		'phone'=> $user->phone,
            'phone_show'=> $user->phone_show,
            'contact_email'=> $user->contact_email,
            'bio'=> $user->bio,
    		'thumbs_up'=> $user->thumbs_up,
            'thumbs_down'=> $user->thumbs_down,
    		'work_status'=> $user->work_status
    	));
    }

    public function getProfilData(Request $request)
    {
        $data = $request->json()->all();
        $username = $data['username'];
        $user = app(User::class)->where('username', $username)->first();

        $light = '';

        $auth_user = Auth::user();
        if($auth_user){
            $action_type = DB::table('thumbs')->where([
                ['user', $auth_user->id],
                ['worker', $user->id]
            ])->value('action_type');
            if(DB::table('thumbs')->where([ ['user', $auth_user->id], ['worker', $user->id] ])->exists()){
                if($action_type == 0){
                    $light = 'dark';
                }else if($action_type == 1){
                    $light = 'light';
                }
            }
        }

        if(!$user){
            return json_encode(false);
        }
        return json_encode(array(
            'username'=> $user->username,
            'first_name'=> $user->first_name,
            'familly_name'=> $user->familly_name,
            'country'=> $user->country,
            'city'=> $user->city,
            'user_img'=> $user->user_img,
            'user_back_img'=> $user->user_back_img,
            'skills'=> explode("$$", $user->skills),
            'profession'=> $user->profesion,
            'bio'=> $user->bio,
            'phone'=> $user->phone,
            'phone_show'=> $user->phone_show,
            'contact_email'=> $user->contact_email,
            'thumbs_up'=> $user->thumbs_up,
            'thumbs_down'=> $user->thumbs_down,
            'work_status'=> $user->work_status,
            'light' => $light
        ));
    }

    public function thumbs(Request $request)
    {
        $user = Auth::user();
        if($user){
            $data = $request->json()->all();
            $username = $data['username'];
            $action = $data['action'];


            $worker = app(User::class)->where('username', $username)->first();
            if(!$worker){
                return json_encode(false);
            }
            if($user->username == $worker->username){
                return json_encode(false);
            }

            if(DB::table('thumbs')->where([ ['user', $user->id], ['worker', $worker->id] ])->exists()){
                $action_type = DB::table('thumbs')->where([
                    ['user', $user->id],
                    ['worker', $worker->id]
                ])->value('action_type');

                if($action == 1){
                    if($action_type == 1){
                        DB::table('thumbs')->where([
                            ['user', $user->id],
                            ['worker', $worker->id]
                        ])->delete();
                        $worker->thumbs_up = ($worker->thumbs_up - 1);
                    }else if($action_type == 0){
                        DB::table('thumbs')->where([
                            ['user', $user->id],
                            ['worker', $worker->id]
                        ])->update(['action_type' => 1]);
                        $worker->thumbs_up = ($worker->thumbs_up + 1);
                        $worker->thumbs_down = ($worker->thumbs_down - 1);
                    }
                }else if($action == 0){
                    if($action_type == 0){
                        DB::table('thumbs')->where([
                            ['user', $user->id],
                            ['worker', $worker->id]
                        ])->delete();
                        $worker->thumbs_down = ($worker->thumbs_down - 1);
                    }else if($action_type == 1){
                        DB::table('thumbs')->where([
                            ['user', $user->id],
                            ['worker', $worker->id]
                        ])->update(['action_type' => 0]);
                        $worker->thumbs_up = ($worker->thumbs_up - 1);
                        $worker->thumbs_down = ($worker->thumbs_down + 1);
                    }
                }
            }else{
                if($action == 1){
                    DB::table('thumbs')->insert(
                        ['user' => $user->id, 'worker' =>  $worker->id, 'action_type' => 1]
                    );
                    $worker->thumbs_up = ($worker->thumbs_up + 1);
                }else if($action == 0){
                    DB::table('thumbs')->insert(
                        ['user' => $user->id, 'worker' =>  $worker->id, 'action_type' => 0]
                    );
                    $worker->thumbs_down = ($worker->thumbs_down + 1);
                }
            }

            $worker->save();
            return json_encode(true);
        }
        return json_encode(false);
    }

    public function updatesession(Request $request)
    {
        $user = Auth::user();
        if($user){

            $data = $request->json()->all();
        if(strlen($data['first_name']) <= 70 && strlen($data['familly_name'])<=70 && strlen($data['country']) <= 70 && strlen($data['city'])<=70 && strlen($data['bio']) <= 5000 && strlen($data['profession']) <= 200 && strlen($data['phone']) <= 20){

            //first name
            if(strlen($data['first_name']) > 0){
                $user->first_name = $data['first_name'];
            }

            //familly name
            if(strlen($data['familly_name']) > 0){
                $user->familly_name = $data['familly_name'];
            }

            //profession
            if(!is_null($data['profession']) && strlen($data['profession']) > 0){
                $user->profesion = $data['profession'];
            }

            //phone
            if(isset($data['phone']) && !empty($data['phone'])){
                $user->phone = $data['phone'];
            }

            //phone_show
            if(isset($data['phone_show']) && !empty($data['phone_show'])){
                $user->phone_show = $data['phone_show'];
            }

            //contact emailm
            if(isset($data['contact_email']) && !empty($data['contact_email'])){
                $user->contact_email = $data['contact_email'];
            }

            //city
            if(isset($data['city']) && strlen($data['city']) > 0){
                $user->city = $data['city'];
            }

            //country
            if(isset($data['country']) && !empty($data['country']) && strlen($data['country']) > 0){
                $user->country = $data['country'];
            }

            //skills
            $user->skills = implode("$$", $data['skills']);
            
            //bio
            if(isset($data['bio']) && !empty($data['bio']) && strlen($data['bio']) > 0){
                $user->bio = $data['bio'];
            }

            //user_back_image updating
            $user_back_img = $data['user_back_img'];
            if(!is_null($user_back_img) && $user_back_img!='null' && strlen($user_back_img)>0){
                $file_name = 'image_'.str_r&&om(15).time().'.png';
                $user_back_img = str_replace('data:image/png;base64,', '', $user_back_img);
                $user_back_img = str_replace(' ', '+', $user_back_img);
                if($user_back_img!=""){
                    \Storage::disk('public')->put('images/'.$file_name,base64_decode($user_back_img));
                    if($user->user_back_img != "1uBpG3o.jpg"){
                        \Storage::disk('public')->delete('images/'.$user->user_back_img);  
                    }
                    $user->user_back_img = $file_name;  
                }
            }

            //user_image updating
            $user_img = $data['user_img'];
            if(!is_null($user_img) && $user_img!='null' && strlen($user_img)>0){
                $file_name = 'image_'.str_r&&om(15).time().'.png';
                $user_img = str_replace('data:image/png;base64,', '', $user_img);
                $user_img = str_replace(' ', '+', $user_img);
                if($user_img!=""){
                    \Storage::disk('public')->put('images/'.$file_name,base64_decode($user_img));
                    if($user->user_img != "user_img.jpg"){
                        \Storage::disk('public')->delete('images/'.$user->user_img);  
                    }
                    $user->user_img = $file_name;
                }
            }

            $user->save();

            if( ((!empty($user->phone) && !empty($user->phone_show) || !empty($user->contact_email)) && !empty($user->profesion) )){
                $user->work_status = 1;
            }else{
                $user->work_status = 0;
            }

            $user->save();
            
            return json_encode(array(
            'username'=> $user->username,
            'first_name'=> $user->first_name,
            'familly_name'=> $user->familly_name,
            'country'=> $user->country,
            'city'=> $user->city,
            'user_img'=> $user->user_img,
            'user_back_img'=> $user->user_back_img,
            'skills'=> explode("$$", $user->skills),
            'profession'=> $user->profesion,
            'bio'=> $user->bio,
            'phone'=> $user->phone,
            'phone_show'=> $user->phone_show,
            'contact_email'=> $user->contact_email,
            'thumbs_up'=> $user->thumbs_up,
            'thumbs_down'=> $user->thumbs_down,
            'work_status'=> $user->work_status
        )); 
        }
    }
    }
}
