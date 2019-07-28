<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activation_code extends Model
{
    protected $fillable = [
        'activation_code','sent'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
