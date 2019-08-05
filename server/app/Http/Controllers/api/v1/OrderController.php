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
    private $api = 'test';
    private $redirect = 'http://www.adakspa.com/paid';
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
        $input = $request->only('phone_number', 'gender', 'service_id','date','time');
        $input['status'] = "waiting";
        $order = Order::create($input);

        $service_obj = Service::where('id', $request->service_id)->first();
        $price = str_replace(',','',$service_obj->cost);



        $response = $this->send($this->api, $price , $this->redirect, $order->id);


        $status = $response->status ?? null;
        $trans_id = $response->transId ?? null;

        if($status == 1 && $trans_id != null){
            $order->trans_id = $trans_id;
            $order->save();

            $message = " درخواست شما با کد پیگیری $order->id با موفقیت ثبت شد، لطفا نسبت به پرداخت وجه اقدام فرمایید ";
            $this->sendSMS($user->phone_number,$message );

            return $this->respondSuccessfully('عملیات با موفقیت انجام شد',["url"=>"https://pay.ir/payment/gateway/$trans_id"]);
        } else {
            $order->delete();
            return $this->respondCriticalError('درخواست شما با مشکل مواجه شد');
        }

    }

    public function verify_transaction_get(Request $request){

        $rules = array(
            'trans_id' => array('required','exists:orders,trans_id'),
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->respondBadRequest('دوباره تلاش کنید');
        }


        $order_obj = Order::where('trans_id',$request->trans_id)->first();

        $response = $this->verify($this->api, $request->trans_id);
        $order_obj->status = $response->status == 1 ? "paid" : "waiting";
        $order_obj->save();
        return $this->respondSuccessfully('پاسخ دریافت شد',$response);
    }

    public function verify_transaction($order_obj){

        if($order_obj->status === 0 || $order_obj->status === 1){
            return $this->respondSuccessfully('پاسخ دریافت شد',['status'=>$order_obj->status , 'transId'=>$order_obj->trans_id]);
        }
        $response = $this->verify($this->api, $order_obj->trans_id);
        $order_obj->status = $response->status == 1 ? "paid" : "waiting";
        $order_obj->save();
        return $order_obj->status;
    }
    public function paid(Request $request){

        $rules = array(
            'factorNumber' => array('required','exists:orders,id'),
            'status' => array('required','integer','max:1'),
            'mobile' => array('integer'),
            'cardNumber' => array('string'),
            'message' => array('string'),
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->respondBadRequest('دوباره تلاش کنید');
        }
        $order = Order::find($request->factorNumber);

        $status = $this->verify_transaction($order);
        if( $status == "paid") {
            $response = " رزرو  شما با شماره پیگیری $order->track_number   پرداخت شد. ";
            $this->sendSMS($order->user->phone_number,$response );
        }
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
    public function all()
    {
        return Order::tomorrow()->all()->paginate(20);
    }

    private function send($api, $amount, $redirect, $factorNumber=null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://pay.ir/payment/send');
        curl_setopt($ch, CURLOPT_POSTFIELDS,"api=$api&amount=$amount&redirect=$redirect&factorNumber=$factorNumber");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $res = curl_exec($ch);
        curl_close($ch);
        $result = (object) json_decode($res,true);
        return $result;
    }

    private function verify($api, $transId) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://pay.ir/payment/verify');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "api=$api&transId=$transId");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $res = curl_exec($ch);
        curl_close($ch);
        $result = (object) json_decode($res,true);
        return $result;
    }
}
