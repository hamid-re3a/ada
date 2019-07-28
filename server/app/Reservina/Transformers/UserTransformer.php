<?php
/**
 * Created by PhpStorm.
 * User: saeed
 * Date: 1/20/2019
 * Time: 1:32 PM
 */

namespace App\Reservina\Transformers;


class UserTransformer extends Transformer
{

    public function transform($user)
    {
        return [
            'name' => $user['name'],
            'phone_number' => $user['phone_number']
        ];
    }
}