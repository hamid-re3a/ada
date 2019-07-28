<?php

use App\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services= [
            ["id"=> 0, "name"=> "آروماتراپی", "description"=> "ماساژ روغن گیاهی معطر", "duration"=> "60", "cost"=> "160,000"],
            ["id"=> 1, "name"=> "تای ماساژ سنتی", "description"=> "", "duration"=> "60", "cost"=> "170,000"],
            ["id"=> 2, "name"=> "ماساژ تلفیقی", "description"=> "تای ماساژ - آروما - ماساژ پا", "duration"=> "60", "cost"=> "200,000"],
            ["id"=> 3, "name"=> "ماساژ پا", "description"=> "", "duration"=> "60", "cost"=> "150,000"],
            ["id"=> 4, "name"=> "سنگ داغ", "description"=> "", "duration"=> "60", "cost"=> "180,000"],
            ["id"=> 5, "name"=> "سوئدی", "description"=> "", "duration"=> "60", "cost"=> "180,000"],
            ["id"=> 6, "name"=> "ماساژ ورزشی", "description"=> "", "duration"=> "60", "cost"=> "190,000"],
            ["id"=> 7, "name"=> "فورهند ماساژ", "description"=> "", "duration"=> "60", "cost"=> "250,000"],
            ["id"=> 8, "name"=> "ماساژ و پاکسازی صورت", "description"=> "", "duration"=> "60", "cost"=> "170,000"],
            ["id"=> 9, "name"=> "ماساژ شمع", "description"=> "", "duration"=> "60", "cost"=> "250,000"],
        ];
        $poolServices = [
            ["id"=> 10, "name"=> "آروماتراپی", "description"=> "ماساژ روغن گیاهی معطر", "duration"=> "60", "cost"=> "110,000"],
            ["id"=> 11, "name"=> "آروماتراپی", "description"=> "ماساژ روغن گیاهی معطر", "duration"=> "30", "cost"=> "60,000"],
            ["id"=> 12, "name"=> "حمام سنتی", "description"=> "", "cost"=> "35,000"],
            ["id"=> 13, "name"=> "حمام سنتی ", "description"=> "به همراه اسکرایپ بدن", "cost"=> "50,000"],
        ];
        $courses= [
            ["id"=> 14, "name"=> "کاربر ماساژ", "description"=> "", "cost"=> "24,500,000"],
            ["id"=> 15, "name"=> "ماساژ سنگ", "description"=> "", "cost"=> "15,400,000"],
            ["id"=> 16, "name"=> "ماساژ سوئدی", "description"=> "", "cost"=> "13,600,000"],
            ["id"=> 17, "name"=> "ماساژ آروماتراپی", "description"=> "", "cost"=> "13,800,000"],
            ["id"=> 18, "name"=> "ماساژ بافت عمقی", "description"=> "", "cost"=> "13,600,000"],
            ["id"=> 19, "name"=> "ماساژ شمع", "description"=> "", "cost"=> "14,000,000"],
            ["id"=> 20, "name"=> "ماساژ تای", "description"=> "", "cost"=> "16,600,000"],
            ["id"=> 21, "name"=> "ماساژ رفلکسولوژی", "description"=> "", "cost"=> "15,200,000"],
            ["id"=> 22, "name"=> "ماساژ کمپرس گیاهی", "description"=> "", "cost"=> "15,000,000"],
            ["id"=> 23, "name"=> "ماساژ ایرانی", "description"=> "", "cost"=> "15,200,000"],
        ];

        foreach($services as $service){
//            $item = new Service();
            $item = Service::create($service);
            $item->id = $service["id"];
//            var_dump($service);
//            DB::table('services')->insert($service);
            $item->type = "ordinary";
            $item->save();

        }
        foreach($poolServices as $service){
            $item = Service::create($service);
            $item->id = $service["id"];
            $item->type = "pool";
            $item->save();
        }
        foreach($courses as $service){
            $item = Service::create($service);
            $item->id = $service["id"];
            $item->type = "course";
            $item->save();
        }
    }
}
