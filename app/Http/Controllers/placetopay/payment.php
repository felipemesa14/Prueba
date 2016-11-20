<?php

namespace Epsilon\Http\Controllers\placetopay;

use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Epsilon\Models\Buyer;
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
        return view('Home.Home', $result);
    }

    /*Return listbank, para realizar la transaccion
     *
     */
    public function RegisterPerson(Request $request)
    {
        //Datos del Pagador
        $Document = $request->input('document');
        $TypeDocument = $request->input('TypeDocument');
        $firstName = $request->input('firstName');
        $lastName = $request->input('lastName');
        //Datos del Comprador
        $DocumentBuyer = $request->input('Buyerdocument');
        $TypeDocumentBuyer = $request->input('BuyerTypeDocument');
        $firstNameBuyer = $request->input('BuyerfirstName');
        $lastNameBuyer = $request->input('BuyerlastName');
        //Datos del pago
        $reference = $request->input('reference');
        $totalAmount = $request->input('totalAmount');
        $Description = $request->input('description');
        try {
            DB::beginTransaction();
            //Guardar datos del pagador
            $Payer = new Payer();
            $Payer->document = $Document;
            $Payer->documentType = $TypeDocument;
            $Payer->firstName = $firstName;
            $Payer->lastName = $lastName;
//            $Payer->save();

            //Validar si comprador se ingreso correctamente
            if ($DocumentBuyer != "") {
                $Buyer = new Buyer();
                $Buyer->document = $DocumentBuyer;
                $Buyer->documentType = $TypeDocumentBuyer;
                $Buyer->firstName = $firstNameBuyer;
                $Buyer->lastName = $lastNameBuyer;
//                $Buyer->save();
            }
            DB::commit();

            //Tipo de Cliente
            $TypesClients = TypeClient::all();
            //Datos de los bancos disponibles
            $auth = $this->Auth();
            $this->Soap();
            $getBankList = '';
            SoapWrapper::service('placetopay', function ($service) use ($auth, &$getBankList) {
                $getBankList = $service->call('getBankList', array(['auth' => $auth]));
            });
            $getBankList = json_decode(json_encode($getBankList), true);
            $userAgent = $request->header('User-Agent');
            $ipAdress = $request->ip();
            $result = array();
            $result['document'] = $Document;
            $result['documentType'] = $TypeDocument;
            $result['firstName'] = $firstName;
            $result['lastName'] = $lastName;
            $result['userAgent'] = $userAgent;
            $result['idAdress'] = $ipAdress;
            $result['totalAmount'] = $totalAmount;
            $result['description'] = $Description;
            $result['reference'] = $reference;
            $result['bankInterface'] = $TypesClients;
//            dd($getBankList);
            return view('Home.SetTransacction', $result, $getBankList);
        } catch (Exception $e) {
            dd($e);
            DB::rollback();
        }


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
