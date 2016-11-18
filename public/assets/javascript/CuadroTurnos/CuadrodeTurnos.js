/**
 * Created by Cristian Sierra on 22/10/2015.
 */
function PrintTable() {
    var form = $('#RegistroTurnoPrintTable');
    var data = form.serialize();
    var url = form.attr('action');
    var content = $('#contenido');
    var urlimage = App.conf.assetsPath + '/' + App.conf.imgPath + '/loading.gif';
    var image = '<div align="center"><img src="' + urlimage + '" width="100" height="100"></div>';
    content.html(image);
    $.post(url, data, function (result) {
        var table = '<table id="RegistroTurnosTable" class="table table-bordered">'; //data-step="5" data-intro="&lt;strong&gt;Tabla Solicitudes pendientes&lt;/strong&gt; &lt;br/&gt; Este es el listado de solicitudes pendientes, resultado de los filtros seleccionados en la parte superior del modulo">';
        table += '<thead>';
        var tittle = result.encabezado.tittle;
        var dataintro = result.encabezado.dataintro;

        for (i in tittle) {
            step = 1;//con;
            table += '<th data-step="' + step + '" data-intro="&lt;strong&gt;Columna ' + tittle[i] + '&lt;/strong&gt; &lt;br/&gt; ' + dataintro[i] + '">' + tittle[i] + '</th>';
            //con = parseInt(con) + parseInt(1);
        }
        table += '</thead>' + '<tbody>';
        $.each(result.listDate, function (index, value) {
            table += '<tr>';
            for (i = 0; i < value.length; i++) {
                table += '<td>' + value[i] + '</td>';
            }
            table += '</tr>';
            //$('#solpendientes').html(html);
        });
        table += '</tr></table>';

        table += '<input type="hidden" name="GrupoEmpleado" id="GrupoEmpleado" value="' + result.datoscuadroturnos.GrupoEmpleado + '">' +
            '<input type="hidden" name="Sede" id="Sede" value="' + result.datoscuadroturnos.Sede + '">' +
            '<input type="hidden" name="Ciudad" id="Ciudad" value="' + result.datoscuadroturnos.Ciudad + '">' +
            '<input type="hidden" name="Mes" id="Mes" value="' + result.datoscuadroturnos.Mes + '">' +
            '<input type="hidden" name="Anio" id="Anio" value="' + result.datoscuadroturnos.Anio + '">' +
            '<input type="hidden" name="FuncionariosAjax" id="FuncionariosAjax">';
        table += ' <input type="button" value="Comenzar" id="Comenzar" class="btn btn-primary" onclick="showmodalcuadoturnos()">';

        content.html(table);
        $('#RegistroTurnosTable').dataTable();

    }).fail(function () {
        alert('Error cargando la tabla');
    });
}

function showmodalcuadoturnos() {
    var form = $('#FuncionariosSeleccionados');
    var data = form.serialize();
    var url = form.attr('action');
    $.post(url, data, function (result) {
        $('#ModalCuadroTurnosHeader').html(result.descsede);
        $('#FuncionariosAjax').val(result.FuncionarioAjax);
        RecargarDivCuadro(form);
        $('#ModalCuaroTurnos').modal('show');
    }).fail(function () {
        alert('Error cargando los datos, Intentalo nuevamente!!');
    });
}

function RecargarDivCuadro() {
    var form = $('#FuncionariosSeleccionados');
    var data = form.serialize();
    var url = $('#RegistroCuadroTurno').attr('action');
    $.post(url, data, function (result) {
        var contenedor = $('#contenedor');
        contenedor.html(result.Html);
    }).fail(function () {
        alert('Error cargando el registro');
    });
}

//mostrar horario de convencion
function MostrarHorario() {
    var convencion;
    convencion = $('#convencion').val();
    Horas = convencion.split('-', 2);
    HoraInicio = Horas[0];
    HoraFinal = Horas[1];
    $('#hr_inicio').val(HoraInicio);
    $('#hr_final').val(HoraFinal);
}

//guardar turno
function GuardarTurno() {
    var Funcionario, fechaTurno, sede, servicio, GrupoEmpleado, hr_inicio, hr_final, mensaje;
    Funcionario = $('#Funcionario').val();
    fechaTurno = fechaTurno = $('#fecha').val();
    sede = $('#sede').val();
    servicio = $('#servicio').val();
    GrupoEmpleado = $('#GrupoEmpleado').val();
    hr_inicio = $('#hr_inicio').val();
    hr_final = $('#hr_final').val();
    mensaje = $('#mensaje');
    var token = $('#_token1').val();
    //validar campos vacios
    if (Funcionario == "" || fechaTurno == "" || sede == "" || servicio == "" || GrupoEmpleado == "" || hr_inicio == "" || hr_final == "" || servicio == 0) {
        error = '<div class="alert alert-danger" align="center" style="font-size: 15px;">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">X</button>' +
            '<div align="center"><i class="fa fa-times-circle sign"></i><strong>Atenc&iacute;on!</strong> Verifique campos vac&iacute;os.</div></div>';
        mensaje.html(error);
    }
    else { //etiqueta para mostrar respuesta
        var url = $('#urlguardarturno').val();
        var data = "fechaTurno=" + fechaTurno + "&Funcionario=" + Funcionario + "&sede=" + sede + "&servicio=" + servicio +
            "&GrupoEmpleado=" + GrupoEmpleado + "&hr_inicio=" + hr_inicio + "&hr_final=" + hr_final + '&_token=' + token;
        $.post(url, data, function (result) {
            $('#TurnosFuncionario').html(result.Html);
            RecargarDivCuadro();
        }).fail(function () {

        });

    }
}

function MostrarTurnos(Funcionario, fecha) {
    var token = $('#_token1').val();
    var url = $('#urlMostrarTurnos').val();
    var data = 'Funcionario=' + Funcionario + '&fechaturno=' + fecha + '&_token=' + token;

    $.post(url, data, function (result) {
        $('#TurnosFuncionario').html(result.Html);
    });
}
function AbrirVentana(fechaTurno, Funcionario, GrupoEmpleado, Sede, NombreFuncionario) {

    MostrarTurnos(Funcionario, fechaTurno);
    $('#ModalRegistroHeader').html(NombreFuncionario);
    $('#Funcionario').val(Funcionario);
    $('#sede').val(Sede);
    $('#GrupoEmpleado').val(GrupoEmpleado);
    $('#fecha').val(fechaTurno);
    $('#Registro').modal('show');
}


