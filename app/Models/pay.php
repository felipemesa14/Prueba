<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class pay extends Model
{
    protected $table = 'pay';
    protected $primaryKey = 'reference';
    public $timestamps = false;
}
