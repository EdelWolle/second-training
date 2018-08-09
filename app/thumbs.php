<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class thumbs extends Model
{
    protected $fillable = [
        'user', 'worker', 'action_type', 
    ];
}
