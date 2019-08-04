<?php

namespace App\Http\Controllers\api\v1;

use App\Order;
use App\Service;
use App\ServiceProvider;
use App\Reservina\Transformers\ServiceProviderTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Class ServiceProviderController
 * @package App\Http\Controllers\api\v1
 */
class OrderController extends AuthController
{


    public function store(Request $request)
    {
        if(!($user = $this->loggedInUserOrFail())){
            return $this->respondBadRequest('شما حق ندارید');
        }


        $rules = array(
            'gender' => array('required', 'in:male,female'),
            'phone_number' => array('required'),
            'date' => array('required'),
            'time' => array('required','number','max:20'),
            'service_id' => array('required','exists:services'),
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return $this->respondBadRequest($validator->errors()->first());
        }
        $track_number = mt_rand(1000000, 9999999);
        $input = $request->only('phone_number', 'gender', 'service_id','date','time');
        $input['status'] = "waiting";
        $input['track_number'] = $track_number;
        Order::create($input);

        $response = " درخواست شما با کد پیگیری ${track_number} با موفقیت ثبت شد، لطفا منتظر بمانید ";

        $this->sendSMS($user->phone_number,$response );
        return $this->respondSuccessfully($response);

    }

    public function update(Request $request)
    {
        if(!($user = $this->loggedInUserOrFail())){
            return $this->respondBadRequest('شما حق ندارید');
        }
        if($user->username != "admin"){
            return $this->respondBadRequest('شما حق ندارید');
        }


        $rules = array(
            'track_number' => array('required'),
            'status' => array('required','in:approved,canceled'),
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return $this->respondBadRequest($validator->errors()->first());
        }

        $order = Order::where('track_number',$request->track_number);
        $order->status = $request->status;
        $order->save();
        $track_number = $request->track_number;
        if($order->status == "approved"){
            $response = " رزرو  شما با شماره پیگیری ${track_number}   قبول شده است ";
        } else {
            $response = " رزرو  شما با شماره پیگیری ${track_number}   رد است ";
        }

        $this->sendSMS($order->user->phone_number,$response );
        return $this->respondSuccessfully($response);

    }
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        if(!($user = $this->loggedInUserOrFailWithoutActivation())){
            return $this->respondBadRequest('شما حق ندارید');
        }
        return $user->orders;
    }


}
