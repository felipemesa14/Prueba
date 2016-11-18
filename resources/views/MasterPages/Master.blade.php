<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="{{asset('assets/img/Epsilon.png')}}">
    <title>Epsilon2.0</title>
    @include('Css.Css')
    @yield('stylesheet')
</head>
<body>
@include('Menu.top_menu')
<div id="cl-wrapper">
    {{--@include('Menu.left_menu')--}}
    @yield('content')
    <form method="post" id="notificationesSolicitudes" action="{{URL::to('notificationesSolicitudes')}}">
        <input type="hidden" name="_method" value="POST">
        <input type="hidden" name="areaSession" id="areaSession" value="{{session('idarea')}}">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
    </form>
</div>
@include('Modales.ModalSolicitud')
@include('Js.Javascript');
@yield('scripts')
</body>
</html>