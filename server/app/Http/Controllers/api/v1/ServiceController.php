<?php

namespace App\Http\Controllers\api\v1;

use App\Service;
use App\ServiceProvider;
use App\Reservina\Transformers\ServiceProviderTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Class ServiceProviderController
 * @package App\Http\Controllers\api\v1
 */
class ServiceController extends ApiController
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return Service::all();
    }


}
