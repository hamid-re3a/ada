<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','phone_number','username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'phone_number_verified_at' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function findForPassport($phone_number) {
        return $this->where('phone_number', $phone_number)->first();
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function setPhoneNumberAttribute($value)
    {
        preg_match('/^[ ]*(?:0|\+|00)?(?:98)?9(\d{9})[ ]*$/',$value,$number);
        $number = '09'.$number[1];


        $this->attributes['phone_number'] = $number;
    }
}
