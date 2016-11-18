<!DOCTYPE html>
<!--[if IE 9 ]>
<html class="ie9"><![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RadixSoft</title>
    @include('MaterialCss.Css')
    @yield('stylesheet')
</head>
<body>
@include('Menu.Menu_Top')
<section id="main">
    @include('Menu.Menu_left')
    @yield('content')
    @include('RIS.Modales.ModalAgregarObservacion')
    <input type="hidden" id="ShowModificarCitas" value="{{URL::to('RIS/ModificarCitasShowModal')}}"/>
    <input type="hidden" id="ShowCancelarCitas" value="{{URL::to('RIS/CancelarCitasShowModal')}}"/>
</section>
<footer id="footer">
    Copyright &copy; 2016 Conectib S.A.S
</footer>
<!-- Page Loader -->
<div class="page-loader">
    <div class="preloader pls-blue">
        <svg class="pl-circular" viewBox="25 25 50 50">
            <circle class="plc-path" cx="50" cy="50" r="20"/>
        </svg>
        <p>Cargando...</p>
    </div>
</div>
@include('MaterialJs.Js')
@yield('Javascript')
</body>
</html>