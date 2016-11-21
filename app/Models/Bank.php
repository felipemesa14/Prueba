<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    protected $table = 'banks';
    protected $primaryKey = 'codBank';
    public $timestamps = true;
}
