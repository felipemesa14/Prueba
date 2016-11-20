@extends('MasterPages.MasterPage')
@section('content')
    <section id="content">
        <div class="container">
            <div class="block-header">
                <h2></h2>
            </div>
            <div class="card">
                <div class="card-body card-padding">
                    <h2 align="center">{{$descPay}}
                    </h2>
                    <h4 class="text-danger">Verifique la siguiente información</h4>
                    <form id="createTransacction" name="createTransacction" action="{{URL::to('createTransacction')}}"
                          method="post">
                        <input type="hidden" value="{{$document}}" name="document">
                        <input type="hidden" value="{{$reference}}" name="reference">
                        <div class="row">
                            <div class="col-lg-4 col-sm-4 col-md-4 col-xs-4">
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <td><strong>Tipo de documento</strong></td>
                                        <td align="center">{{$documentType}}</td>
                                    </tr>
                                    <tr>
                                        <td class="info"><strong>Documento de identidad</strong></td>
                                        <td align="center">{{$document}}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nombre Completo</strong></td>
                                        <td align="center">{{$firstName}}</td>
                                    </tr>
                                    <tr>
                                        <td class="info"><strong>Apellido Completo</strong></td>
                                        <td align="center">{{$lastName}}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Total a pagar</strong></td>
                                        <td align="center">{{$currency}}  {{$totalAmount}}</td>
                                    </tr>
                                    <tr>
                                        <td class="info"><strong>Referencia</strong></td>
                                        <td align="center">{{$reference}}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dirección Ip</strong></td>
                                        <td align="center">{{$idAdress}}</td>
                                    </tr>
                                    <tr>
                                        <td class="info"><strong>Conceptos</strong></td>
                                        <td align="center">{{$description}}</td>
                                    </tr>
                                </table>
                                <h5 class="text-danger">Esta transaccion esta sujeta a verificación</h5>
                            </div>
                            <div class="col-lg-2">
                            </div>
                            <div class="col-lg-6">
                                <label for="pse"><strong>{{$descPay}}</strong></label>
                                <div class="radio m-b-15">
                                    <label>
                                        <img width="200" height="80" src="{{asset('assets/img/'.$img)}}">
                                        <input type="radio" id="pse" name="pse" checked>
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
                                <br><br>
                                    <div class="form-group">
                                        <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                                        <br>
                                        <button type="submit" class="btn btn-success">
                                            Pagar
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@stop