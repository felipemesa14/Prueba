@extends('MasterPages.MasterPage')
@section('content')
    <section id="content">
        <div class="container">
            <div class="block-header">
                <h2>Realizar Pagos</h2>
            </div>
            @if ($message != '' && $message != null)
                <div class="alert alert-warning">
                    {{ $message }}
                </div>
            @endif
            <div class="card">
                <div class="card-body card-padding">
                    <div class="alert alert-info">
                        <strong>Por favor ingrese los siguientes datos, si corresponde a la misma
                            persona solo ingresar datos del pagador!</strong>
                    </div>
                    <form id="RegPerson" name="RegPerson" action="{{URL::to('RegisterTransaction')}}"
                          method="post">
                        <div class="row">
                            <h4><strong>Pagador</strong></h4><br><br>
                            <div class="form-group col-lg-2 col-sm-2 col-md-2 col-xs-12">
                                <div class="fg-line">
                                    <div class="select">
                                        <label for="TypeDocument"><strong>Tipo de
                                                Documento</strong></label>
                                        <select name="TypeDocument" id="TypeDocument"
                                                class="form-control"
                                                required>
                                            <option value="">.:Seleccione:.</option>
                                            @foreach($TypesDocuments as $typesDocument)
                                                <option value="{{$typesDocument->CodType}}">
                                                    {{
                                                    $typesDocument->DescType
                                                    }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-lg-2 col-sm-2 col-md-2 col-xs-12">
                                <label for="document">Documento de Identidad</label>
                                <input type="number" class="form-control" id="document" name="document"
                                       placeholder="Documento de identidad" required onblur="valClient()">
                            </div>
                            <div class="form-group col-lg-3 col-sm-3 col-md-3 col-xs-12">
                                <label for="firstName">Nombre Completo</label>
                                <input type="text" class="form-control" id="firstName" name="firstName"
                                       placeholder="Nombre completo" required>
                            </div>
                            <div class="form-group col-lg-3 col-sm-3 col-md-3 col-xs-12">
                                <label for="lastName">Apellido Completo</label>
                                <input type="text" class="form-control" id="lastName" name="lastName"
                                       placeholder="Apellido Completo" required>
                            </div>
                            <div class="from-group col-lg-2 col-sm-2 col-md-3 col-xs-3">
                                <label for="email">Correo electronico</label>
                                <input type="email" name="emailAddress" id="emailAddress" class="form-control"
                                       placeholder="example@example.com">
                            </div>
                        </div>
                        <br>
                        {{--<div class="row">--}}
                        {{--<h4><strong>Comprador</strong></h4>--}}
                        {{--<div class="col-lg-3 col-sm-3 col-md-3 col-xs-12">--}}
                        {{--<div class="fg-line">--}}
                        {{--<div class="select">--}}
                        {{--<label for="BuyerTypeDocument"><strong>Tipo de--}}
                        {{--Documento</strong></label>--}}
                        {{--<select name="BuyerTypeDocument" id="BuyerTypeDocument"--}}
                        {{--class="form-control">--}}
                        {{--<option value="">.:Seleccione:.</option>--}}
                        {{--@foreach($TypesDocuments as $typesDocument)--}}
                        {{--<option value="{{$typesDocument->CodType}}">--}}
                        {{--{{--}}
                        {{--$typesDocument->DescType--}}
                        {{--}}</option>--}}
                        {{--@endforeach--}}
                        {{--</select>--}}
                        {{--</div>--}}
                        {{--</div>--}}
                        {{--</div>--}}
                        {{--<div class="col-lg-3 col-sm-3 col-md-3 col-xs-12">--}}
                        {{--<label for="Buyerdocument">Documento de Identidad</label>--}}
                        {{--<input type="number" class="form-control" id="Buyerdocument" name="Buyerdocument"--}}
                        {{--placeholder="Documento de identidad">--}}
                        {{--</div>--}}
                        {{--<div class="col-lg-3 col-sm-3 col-md-3 col-xs-12">--}}
                        {{--<label for="BuyerfirstName">Nombre Completo</label>--}}
                        {{--<input type="text" class="form-control" id="BuyerfirstName" name="BuyerfirstName"--}}
                        {{--placeholder="Nombre completo">--}}
                        {{--</div>--}}
                        {{--<div class="col-lg-3 col-sm-3 col-md-3 col-xs-12">--}}
                        {{--<label for="BuyerlastName">Apellido Completo</label>--}}
                        {{--<input type="text" class="form-control" id="BuyerlastName" name="BuyerlastName"--}}
                        {{--placeholder="Apellido completo">--}}
                        {{--</div>--}}
                        {{--</div>--}}
                        <br>
                        <div class="row">
                            <h4><strong>Información del pago</strong></h4><br><br>
                            <div class="form-group col-lg-2 col-sm-2 col-md-2 col-xs-12">
                                <label for="reference">Referencia de pago</label>
                                <input type="number" id="reference" name="reference" class="form-control" required
                                       placeholder="Referencia del pago" readonly value="{{$reference}}">
                            </div>
                            <div class="form-group col-lg-2 col-sm-2 col-md-2 col-xs-12">
                                <div class="fg-line">
                                    <div class="select">
                                        <label for="currency"><strong>Tipo de
                                                Documento</strong></label>
                                        <select id="currency" name="currency"
                                                class="form-control">
                                            <option value="COP">COP</option>
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-lg-4 col-sm-4 col-md-4 col-xs-12">
                                <label for="totalAmount">Total a pagar</label>
                                <input type="number" id="totalAmount" name="totalAmount" class="form-control" required
                                       placeholder="Total del pago">
                            </div>
                            <div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
                                <label for="description"> Descripción del pago</label>
                                <textarea name="description" id="description" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="radio m-b-15">
                                    <label><strong>Pago Tarjeta débito - corriente</strong>
                                        <img width="200" height="80" src="{{asset('assets/img/pse.jpg')}}">
                                        <input type="radio" id="pse" name="pse" checked value="1">
                                        <i class="input-helper"></i>
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div class="radio m-b-15">
                                    <label><strong>Pago tarjeta Crédito</strong>
                                        <img width="200" height="80" src="{{asset('assets/img/credit.jpg')}}">
                                        <input type="radio" id="pse" name="pse" value="2">
                                        <i class="input-helper"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-1 col-sm-1 col-md-1 col-xs-12">
                                <div class="form-group">
                                    <input type="hidden" id="urlValClient" value="{{URL::to('valClient')}}">
                                    <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}"/>
                                    <br>
                                    <button type="submit" class="btn btn-success active">
                                        Continuar
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
@section('Javascript')
    <script src="{{asset('assets/javascript/placetopay/placetopay.js')}}"></script>
@stop