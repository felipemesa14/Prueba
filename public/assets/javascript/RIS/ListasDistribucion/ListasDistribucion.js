/**
 * Created by Juan Felipe on 03/06/2016.
 */

$(function () {
    $('#HoraDesde').datetimepicker({
        format: 'LT'
    });
    $('#HoraHasta').datetimepicker({
        format: 'LT'
    });
});
function PrintTable() {
    var sede = $("#Sede").val();
    var content = $('#conten');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (sede == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
    else {
        var form = $('#FormDistribucion');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (result) {
            content.html(result.Tabla);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error cargando los datos.' +
                'Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            content.html(mensaje);
        });
    }
}
function activarLista(Servicio, Sede, Estado) {
    var token = $('#_token').val();
    var url = $("#UpdateEstadoList").val();
    var data = 'Servicio=' + Servicio + '&_token=' + token + '&Sede=' + Sede + '&Estado=' + Estado;
    $.post(url, data, function (result) {
        PrintTable();
        _notify('Estado Cambiado Correctamente',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }).fail(function () {
        _notify('Ocurrio un error al intentar guardar el cambio de estado. \n Por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function PrintTableEsp() {
    var Sede = $("#SedeTurno").val();
    var Fecha = $("#FechaTurno").val();
    var Servicio = $("#ServicioTurno").val();
    var content = $('#contenidoEsp');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (Sede == "" || Servicio == "" || Fecha == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
    else {
        var form = $('#FormTurnoEsp');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (result) {
            content.html(result.Tabla);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error cargando los datos.' +
                'Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            content.html(mensaje);
        });
    }
}
function showmodalnuevoturno() {
    $('#TurnoEspecialista')[0].reset();
    $('#idAut').val('');
    $('#mo_TurnosEspecialistas').modal('show');

}

function ShowModalEditTurno(idAut) {
    var url, data, token;
    token = $('#tokenEsp').val();
    url = $('#URLTurnosEsp').val();
    data = 'idAut=' + idAut + '&_token=' + token;
    $('#idAut').val(idAut);
    $.post(url, data, function (result) {
        $('#SedeTime').val(result.id_sede);
        $('#ServicioTime').val(result.id_servicio);
        $('#EspecialistaTime').val(result.id_especilista);
        $('#FechaTime').val(result.FechaTurno);
        $('#HoraDesde').val(result.HoraDesde);
        $('#HoraHasta').val(result.HoraHasta);
        $('#mo_TurnosEspecialistas').modal('show');
    }).fail(function () {
        _notify('Error al intentar abrir la ventana, por favor intentelo de nuevo', 'danger');
    });
}

function GuardarTurnoEspecilista() {
    var form = $('#TurnoEspecialista');
    var data = form.serialize();
    var url = form.attr('action');
    $.post(url, data, function (result) {
        $('#TurnoEspecialista')[0].reset();
        $('#mo_TurnosEspecialistas').modal('hide');
        PrintTableEsp();
        _notify('Turno guardado correctamente',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }).fail(function () {
        _notify('Ocurrio un error al intentar guardar el turno. \n Por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function DeleteTurnoEspecialista(idAut) {
    swal({
        title: "¿Estas seguro de eliminar este turno?",
        text: "Si eliminas este archivo podrias ocacionar fallas en el sistema!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, Eliminarlo!",
        closeOnConfirm: false
    }, function () {
        var token = $('#TokenDelete').val();
        var url = $('#RutaDeleteTurno').val();
        var data = '_token=' + token + '&idAut=' + idAut;
        $.post(url, data, function (result) {
            if (result.Type == 'Success') {
                swal("Eliminado!", " El turno se ha eliminado correctamente.", "success");
                PrintTableEsp();
            } else {
                swal("Error",
                    "El Turno no se puede eliminar",
                    "error");
            }
        }).fail(function () {
            swal("Cancelado", "Ocurrio un error al intentar eliminar el turno, por favor intentelo nuevamente", "error");
        });
    });
}

function PrintTablePendientes() {
    var Sede = $("#SedePendientes").val();
    var FechaDesde = $("#FechaDesde").val();
    var FechaHasta = $("#FechaHasta").val();
    var Servicio = $("#ServicioPendientes").val();
    var content = $('#contenidoPendientes');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (Sede == "" || Servicio == "" || FechaDesde == "" || FechaHasta == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
    else {
        var form = $('#FormPendientes');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (result) {
            content.html(result.Tabla);
            $('#' + result.idtable).dataTable();
            $('#Button').html(result.Transfer);
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error cargando los datos.' +
                'Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            content.html(mensaje);
        });
    }
}

function TransPacient(idEspecilista) {
    var checkboxValues = "";
    $('input[type="checkbox"]:checked').each(function () {
        if ($(this).val() != 'on') {
            checkboxValues += $(this).val() + ",";
        }
    });
    checkboxValues = checkboxValues.substring(0, checkboxValues.length - 1);

    if (checkboxValues == "") {
        _notify('No hay campos seleccionados ', 'inverse', 'animated bounceInLeft', 'animated bounceOutLeft');
    } else if (idEspecilista == "" || idEspecilista == null) {
        _notify('Por favor Seleccione el especialista al que desea asignar los estudios seleccionados',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
    else {
        var url = $('#TransferPacient').val();
        var token = $('#tokentransfer').val();
        var data = '_token=' + token + '&idEspecilista=' + idEspecilista + '&check=' + checkboxValues;

        $.post(url, data, function (result) {
            PrintTablePendientes();
            _notify('Asignado Correctamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        }).fail(function () {
            _notify('Error al transferir el paciente.', 'danger');
        });
    }
}

function ShowModalAsignarTurno(idinforme, idusuario) {
    var url, data, token;
    token = $('#tokentransfer').val();
    url = $('#ShowModalTransfer').val();
    data = 'idinforme=' + idinforme + '&_token=' + token + '&idusuario=' + idusuario;
    $('#IdInformeAsignar').val(idinforme);
    $('#Usuario').val(idusuario);
    $('#Observacion').text('');
    $.post(url, data, function (result) {
        $('#divO_documento').html(result.id);
        $('#divO_nombrecompleto').html(result.nombre);
        $('#divO_edad').html(result.edad);
        $('#estudioO').html(result.nombreest);
        $('#tecnicaO').html(result.tecnica);
        $('#FechaCitaO').html(result.fecha);
        $('#div_select_Especialista').html(result.select);
        $('#mo_TransferEsp').modal('show');
    }).fail(function () {
        _notify('Error al intentar abrir la ventana, por favor intentelo nuevamente.',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function AsignarPacient() {
    var form = $('#AsignarForm');
    var data = form.serialize();
    var url = form.attr('action');
    if ($('#Observacion').val() == "" || $('#AsigEsp').val() == "") {
        _notify('Por favor llenar toods los campos',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else {
        $.post(url, data, function (result) {
            $('#AsignarForm')[0].reset();
            $('#mo_TransferEsp').modal('hide');
            PrintTablePendientes();
            _notify('paciente Asignado Correctamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        }).fail(function () {
            _notify('Ocurrio un error al intentar guardar la asignacion. \n Por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}