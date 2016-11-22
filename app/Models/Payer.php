<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class Payer extends Model
{
    protected $table = 'payers';
    protected $primaryKey = 'document';
    public $timestamps = false;
    public function pay()
    {
        return $this->hasMany('PlacetoPay\Models\Payer', 'payer', 'document');
    }
}
