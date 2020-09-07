<?php

namespace App\GraphQL\Mutations;

use App\Product;

class UpdateProduct
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     *
     * @return string
     */
    public function __invoke($_, array $args)
{       $file = $args['image'];    
         $path= $args['image'];
         $update=[ 
            'name' => $args['name'],
            'sku' => $args['sku'],
            'quantity' => $args['quantity'],          

            'category_id' => $args['category_id'],
            'sub_category_id' => $args['sub_category_id']            
      ];
        if(!empty($file)){
            $path= $file->storePublicly('uploads', ['disk' => 'public']);
            $update['image']=$path;
      }
     
        Product::where('id',$args['id'])->update($update);    
      
      return Product::find($args['id']);

      

    }
}


