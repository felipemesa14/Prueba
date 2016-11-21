<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    protected $table = 'buyers';
    protected $primaryKey = 'document';
    public $timestamps = false;
}
