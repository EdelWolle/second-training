<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'familly_name', 'email', 'country', 'city', 'status', 'phone_show', 'contact_email', 'activation_code', 'skills', 'profesion', 'bio', 'phone', 'thumbs_down', 'thumbs_up', 'work_status', 'username', 'user_img', 'user_back_img', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
