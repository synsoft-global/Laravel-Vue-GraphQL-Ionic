<?php

namespace App\Http\GraphQL\Mutations;

use App\Product;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DeleteProduct
{
    public function resolve($rootValue, array $args, GraphQLContext $context)
    {
      // $imagePath->storePublicly('uploads', ['disk' => 'public']);

        return Product::create([
            'name' => $args['name'],
            'sku' => $args['sku'],
            'quantity' => $args['quantity'],           
            'image_url' => $args['image_url']
        ]);

    }
}

