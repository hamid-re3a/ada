<?php

namespace App\Http\Controllers;
use App\Http\Controllers\api\v1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

use Validator;

class BankTransactionsController extends AuthController
{
    
    private $api = 'd59f6c80792052d90fd33212418479ec';
    private $redirect = 'http://www.reservina.ir/paid';
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function add_money(Request $request)
    {

        // isset($request->shop_service_id)
        // check if request id is set with the request
        // and validate if it's a valid number

        if(!($user = $this->loggedInUserOrFail())){
            return $this->respondBadRequest('شما حق ندارید');
        }
        
        $rules = array(
            'amount' => array('required','integer','min:1000'),
        );

        $messages = [
            'amount.required' => 'لطفا فیلد amount را ارسال کنید',
            'amount.integer'=> 'فیلد amount باید یک عدد معتبر باشد',
            'amount.min' => 'فیلد amount باید حداقل 1000 باشد'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return $this->respondBadRequest($validator->errors()->first());
        }
        
        $transaction_obj = $user->bank_transactions()->create(['amount'=>$request->amount,'for_user_id'=>$user->id]);
        $factorNumber = $transaction_obj->id;
        $response = $this->send($this->api, $request->amount, $this->redirect, $factorNumber);
        
        
        $status = $response->status ?? null;
        $trans_id = $response->transId ?? null;
        
        if($status == 1 && $trans_id != null){
            $transaction_obj->trans_id = $trans_id;
            $transaction_obj->save();
            
            return $this->respondSuccessfully('عملیات با موفقیت انجام شد',["url"=>"https://pay.ir/payment/gateway/$trans_id"]);
        }
        
        
        return $this->respondBadRequest('دوباره تلاش کنید');
    }
    
    public function paid(Request $request){
        
        $rules = array(
            'factorNumber' => array('required','exists:bank_transactions,id'),
            'status' => array('required','integer','max:1'),
            'mobile' => array('integer'),
            'cardNumber' => array('string'),
            'message' => array('string'),
        );
        
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->respondBadRequest('دوباره تلاش کنید');
        }
        $bank_transaction_obj = Bank_transaction::find($request->factorNumber);
        
        $bank_transaction_obj->status = $request->status;
        $bank_transaction_obj->card_no = $request->cardNumber ?? '';
        $bank_transaction_obj->message = $request->message ?? '';
        // $bank_transaction_obj->mobile = $request->mobile ?? '';
        $bank_transaction_obj->save();
        
