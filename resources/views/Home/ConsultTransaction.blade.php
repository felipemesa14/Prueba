@extends('MasterPages.MasterPage')
@section('content')
    <section id="content">
        <div class="container">
            <div class="block-header">
                <h2>Consulta de transacciones</h2>
            </div>
            <div class="card">
                <div class="container-fluid">
                    <form id="SearchTransaction" name="SearchTransaction"
                          action="{{URL::to('SearchTransaction')}}">
                        <div class="row">
                            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                <div class="form-group">
                                    <h4><strong>Numero documento pagador</strong></h4><br>
                                    <input type="text" class="form-control" id="document"
                                           name="document" placeholder="Numero de documento del pagador">
                                </div>
                            </div>
                            <div class="col-lg-1 col-sm-1 col-md-1 col-xs-12">
                                <div class="form-group"><br>
                                    <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                                    <br>
                                    <button type="button" class="btn btn-primary"
                                            onclick="PrintTable()">Consultar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                    </form>
                    <div class="content" align="center">
                        <div id="ContetSearch"></div>
                    </div>
                </div>
                <input type="hidden" id="urlViewTransaction" value="{{URL::to('VerifyTransaction')}}">
                <input type="hidden" id="urlSearchTransactions" value="{{URL::to('SearchTransactions')}}">
            </div>
        </div>
        </div>
    </section>
@stop

@section('Javascript')
    <script src="{{asset('assets/javascript/placetopay/placetopay.js')}}"></script>
@stop