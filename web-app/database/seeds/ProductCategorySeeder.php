<?php

use Illuminate\Database\Seeder;
Use App\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {       
     
        $categories=[
            [               
                "name"=>"Test Cat 1",      
                "sub_cat"=>[
                    [               
                        "name"=>"Test sub1 Cat 1",      
                    
                    ],
                    [
                        "name"=>"Test sub1 Cat 2",
                    ],
                    [
                        "name"=>"Test sub1 Cat 3",
                        
                    ] 
                ]
            
            ],
            [
                "name"=>"Test Cat 2",
                "sub_cat"=>[
                    [               
                        "name"=>"Test sub2 Cat 1",      
                    
                    ],
                    [
                        "name"=>"Test sub2 Cat 2",
                    ],
                    [
                        "name"=>"Test sub2 Cat 3",
                        
                    ] 
                ]
            ],
            [
                "name"=>"Test Cat 3",
                "sub_cat"=>[
                    [               
                        "name"=>"Test sub3 Cat 1",      
                    
                    ],
                    [
                        "name"=>"Test sub3 Cat 2",
                    ],
                    [
                        "name"=>"Test sub3 Cat 3",
                        
                    ] 
                ]
                
            ]           
            
        ];
        array_map(function($cat) {
			$cat_list = $cat;  
			unset($cat['sub_cat']);

           $cid = ProductCategory::updateorcreate(['name'=>$cat['name']],$cat); 

           $subCat = array_map(function($items) use($cid) {                     
	            return [
	                   'name' => $items['name'],
	                   'parent_id' => $cid->id           
	                ];
            },$cat_list['sub_cat']); 
            
            DB::table('product_categories')->insert($subCat);          
         
            
        }, $categories); 

	; 
    }
}
