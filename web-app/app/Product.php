<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'image',
        'quantity',
        'sku',
        'category_id',
        'sub_category_id'
    ];


    /**
     * Get the user that owns the comment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product_category()
    {
        return $this->belongsTo('App\ProductCategory','category_id');
        
    }

    /**
     * Get the user that owns the comment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product_sub_category()
    {
        return $this->belongsTo('App\ProductSubCategory','product_sub_category');
    }
}
