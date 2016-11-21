<?php

namespace PlacetoPay\Http\Controllers\placetopay;

use Illuminate\Support\Facades\Session;
use PlacetoPay\Models\pay;
use PlacetoPay\Models\Payer;
use PlacetoPay\Models\TypeClient;
use PlacetoPay\Models\TypeDocument;
use Illuminate\Http\Request;
use PlacetoPay\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

class payment extends Controller
{
    /**
     * Vista crear transaccion
     * Diligenciando datos del cliente y datos del pago a relizar
     *
     */
    public function index()
    {
        $result = array();
        $result['TypesDocuments'] = TypeDocument::all();
        $result['reference'] = pay::all()->max('reference') + 1;
        $result['message'] = '';
        return view('Home.Home', $result);
    }

    /**
     * Return datos del cliente y datos del pago, para asi seleccionar tipo de banco
     *
     */
    public function RegisterTransaction(Request $request)
    {
        //Datos del Pagador
        $Document = $request->input('document');
        Session::put('currentUser', $Document);
        $TypeDocument = $request->input('TypeDocument');
        $firstName = $request->input('firstName');
        $lastName = $request->input('lastName');
        $emailAddress = $request->input('emailAddress');
        //Datos del Comprador
        $DocumentBuyer = $request->input('Buyerdocument');
        $TypeDocumentBuyer = $request->input('BuyerTypeDocument');
        $firstNameBuyer = $request->input('BuyerfirstName');
        $lastNameBuyer = $request->input('BuyerlastName');
        //Datos del pago
        $reference = $request->input('reference');
        session()->put('referencePay', $reference);
        $totalAmount = $request->input('totalAmount');
        $Description = $request->input('description');
        $currency = $request->input('currency');
        $typePay = $request->input('pse');
        try {
            DB::beginTransaction();
            //Guardar datos del pagador
            $this->SaveClient($Document, $TypeDocument, $firstName, $lastName, $DocumentBuyer, $TypeDocumentBuyer, $firstNameBuyer, $lastNameBuyer, $emailAddress);
            //Guardar datos del pago
            $this->SavePay($reference, $Description, $currency, $totalAmount, $Document, $DocumentBuyer, '', '', '', '');
            //Tipo de Cliente
            $TypesClients = TypeClient::all();
            DB::commit();
            //Datos de los bancos disponibles
            $getBankList = $this->getBankList();
            $ipAdress = $request->ip();
            if ($typePay == 1) {
                $descPay = 'Pago Debito - Cuenta Corriente';
                $img = 'pse.jpg';
            } else {
                $descPay = 'Pago tarjeta credito';
                $img = 'credit.jpg';
            }
            $result = array('document' => $Document, 'documentType' => $TypeDocument, 'firstName' => $firstName,
                'lastName' => $lastName, 'emailAddress' => $emailAddress, 'idAdress' => $ipAdress, 'currency' => $currency,
                'totalAmount' => $totalAmount, 'description' => $Description, 'reference' => $reference,
                'descPay' => $descPay, 'img' => $img, 'bankInterface' => $TypesClients, 'getBankList' => $getBankList);
            return view('Home.SetTransacction', $result);
        } catch (Exception $e) {
            DB::rollback();
            return view('Home.Home');
        }


    }

    /**
     * Creacion de la transaccion enviando parametros necesarios para el pago contra el banco
     */
    public function createTransacction(Request $request)
    {

        $document = $request->input('document');
        $bankInterface = $request->input('TypeClient');
        $bankCode = $request->input('BankList');
        $reference = $request->input('reference');
        //Consultar datos del pagador
        $client = Payer::find($document);
        //Consultar datos del pago
        $pay = pay::find($reference);
        $returnURL = 'https://' . $_SERVER['HTTP_HOST'] . '/PlacetoPay/VerifyTransaction/' . $reference;
        $userAgent = $request->header('User-Agent');
        $ipAddress = $request->ip();
        $arrayPayer = array('document' => $document, 'documentType' => $client->documentType, 'emailAddress' => $client->emailAddress,
            'firstName' => $client->firstName, 'lastName' => $client->lastName);
        $arrayPay = array('bankCode' => $bankCode, 'bankInterface' => $bankInterface, 'currency' => $pay->currency,
            'description' => $pay->description,
            'ipAddress' => $ipAddress, 'payer' => $arrayPayer, 'reference' => $reference, 'returnURL' => $returnURL,
            'totalAmount' => $pay->totalAmount, 'userAgent' => $userAgent);

        $createTransaction = $this->createTransactionSoap($arrayPay);

        if ($createTransaction->createTransactionResult->returnCode == 'SUCCESS' && isset($createTransaction->createTransactionResult->returnCode)) {
            $bankURL = $createTransaction->createTransactionResult->bankURL;
            $transactionID = $createTransaction->createTransactionResult->transactionID;
            $trazabilityCode = $createTransaction->createTransactionResult->trazabilityCode;
            //Guardar datos del pago
            $this->SavePay($reference, $pay->description, $pay->currency, $pay->totalAmount, $document, '',
                $bankCode, $bankInterface, $transactionID, $trazabilityCode);
            return redirect()->away($bankURL);
        } else {
            $result = array();
            $result['TypesDocuments'] = TypeDocument::all();
            $result['reference'] = pay::all()->max('reference') + 1;
            $result['message'] = 'Ocurrio un error creando la transacción';
            return view('Home.Home', $result);
        }
    }

    /**
     * Verifica el estado de la transaccion y retornar la vista con los mensajes
     */
    public function VerifyTransaction($reference)
    {
        //Consultar los datos de referencia del pago
        $ConsultPay = pay::find($reference);
        $getTransactionInformation = $this->getTransactionInformation($ConsultPay->transactionID);
        $transactionState = $getTransactionInformation->getTransactionInformationResult->transactionState;
        $responseReasonText = $getTransactionInformation->getTransactionInformationResult->responseReasonText;
        $result = array();
        $result['responseReasonText'] = $responseReasonText;
        ($transactionState == 'OK') ? $result['class'] = 'success' :
            (($transactionState == 'NOT_AUTHORIZED') ? $result['class'] = 'warning' :
                (($transactionState == 'PENDING') ? $result['class'] = 'info' : $result['class'] = 'danger'));
        $Pay = array();
        $Pay['pay'] = $ConsultPay->toarray();
        $Pay['payer'] = Payer::find($ConsultPay->payer)->toArray();
        return view('Home.VerifyTransaction', $result, $Pay);
    }

    public function destroy($id)
    {
        //
    }
}
