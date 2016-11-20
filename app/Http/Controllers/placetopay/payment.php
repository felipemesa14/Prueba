<?php

namespace Epsilon\Http\Controllers\placetopay;

use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Epsilon\Models\Buyer;
use Epsilon\Models\pay;
use Epsilon\Models\Payer;
use Epsilon\Models\TypeClient;
use Epsilon\Models\TypeDocument;
use Illuminate\Http\Request;
use Epsilon\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

class payment extends Controller
{
    /**
     * Vista crear transaccion
     *
     *
     */
    public function index()
    {
        $result = array();
        $result['TypesDocuments'] = TypeDocument::all();
        $result['reference'] = pay::all()->max('reference') + 1;

        return view('Home.Home', $result);
    }

    /*Return listbank, para realizar la transaccion
     *
     */
    public function RegisterTransaction(Request $request)
    {
        //Datos del Pagador
        $Document = $request->input('document');
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
        $totalAmount = $request->input('totalAmount');
        $Description = $request->input('description');
        $currency = $request->input('currency');
        $typePay = $request->input('pse');
        try {
            DB::beginTransaction();
            //Guardar datos del pagador
            $this->SaveClient($Document, $TypeDocument, $firstName, $lastName, $DocumentBuyer, $TypeDocumentBuyer, $firstNameBuyer, $lastNameBuyer, $emailAddress, '');
            //Guardar datos del pago
            $this->SavePay($reference, $Description, $currency, $totalAmount, $Document, $DocumentBuyer);
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
                'descPay' => $descPay, 'img' => $img, 'bankInterface' => $TypesClients);
            return view('Home.SetTransacction', $result, $getBankList);
        } catch (Exception $e) {
            DB::rollback();
            return view('Home.Home');
        }


    }

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
        $returnURL = 'https://127.0.0.1/PlacetoPay/VerifyTransacction';
        $userAgent = $request->header('User-Agent');
        $ipAddress = $request->ip();
        $arrayPayer = array('document' => $document, 'documentType' => $client->documentType, 'emailAddress' => $client->emailAddress,
            'firstName' => $client->firstName, 'lastName' => $client->lastName);
        $arrayPay = array('bankCode' => $bankCode, 'bankInterface' => $bankInterface, 'currency' => $pay->currency,
            'description' => $pay->description,
            'ipAddress' => $ipAddress, 'payer' => $arrayPayer, 'reference' => $reference, 'returnURL' => $returnURL,
            'totalAmount' => $pay->totalAmount, 'userAgent' => $userAgent);

        $createTransaction = $this->createTransactionSoap($arrayPay);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function destroy($id)
    {
        //
    }
}
