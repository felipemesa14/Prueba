@extends('MasterPages.MasterPage')
@section('content')
    <section id="content">
        <div class="container">
            <div class="block-header">
                <h2></h2>
            </div>
            <div class="card">
                <div class="card-body card-padding">
                    <h2 align="center">Información de la transacción
                    </h2><br>
                    <div class="row">
                        <div class="col-lg-2 col-sm-1 col-md-1 col-xs-0"></div>
                        <div class="col-lg-8 col-sm-8 col-md-8 col-xs-12">
                            <div class="alert alert-{{$class}} alert-white rounded">
                                <i class="zmdi zmdi-check-all"></i><strong aling="center">Su Transacción ha
                                    sido {{$responseReasonText}}!!</strong>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                            <h4 class="text-info">Información del pagador</h4>
                            <table class="table table-striped" border="1">
                                <tr>
                                    <td><strong>Documento</strong></td>
                                    <td>{{$payer['documentType']}}: {{$payer['document']}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Nombre pagador</strong></td>
                                    <td>{{$payer['firstName']}} {{$payer['lastName']}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{{$payer['emailAddress']}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                            <h4 class="text-info">Información del pago realizado</h4>
                            <table class="table table-striped" border="1">
                                <tr>
                                    <td><strong>Comprobante de pago</strong></td>
                                    <td>{{$pay['trazabilityCode']}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Valor pagado</strong></td>
                                    <td>{{$pay['currency']}} {{$pay['totalAmount']}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Descripción del pago</strong></td>
                                    <td>{{$pay['description']}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <br><br><br>
                    <div class="row">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-success" onclick="window.print()">
                                <span>Imprimir</span>
                                <i class="zmdi zmdi-print"></i>
                            </button>
                        </div>
                        <div class="col-lg-6">
                            <button type="button" class="btn btn-danger" onclick="window.close()">
                                <span>Cerrar</span>
                                <i class="zmdi zmdi-close"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@stop