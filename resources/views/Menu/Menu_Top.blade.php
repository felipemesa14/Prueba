<header id="header-2" class="clearfix" data-current-skin="cyan">
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
            <a href="{{URL::to('Home')}}">Place to Pay</a>
        </li>
        <li class="hidden-xs">
        </li>
        <li class="pull-right">
            <ul class="top-menu">
                <li class="dropdown">
                    <a data-toggle="dropdown" href="">
                        <i class="tm-icon zmdi zmdi-more-vert"></i>
                    </a>
                    <ul class="dropdown-menu dm-icon pull-right">

                        <li>
                            <a href="{{URL::to('LogOut')}}">
                                <i class="zmdi zmdi-time-restore"></i>
                                Salir
                            </a>
                            <input type="hidden" name="_token" value="{{csrf_token()}}" id="URL_token">

                        </li>

                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <nav class="ha-menu">
        <ul>
            <li class="waves-effect" id="liHome">
                <a href="{{URL::to('/')}}">
                    <i class="zmdi zmdi-home"></i>
                    Inicio
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