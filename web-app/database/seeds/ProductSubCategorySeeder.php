<?php

use Illuminate\Database\Seeder;

class ProductSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sub_category=[
            [               
				"name"=>"Test Sub Cat 1",      
            
            ],
            [
                "name"=>"Test Sub Cat 2",
            ],
            [
                "name"=>"Test Sub Cat 3",
                
            ]           
            
        ];

		DB::table('product_sub_categories')->insert($sub_category); 
    }
}
