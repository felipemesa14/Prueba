<?php

namespace PlacetoPay\Http\Controllers;

use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Carbon\Carbon;
use PlacetoPay\Models\Bank;
use PlacetoPay\Models\Buyer;
use PlacetoPay\Models\pay;
use PlacetoPay\Models\Payer;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /** Metodo para guardar los datos del cliente que realiza el pago en linea, recibe parametros necesarios para guardar o modificar de ser necesario
     * @param $Document
     * @param $TypeDocument
     * @param $firstName
     * @param $lastName
     * @param $DocumentBuyer
     * @param $TypeDocumentBuyer
     * @param $firstNameBuyer
     * @param $lastNameBuyer
     * @param $emailAddress
     */
    public function SaveClient($Document, $TypeDocument, $firstName, $lastName, $DocumentBuyer, $TypeDocumentBuyer, $firstNameBuyer, $lastNameBuyer, $emailAddress)
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

    /** Metodo para registrar los datos del pago, y de ser necesario actualizarlos al momento de realizar la transacción
     * @param $reference
     * @param $Description
     * @param $currency
     * @param $totalAmount
     * @param $Document
     * @param $DocumentBuyer
     * @param $bankCode
     * @param $bankInterface
     * @param $transactionID
     * @param $trazabilityCode
     */
    public function SavePay($reference, $Description, $currency, $totalAmount, $Document, $DocumentBuyer, $bankCode, $bankInterface, $transactionID, $trazabilityCode)
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
        $Pay->bankCode = $bankCode;
        $Pay->bankInterface = $bankInterface;
        $Pay->transactionID = $transactionID;
        $Pay->trazabilityCode = $trazabilityCode;
        $Pay->save();
    }

    /**
     * Soap para conectar al webservices de PlacetoPay
     */

    public function Soap()
    {
        SoapWrapper::add(function ($soap) {
            $soap
                ->name('placetopay')
                ->wsdl("https://test.placetopay.com/soap/pse/?wsdl")
                ->trace(true)
                ->cache(WSDL_CACHE_DISK);
        });
    }

    /** Datos de autenticación contra el servicio de PlacetoPay
     * @return array
     */

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

    /** Consumo de servicio bancos disponibles
     * @return mixed
     */
    public function getBankList()
    {
        //Consultar la ultima actualizacion del cacheo de los bancos
        $lastUpdate = new Carbon($Banks = Bank::all()->max('updated_at'));
        $today = new Carbon();
        if ($lastUpdate->toDateString() < $today->toDateString() || empty($Banks)) {
            $auth = $this->Auth();
            $this->Soap();
            $getBankList = '';
            SoapWrapper::service('placetopay', function ($soap) use ($auth, &$getBankList) {
                $getBankList = $soap->call('getBankList', array(['auth' => $auth]));
            });
            Bank::whereNotNull('bankCode')->delete();
            foreach ($getBankList->getBankListResult->item as $banks) {
                $CreateBanks = new Bank();
                $CreateBanks->bankCode = $banks->bankCode;
                $CreateBanks->bankName = $banks->bankName;
                $CreateBanks->save();
            }
        }
        return Bank::orderBy('bankName', 'asc')->get();
    }

    /** Metodo para consumir el servicio createTransaction Enviando todos los parametros necesarios para crear la transaccion
     * @param $arrayPay
     * @return mixed
     */

    public
    function createTransactionSoap($arrayPay)
    {
        $auth = $this->Auth();
        $this->Soap();
        $createTransacction = '';
        SoapWrapper::service('placetopay', function ($service) use ($auth, &$createTransacction, &$arrayPay) {
            $createTransacction = $service->call('createTransaction', array(['auth' => $auth, 'transaction' => $arrayPay]));
        });
        return $createTransacction;
    }

    /** Consumo del servicio para consultar el estado de la transaccion se envia como parametro el trannsactionID
     * @param $transactionID
     * @return mixed
     */
    public
    function getTransactionInformation($transactionID)
    {
        $auth = $this->Auth();
        $this->Soap();
        $getTransactionInformation = '';
        SoapWrapper::service('placetopay', function ($service) use ($auth, &$getTransactionInformation, &$transactionID) {
            $getTransactionInformation = $service->call('getTransactionInformation', array(['auth' => $auth, 'transactionID' => $transactionID]));
        });
        return $getTransactionInformation;

    }
}
