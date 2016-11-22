<!DOCTYPE html>
<!--[if IE 9 ]>
<html class="ie9"><![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="https://static.placetopay.com/wp/uploads/2016/01/fav.png">
    <title>Place to Pay</title>
    @include('MaterialCss.Css')
    @yield('stylesheet')
</head>
<body>
@include('Menu.Menu_Top')
<section id="main">
    <meta name="csrf_token" content="{{csrf_token()}}"/>
    @include('Menu.Menu_left')
    @yield('content')
</section>
<footer id="footer">
    Copyright &copy; 2016 Juan Felipe
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