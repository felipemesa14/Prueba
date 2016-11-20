@extends('MasterPages.MasterPage')
@section('content')
    <section id="content">
        <div class="container">
            <div class="block-header">
                <h2></h2>
            </div>
            <div class="card">
                <div class="card-body card-padding">
                    <h2 align="center">Pago Debito - Cuenta Corriente
                    </h2>
                    <h4 class="text-danger">Verifique la siguiente información</h4>
                    <div class="row">
                        <div class="col-lg-4 col-sm-4 col-md-4 col-xs-4">
                            <table class="table table-bordered table-striped">
                                <tr>
                                    <td class="info"><strong>Tipo de documento</strong></td>
                                    <td align="center">{{$documentType}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Documento de identidad</strong></td>
                                    <td align="center">{{$document}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Nombre Completo</strong></td>
                                    <td align="center">{{$firstName}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Apellido Completo</strong></td>
                                    <td align="center">{{$lastName}}</td>
                                </tr>

                                <tr>
                                    <td class="info"><strong>Total a pagar</strong></td>
                                    <td align="center">{{$totalAmount}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Referencia</strong></td>
                                    <td align="center">{{$reference}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Dirección Ip</strong></td>
                                    <td align="center">{{$idAdress}}</td>
                                </tr>
                                <tr>
                                    <td class="info"><strong>Conceptos</strong></td>
                                    <td align="center">{{$description}}</td>
                                </tr>
                            </table>
                            <h5 class="text-danger">Esta transaccion esta sujeta a verificación</h5>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-6">
                            <label for="pse">Tipo de pago</label>
                            <div class="radio m-b-15">
                                <label>
                                    <img width="300" height="80"
                                         src="data:image/jpeg;base64,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">
                                    <input type="radio" id="pse" checked>
                                    <i class="input-helper"></i>
                                </label>
                            </div>
                            <br><br>
                            <div class="fg-line">
                                <div class="select">
                                    <label><strong>Tipo Cliente</strong></label>
                                    <select name="TypeClient" id="TypeClient"
                                            class="form-control"
                                            required>
                                        @foreach($bankInterface as $typeclient)
                                            <option value="{{$typeclient->idTypeClient}}">
                                                {{
                                                $typeclient->descTypeClient
                                                }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <br><br>
                            <div class="fg-line">
                                <div class="select">
                                    <label>Bancos</label>
                                    <select name="BankList" id="BankList"
                                            class="form-control"
                                            required>
                                        <option value="">.:Seleccione:.</option>
                                        @foreach($getBankListResult as $bankList)
                                            @foreach($bankList as $BankList)
                                                <option value="{{$BankList['bankCode']}}">
                                                    {{
                                                    $BankList['bankName']
                                                    }}</option>
                                            @endforeach
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@stop