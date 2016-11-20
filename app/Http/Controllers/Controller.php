<?php

namespace Epsilon\Http\Controllers;

use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Carbon\Carbon;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function Soap()
    {
        SoapWrapper::add(function ($service) {
            $service
                ->name('placetopay')
                ->wsdl("https://test.placetopay.com/soap/pse/?wsdl")
                ->trace(true)
                ->cache(WSDL_CACHE_DISK);
        });
    }

    public function Auth()
    {
        $tranKey = '024h1IlD';
        $seed = date('c');
        $hashString = sha1($seed . $tranKey, false);
        $auth = [
            'login' => '6dd490faf9cb87a9862245da41170ff2',
            'seed' => $seed,
            'tranKey' => $hashString
        ];
        return $auth;
    }

    public function _PrintTableAll($Array)
    {
        $Table = '<table id="' . $Array['idtable'] . '" class="table table-hover table-striped">
                    <thead>
                    <tr>';
        for ($i = 0; $i < count($Array['Tittles']); $i++) {
            $Table .= '<th><strong>' . $Array['Tittles'][$i] . '</strong></th>';
        }
        $Table .= '</tr>
                </thead>
                <tbody>';
        $con = 0;
        $Clase = $Array['Class'];
        foreach ($Array['Data'] as $Dato) {
            $Table .= '<tr class="' . $Clase[$con] . '">';
            for ($i = 0; $i < count($Dato); $i++) {
                $Table .= '<td>' . $Dato[$i] . '</td>';
            }
            $Table .= '</tr>';
            $con = $con + 1;
        }
        $Table .= '</tbody></table>';
        return $Table;
    }

}
