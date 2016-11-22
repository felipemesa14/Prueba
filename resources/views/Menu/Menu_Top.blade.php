<header id="header-2" class="clearfix" data-current-skin="green">
    <!-- Make sure to change both class and data-current-skin when switching sking manually -->
    <ul class="header-inner clearfix">
        <li id="menu-trigger" data-trigger=".ha-menu" class="visible-xs">
            <div class="line-wrap">
                <div class="line top"></div>
                <div class="line center"></div>
                <div class="line bottom"></div>
            </div>
        </li>
        <li class="logo hidden-xs">
            <a href="{{URL::to('/')}}">Place to Pay</a>
        </li>
        <li class="hidden-xs">
        </li>
    </ul>
    <nav class="ha-menu">
        <ul>
            <li class="waves-effect" id="liHome">
                <a href="{{URL::to('/')}}">
                    <i class="zmdi zmdi-home"></i>
                    Registro de Pago
                </a>
            </li>
            <li class="waves-effect" id="liHome">
                <a href="{{URL::to('ConsultPay')}}">
                    <i class="zmdi zmdi-assignment"></i>
                    Consulta de Pagos
                </a>
            </li>
        </ul>
    </nav>
    <div class="skin-switch dropdown hidden-xs">
        <button data-toggle="dropdown" class="btn ss-icon">
            <i class="zmdi zmdi-palette"></i>
        </button>
        <div class="dropdown-menu">
            <span class="ss-skin ss-1 bgm-lightblue" data-skin="lightblue"></span>
            <span class="ss-skin ss-2 bgm-bluegray" data-skin="bluegray"></span>
            <span class="ss-skin ss-3 bgm-cyan" data-skin="cyan"></span>
            <span class="ss-skin ss-4 bgm-teal" data-skin="teal"></span>
            <span class="ss-skin ss-5 bgm-green" data-skin="green"></span>
            <span class="ss-skin ss-6 bgm-orange" data-skin="orange"></span>
            <span class="ss-skin ss-7 bgm-blue" data-skin="blue"></span>
            <span class="ss-skin ss-8 bgm-purple" data-skin="purple"></span>
        </div>
    </div>
</header>