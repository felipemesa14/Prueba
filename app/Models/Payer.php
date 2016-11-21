<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class Payer extends Model
{
    protected $table = 'payers';
    protected $primaryKey = 'document';
    public $timestamps = false;
}
