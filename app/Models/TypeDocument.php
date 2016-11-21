<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class TypeDocument extends Model
{
    protected $table = 'typesdocuments';
    protected $primaryKey = 'CodType';
    public $timestamps = false;
}
