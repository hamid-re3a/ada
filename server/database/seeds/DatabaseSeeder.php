<?php

use Illuminate\Database\Seeder;
use App\Service;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Service::truncate();
        Eloquent::unguard();
         $this->call(ServiceTableSeeder::class);
    }
}
