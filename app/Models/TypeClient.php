<?php

namespace PlacetoPay\Models;

use Illuminate\Database\Eloquent\Model;

class TypeClient extends Model
{
    protected $table = 'typesclients';
    protected $primaryKey = 'idTypeClient';
    public $timestamps = false;
}