        //Todo redirect to aproprate link
        if($request->status == 1){
            $reserve_obj = Reserve_request::find($bank_transaction_obj->reserve_request_id);
            if(isset($reserve_obj->id)){
                $this->deleteReserves($reserve_obj);
                $reserve_obj->is_paid = 1;
                $reserve_obj->save();
                
                try{
                    $personnel_service = Shop_service::actived()->find($reserve_obj->shop_service_id);
                    $personnel = Personnel::actived()->find($personnel_service->personnel->id);
                    //$shop = Shop::actived()->find($personnel->shop_id);
                } catch (\Exeception $e) {
                    return $this->respondBadRequest('دوباره تلاش کنید');
                }
                
                
                Notifications::create(['from_user_id'=>$reserve_obj->user_id,'to_user_id' => $personnel->user_id, 'type' => 'reserve_request', 'feedback_id' => $reserve_obj->id, 'message' => "درخواست رزرو برای سرویس شما انجام شده است"]);
                
            }
            return $this->respondSuccessfully('مبلغ مورد نظر پرداخت شد');
        }
        else
            return $this->respondBadRequest('پرداخت انجام نشد!!!');
    }
    
    public function verify_transaction(Request $request){
        
        $rules = array(
            'trans_id' => array('required','exists:bank_transactions,trans_id'),
        );
        
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $this->respondBadRequest('دوباره تلاش کنید');
        }
        
        
        
        $bank_transaction_obj = Bank_transaction::where('trans_id',$request->trans_id)->first();
        
        if($bank_transaction_obj->status === 0 || $bank_transaction_obj->status === 1){
            return $this->respondSuccessfully('پاسخ دریافت شد',['status'=>$bank_transaction_obj->status , 'transId'=>$bank_transaction_obj->trans_id]);
        }
        $response = $this->verify($this->api, $request->trans_id);
        $bank_transaction_obj->status = $response->status;
        $bank_transaction_obj->save();
        return $this->respondSuccessfully('پاسخ دریافت شد',$response);
    }
    
    public function reserve_transaction(Request $request)
    {

        // isset($request->shop_service_id)
        // check if request id is set with the request
        // and validate if it's a valid number

        if(!($user = $this->loggedInUserOrFail())){
            return $this->respondBadRequest('شما حق ندارید');
        }
        
        $rules = array(
            'reserve_request_id' => array('required','exists:reserve_requests,id'),
            'from_remaining_money' => array('boolean'),
        );

        $messages = [
            'reserve_request_id.required' => 'لطفا فیلد reserve_request را ارسال کنید',
            'reserve_request_id.exists' => 'این رزرو وجود ندارد',
            'from_remaining_money.boolean' => 'مقدار معتبر برای حساب ارسال کنید'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return $this->respondBadRequest($validator->errors()->first());
        }
        
        
        
        
        $reserve_obj = $user->reserve_requests()->find($request->reserve_request_id);
        
        if(!isset($reserve_obj->id)){
            return $this->respondBadRequest('این رزرو برای شما نیست');
        }
        
        if($reserve_obj->is_paid == 1){
            return $this->respondSuccessfully('مبلغ این رزرو قبلا پرداخت شده است');
        }
        
        $rules = array(
            'date' => array('required', 'date', 'after:yesterday'),
            'start_time' => array('required', 'regex:/^(?:(?:0|1)[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'),
        );

        $messages = [
            'date.required' => 'لطفا فیلد روز را وارد کنید',
            'date.after' => 'زمان این رزرو گذشته است!!!',
            'date.date' => 'یک روز معتبر ارسال کنید',
            'start_time.required' => 'لطفا فیلد زمان شروع را ارسال کنید',
            'start_time.regex' => 'یک زمان معتبر وارد کنید',
        ];

        $validator = Validator::make(['date'=>$reserve_obj->date, 'start_time'=>$reserve_obj->start_time], $rules, $messages);

        if ($validator->fails()) {
            return $this->respondBadRequest($validator->errors()->first());
        }
        
        
        try{
            $personnel_service = Shop_service::actived()->find($reserve_obj->shop_service_id);
            $personnel = Personnel::actived()->find($personnel_service->personnel->id);
            $shop = Shop::actived()->find($personnel->shop_id);
        } catch (\Exeception $e) {
            return $this->respondBadRequest('دوباره تلاش کنید');
        }
        
        $amount = 0;
        if($reserve_obj->payment_type == 0 && $shop->free_reservation == 1) {
            return $this->respondBadRequest('این رزرو به صورت پرداخت در محل انجام شده است');
        } else if($reserve_obj->payment_type == 1) {
            $amount = $reserve_obj->service_price*10/100;
        } else if($reserve_obj->payment_type == 2) {
            $amount = $reserve_obj->service_price;
        } else {
            return $this->respondBadRequest('روش پرداخت صحیح انتخاب نشده است');
        }
        
        if($amount < 1000)
            $amount = 1000;
        
        
        // from remaining money
        if(isset($request->from_remaining_money) && $request->from_remaining_money == 1){
            
            $user_bank_data_obj = Bank_data::firstOrCreate(['user_id'=>$user->id]);
            
            $sum = (int) $user->bank_income_transactions()->paid()->sum('amount');
            $remaining = $sum ;
            
            $user_bank_data_obj->remaining_money = $remaining;
            $user_bank_data_obj->save();
        
            
            
            if($remaining > $amount){
                $firstGet = $user->bank_transactions()->create(['amount'=> -1 * abs($amount),'for_user_id'=>$user->id]);
                $firstGet->status = 1;
                $firstGet->save();
                
                $transaction_obj = $user->bank_transactions()->create(['amount'=>$amount,'for_user_id'=>$shop->user_id,'reserve_request_id'=>$reserve_obj->id,'deadline'=>$reserve_obj->date . ' ' .$reserve_obj->start_time]);
                $transaction_obj->status = 1;
                $transaction_obj->save();
                $reserve_obj->is_paid = 1;
                $reserve_obj->save();
                $this->deleteReserves($reserve_obj);
                $user->notification_sent()->create(['to_user_id' => $personnel->user_id, 'type' => 'reserve_request', 'feedback_id' => $reserve_obj->id, 'message' => "درخواست رزرو برای سرویس شما انجام شده است"]);
                return $this->respondSuccessfully('تراکنش شما با موفقیت انجام شد');
            } else {
                return $this->respondBadRequest('حساب شما مبلغ مورد نظر را دارا نمی باشد');
            }
            
        }
        
        
        $transaction_obj = $user->bank_transactions()->create(['amount'=>$amount,'for_user_id'=>$shop->user_id,'reserve_request_id'=>$reserve_obj->id,'deadline'=>$reserve_obj->date . ' ' .$reserve_obj->start_time]);
        
        if($transaction_obj->trans_id != null ){
            return $this->respondSuccessfully('عملیات با موفقیت انجام شد',["url"=>"https://pay.ir/payment/gateway/$transaction_obj->trans_id"]);
        }
        
        $factorNumber = $transaction_obj->id;
        $response = $this->send($this->api, $amount, $this->redirect, $factorNumber);
        
        $status = $response->status ?? null;
        $trans_id = $response->transId ?? null;
        
        if($status == 1 && $trans_id != null){
            $transaction_obj->trans_id = $trans_id;
            $transaction_obj->save();
            
            return $this->respondSuccessfully('عملیات با موفقیت انجام شد',["url"=>"https://pay.ir/payment/gateway/$trans_id"]);
        }
        
        
        return $this->respondBadRequest('دوباره تلاش کنید');
    }
    
    public function deleteReserves($reserve){
                    
            $not_paid_reserves = Reserve_request::where('id','!=',$reserve->id)->where('shop_service_id', $reserve->shop_service_id)->where('date',$reserve->date)->where('start_time',$reserve->start_time)->where('is_paid' , 0)->get();
            foreach($not_paid_reserves as $ress){
                $ress->is_accepted = 3;
                $ress->save();
                
            }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::find($id);
        $article_tag = $article->tags;

        if ( ! count($article_tag) )
        {
            return $this->respondNotFound('There is no tag for this Article');
        }

        return $this->respondSuccessfully('Tags are successfully received',$article_tag);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article_tag = Article_tag::find($id); // Without Binding - Method should have $id param

        if ( ! count($article_tag) )
        {
            return $this->respondBadRequest('There is no tag for this Article');
        }
        $article_tag->delete();
        return $this->respondSuccessfully('Article tag successfully deleted');
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
