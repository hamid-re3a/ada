<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function scopeTomorrow($query)
    {
        $query->where('date', '=',date("Y-m-d",strtotime("+1 days")));
    }
}
