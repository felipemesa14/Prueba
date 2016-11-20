<?php

namespace Epsilon\Http\Controllers;

use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Carbon\Carbon;
use Epsilon\Models\Buyer;
use Epsilon\Models\pay;
use Epsilon\Models\Payer;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function SaveClient($Document, $TypeDocument, $firstName, $lastName, $DocumentBuyer, $TypeDocumentBuyer, $firstNameBuyer, $lastNameBuyer, $emailAddress, $typeClient)
    {
        $ConsulPayer = Payer::find($Document);
        if (count($ConsulPayer) == 0) {
            $Payer = new Payer();
            $Payer->document = $Document;
        } else {
            $Payer = $ConsulPayer;
            $Payer->document = $Document;
        }
        $Payer->documentType = $TypeDocument;
        $Payer->firstName = $firstName;
        $Payer->lastName = $lastName;
        $Payer->idTypeClient = $typeClient;
        $Payer->emailAddress = $emailAddress;
        $Payer->save();
        //Validar si comprador se ingreso correctamente
        if ($DocumentBuyer != "") {
            $Buyer = new Buyer();
            $Buyer->document = $DocumentBuyer;
            $Buyer->documentType = $TypeDocumentBuyer;
            $Buyer->firstName = $firstNameBuyer;
            $Buyer->lastName = $lastNameBuyer;
            $Buyer->save();
        }
    }

    public function SavePay($reference, $Description, $currency, $totalAmount, $Document, $DocumentBuyer)
    {
        $ConsultPay = pay::find($reference);
        if (count($ConsultPay) == 0) {
            $Pay = new pay();
            $Pay->reference = $reference;
        } else {
            $Pay = $ConsultPay;
            $Pay->reference = $reference;
        }
        $Pay->description = $Description;
        $Pay->currency = $currency;
        $Pay->totalAmount = $totalAmount;
        $Pay->payer = $Document;
        $Pay->buyer = $DocumentBuyer;
        $Pay->save();
    }

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

    public function getBankList()
    {
        $auth = $this->Auth();
        $this->Soap();
        $getBankList = '';
        SoapWrapper::service('placetopay', function ($service) use ($auth, &$getBankList) {
            $getBankList = $service->call('getBankList', array(['auth' => $auth]));
        });
        return $getBankList = json_decode(json_encode($getBankList), true);
    }

    public function createTransactionSoap($arrayPay)
    {
        $auth = $this->Auth();
        $this->Soap();
        $createTransacction = '';
        SoapWrapper::service('placetopay', function ($service) use ($auth, &$createTransacction, &$arrayPay) {
            $createTransacction = $service->call('createTransaction', array(['auth' => $auth, 'transaction' => $arrayPay]));
        });
        return $createTransacction = json_decode(json_encode($createTransacction), true);
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
