<?php

namespace Epsilon\Models;

use Illuminate\Database\Eloquent\Model;

class TypeClient extends Model
{
    protected $table = 'typesclients';
    protected $primaryKey = 'idTypeClient';
    public $timestamps = false;
}
