<?php

namespace App\GraphQL\Mutations;

use App\Product;

class CreateProduct
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
        if(!empty($file)){
            $path= $file->storePublicly('uploads', ['disk' => 'public']);
        }
    
        return Product::create([
            'name' => $args['name'],
            'sku' => $args['sku'],
            'quantity' => $args['quantity'],           
            'image' => $path,
            'category_id' => $args['category_id'],
            'sub_category_id' => $args['sub_category_id']
        ]);
      

    }
}

