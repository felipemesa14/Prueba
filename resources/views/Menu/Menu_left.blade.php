<aside id="sidebar" class="sidebar c-overflow">
    <div class="profile-menu">
        <a href="">
            <div class="profile-pic">
            </div>
            <br><br><br>

            <div class="profile-info">
                Juan Felipe Mesa Ocampo
                <i class="zmdi zmdi-caret-down"></i>
            </div>
        </a>

        <ul class="main-menu">
            <li>
                <a href="#"><i class="zmdi zmdi-face"></i> Mi Perfil</a>
            </li>
            <li>
                <a href="{{URL::to('LogOut')}}"><i class="zmdi zmdi-time-restore"></i> Salir</a>
            </li>
        </ul>
    </div>

    <ul class="main-menu">
        <li>
            <a href="{{URL::to('/')}}">
                <i class="zmdi zmdi-home"></i>
                Inicio</a>
        </li>
    </ul>
</aside>