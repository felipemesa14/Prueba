function PrintTable() {
    var fecha, sede, servicio, content, mensaje, urlimage, image;
    fecha = $('#Fecha').val();
    sede = $('#Sede').val();
    servicio = $('#Servicio').val();
    content = $('#contenidopreliminar');
    image = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (fecha == '' || sede == '' || servicio == '') {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">X</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    } else {
        var form, data, url;
        form = $('#ResultadoPreliminares');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Table);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error cargando los datos.' +
                'Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            content.html(mensaje);
        });
    }
}

function MostrarInformesDefinitivosTable() {
    var Paciente, conten;
    Paciente = $('#PacienteDefinitivo').val();
    conten = $('#ContenidoDefinitivos');
    var imagen = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    conten.html(imagen);
    if (Paciente == "") {
        var error =
            '<div class="alert alert-danger" style="font-size: 15px;">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">X</button>' +
            '<div align="center"><i class="fa fa-times-circle sign"></i><strong>Atenc&iacute;on!</strong> El campo paciente es obligatorio.</div></div>';
        conten.html(error);
    }
    else {
        var form = $('#FormInformeDefinitivo');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (data) {
            conten.html(data.Tabla);
            $('#' + data.idtable).dataTable();
        }).fail(function () {
            error =
                '<div class="alert alert-warning" style="font-size: 15px;">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">X</button>' +
                '<div align="center"><i class="fa fa-times-circle sign"></i>' +
                '<strong>Atenc&iacute;on!</strong>' +
                ' Ocurrio un error cargando los datos. Por favor intentlo nuevamente.</div></div>';
            conten.html(error);
        });
    }
}

function MostrarEstadosInformesTable() {
    var Paciente, conten;
    Paciente = $('#PacientePreliminares').val();
    conten = $('#ContenidoEstados');
    var imagen = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    conten.html(imagen);
    if (Paciente == "") {
        var error =
            '<div class="alert alert-danger" style="font-size: 15px;">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">X</button>' +
            '<div align="center"><i class="fa fa-times-circle sign"></i><strong>Atenc&iacute;on!</strong> El campo paciente es obligatorio.</div></div>';
        conten.html(error);
    }
    else {
        var form = $('#FormEstadoInforme');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (data) {
            conten.html(data.Tabla);
            $('#' + data.idtable).dataTable();
        }).fail(function () {
            error =
                '<div class="alert alert-warning" style="font-size: 15px;">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">X</button>' +
                '<div align="center"><i class="fa fa-times-circle sign"></i>' +
                '<strong>Atenc&iacute;on!</strong>' +
                ' Ocurrio un error cargando los datos. Por favor intentlo nuevamente.</div></div>';
            conten.html(error);
        });
    }
}
function VistaInforme(idinforme) {
    var Token = $('#_token').val();
    var url = $('#urlvistainforme').val() + '?_token=' + Token + '&idinforme=' + idinforme;
    var WindowVistaImpresion = window.open(url, '_blank', 'width=800,height=700');
}
function OpenModalCorreo(idinforme, correo) {
    $('#informe').val(idinforme);
    $('#correo').val(correo);
    $('#CorreoModal').modal('show');
}

function ShowModalAprobarestudios(idinforme) {
    var url, data, token;
    token = $('#_token').val();
    url = $('#UrlAprobarEstudio').val();
    data = 'idinforme=' + idinforme + '&_token=' + token;
    $('#IdInformeAprobar').val(idinforme);
    $.post(url, data, function (result) {
        $('#Documento').html(result.Documento);
        $('#Nombre').html(result.Nombre);
        $('#Eps').html(result.Eps);
        $('#Sexo').html(result.Sexo);
        $('#Edad').html(result.Edad);
        $('#Orden').html(result.Orden);
        $('#Estudio').html(result.Estudio);
        $('#Tecnica').html(result.Tecnica);
        $('#Extremidad').html(result.Extremidad);
        $('#Ubicacion').html(result.Ubicacion);
        $('#Fecha').html(result.Fecha);
        $('#Hora').html(result.Hora);
        $('#Funcionario').html(result.Funcionario);
        $('#tipoResultado').html(result.TipoResultado);
        $('#bid-rads').html(result.Birad);
        $('#lectura').html(result.Detalle);
        $('#ModalPublicarestudios').modal('show');
    }).fail(function () {
        _notify('Error al intentar abrir la modal, por favor actualice la pagina e intentelo de nuevo de lo contrario comunicarse con el area de sistemas',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function PublicarEstudio() {
    var form = $('#FormPublicarEstudios');
    var url = form.attr('action');
    var data = form.serialize();

    $.post(url, data, function () {
        PrintTable();
        _notify('El estudio fue publicaco exitosamente, ya puede ser visualizado en Definitivos.',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
        $('#ModalPublicarestudios').modal('hide');
    }).fail(function () {
        _notify('Ocurrio un error al intentar publicar el estudio, por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}
function EnviarInformeCorreo() {
    var form = $('#FormEnviarCorreo');
    var data = form.serialize();
    var url = form.attr('action');
    $.post(url, data, function () {
        _notify('El informe se envio correctamente', 'success');
        $('#CorreoModal').modal('hidden');
        MostrarInformesDefinitivosTable();
    }).fail(function () {
        _notify('Ocurrio un error al intentar enviar el informe, por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

$(document).ready(function () {
    var UrlBuscador = $('#urlbuscadorpaciente').val();
    var Token = $('#_token').val();
    var PacientePreliminar = $('#PacientePreliminares');
    var PacienteDefinitivo = $('#PacienteDefinitivo');
    _BuscadorPacientes(UrlBuscador, Token, PacientePreliminar);
    _BuscadorPacientes(UrlBuscador, Token, PacienteDefinitivo);
});