/**
 ** Created by Juan Felipe on 05/11/2015.
 */
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++funcion para ejecutar el tutorial +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function ShowModalAgendarPaciente(Fecha, Hora, idtiempo, ide) {
    var id = ide == undefined ? '' : ide;
    var form = $('#GestionCitas');
    var data = form.serialize() + '&id_tiempo=' + idtiempo + '&Hora=' + Hora + '&fecha=' + Fecha;
    var url = $('#rutashowmodal').val();
    var ContentModal = $('#ContentModal');
    $.post(url, data, function (result) {
        if (result.response == 'nouse') {
            $('#idtiempo').val(idtiempo);
            $('#SelectSedes' + id).html(result.SelectSede);
            $('#SelectServicio' + id).html(result.SelectServicio);
            if (result.id_servicio == 1) {
                $('#anestesiasedacion').css("display", "none");
            }
            $("#eps" + id).combobox();
            $('#result_md_Parcial_Ajax').html('');
            $('#FechaCita').val(Fecha);
            $('#HoraCita').val(Hora);
            /////
            if (id == '') {
                $('#MyModalAgendamiento').modal('show');
            }
            MostrarEstudios(result.id_servicio, id);
        } else if (result.response == 'over') {
            swal("Lo Sentimos!",
                "Este Horario ya fue agendado, por favor seleccione un horario diferente",
                "error");

            PrintTableRis();
        } else {
            swal("Lo Sentimos!",
                "Este Horario, Actualmente esta siendo agendado por \n" +
                result.Name + '\n ' +
                'Abierto desde: ' +
                result.Time,
                "error");
        }
    }).fail(function () {
    });
}
function CargarMunicipio() {

    var form = $('#NuevaAgenda');
    var data = form.serialize();
    var url = $('#URLMostrarMunicipio').val();
    var SelectMunicipio = $('#SelectMunicipio');
    $.post(url, data, function (result) {
        SelectMunicipio.html(result.SelectMunicipio);
    }).fail(function () {

    });
}
function validateradio() {
    $('#guiaselected' + id).val($('[name=guia' + id + ']:checked').val());
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Validar lado del estudio
function ValidarLado() {
    estudio = $('#estudio').val();
    var arrayestudios = [892, 1063, 1066, 1103, 1126, 1061, 1062, 970, 1099, 893, 969, 1058, 1065, 1055, 1097, 1061, 1054, 1056, 1057, 1060, 1059, 1052, 1069, 1100, 1101, 750, 879, 877, 1070];
    for (i = 0; i < arrayestudios.length; i++) {
        if (estudio == arrayestudios[i]) {
            $('#SelectLado').show();
            i = arrayestudios.length;
        }
        else {
            $('#SelectLado').hide();
        }
    }
}
//***************************** Funcion para validar el paciente
function ValidarPaciente() {
    var form = $('#NuevaAgenda');
    var data = form.serialize();
    var url = $('#URLValidarPaciente').val();
    if ($('#NDocumento').val() != "") {
        $.post(url, data, function (result) {
            var eps = $('#eps');
            $('#TDocumento').val(result.TipoDocumento);
            $('#pnombre').val(result.pnombre);
            $('#snombre').val(result.snombre);
            $('#papellido').val(result.papellido);
            $('#sapellido').val(result.sapellido);
            $('#fnacimiento').val(result.FechaNacimiento);
            $('#genero').val(result.Genero);
            eps.val(result.Eps);
            $('#epsview').val(result.EpsName);
            $('#EstadoCivil').val(result.EstadoCivil);
            $('#ocupacion').val(result.Ocupacion);
            $('#TipoAfiliacion').val(result.TipoAfiliacion);
            $('#Nivel').val(result.Nivel);
            $('#departamento').val(result.Departamento);
            $('#barrio').val(result.barrio);
            $('#direccion').val(result.direccion);
            $('#tel').val(result.tel);
            $('#email').val(result.email);
            $('#SelectMunicipio').html(result.SelectMunicipio);
            eps.combobox();
        }).fail(function () {
        });
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Pintar Tablaf
function PrintTableRis() {
    var fecha = $('#fechaHasta').val();
    var sede = $('#Sede').val();
    var servicio = $('#servicio').val();
    var content = $('#conten');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (fecha == "" || sede == "" || servicio == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
    else {
        var form = $('#GestionCitas');
        var data = form.serialize();
        var url = form.attr('action');
        $.post(url, data, function (result) {
            var modal = '<div class="col-lg-6 col-sm-6 col-xs-6" align="left">' +
                '<div id="ContentModal"></div>' +
                '</div>';
            content.html(result.Tabla + modal);
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
function AgregarEstudios(id) {
    var identifier = id == undefined ? 1 : id;
    ShowModalAgendarPaciente(id);
    var IdPaciente = $('#NDocumento').val();
    $('#AgregarEstudio').modal('show');
    $('#idpaciente').val(IdPaciente);
}
$(document).ready(function () {
    //App.masks();
    $("#Documento").keyup(function () {
        var value = $(this).val();
        $("#DocumentoResponsable").val(value);
    });
    $("#Nombres").keyup(function () {
        var value = $(this).val();
        $("#NombresResponsable").val(value);
    });
    $("#Apellidos").keyup(function () {
        var value = $(this).val();
        $("#ApellidosResponsable").val(value);
    });
    $("#Telefono").keyup(function () {
        var value = $(this).val();
        $("#Telefonoresponsable").val(value);
    });
    $("#Parentezco").keyup(function () {
        var value = $(this).val();
        $("#ParentescoResponsable").val(value);
    });
});
jQuery(function ($) {
    $.mask.definitions['H'] = '[012]';
    $.mask.definitions['N'] = '[012345]';
    $.mask.definitions['n'] = '[0123456789]';
    $("#HoraCita").mask("Hn:Nn");
    $("#horasolicitud").mask("Hn:Nn");
    $("#horapreparacion").mask("Hn:Nn");
    $("#HoraCita1").mask("Hn:Nn");
    $("#horasolicitud1").mask("Hn:Nn");
    $("#horapreparacion1").mask("Hn:Nn");
});


$('#AgregarEstudio').submit(function (event) {
    event.preventDefault();
    var form = $('#AgendaParcial');
    var url = form.attr('action');
    var data = form.serialize();
    var sede = $('#idsede1').val();
    var servicio = $('#idservicio1').val();
    var FechaSolicitud = $('#FechaSolicitud1').val();
    var horasolicitud = $('#horasolicitud1').val();
    var FechaCita = $('#FechaCita1').val();
    var HoraCita = $('#HoraCita1').val();
    var content = $('#result_md_Parcial_Ajax');
    if (FechaCita == "" || FechaSolicitud == "" || horasolicitud == "" || HoraCita == "" || sede == "" || servicio == "") {
        $.gritter.add({
            title: 'Datos Obligatorios',
            text: 'Por favor llenar los campos obligatorios. Intentelo de nuevo',
            image: '../assets/img/check.png',
            class_name: 'warning'
        });
    } else {
        $.post(url, data, function (data) {
            $.gritter.add({
                title: 'Agendado',
                text: 'El estudio ha sido guardado correctamente',
                image: '../assets/img/check.png',
                class_name: 'success'
            });
            content.html(data.Tabla);
            $('#AgregarEstudio').modal('hide');
            $('#MyModalAgendamiento').css('overflow', 'auto');
            $('#AgendaParcial')[0].reset();
        }).fail(function () {
            $.gritter.add({
                title: 'No Agendado',
                text: 'El estudio no ha sido guardado, por favor intentenlo de nuevo.',
                image: '../assets/img/check.png',
                class_name: 'danger'
            });
        });
    }
});


function printTableTimes() {
    var Sede, Error, content;
    Sede = $('#SedeFiltroTurno').val();
    content = $('#ContentTableTimes');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);

    if (Sede == '') {

        Error = '<div class="alert alert-danger" style="font-size: 15px;">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>' +
            '<div align="center">' +
            '<i class="fa fa-times-circle sign"></i>' +
            '<strong>Atenc&iacute;on!</strong> ' +
            'Todos los campos son obligatorios.' +
            '</div>' +
            '</div>';
        content.html(Error);
    } else {
        var form, url, data;
        form = $('#FormFiltroTimes');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Tabla);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            Error = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                '<div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">x</button>' +
                '<div class="icon">' +
                '<i class="fa fa-warning"></i>' +
                '</div>' +
                '<strong>Ocurrio un error cargando los datos. Por Favor Intentelo Nuevamente. </strong>' +
                '</div>' +
                '</div>';
            content.html(Error);
        });
    }
}

function showmodalnuevotiempo(idtiempo) {

    var date = $.datepicker.formatDate('yy-mm-dd', new Date());
    var Sede = $('#AdminTiemposCitas select[id=SedeTime]');
    var Servicio = $('#AdminTiemposCitas select[id=ServicioTime]');
    var Fecha = $('#FechaInicioSaveTime');
    Sede.attr('disabled', false);
    Servicio.attr('disabled', false);
    Sede.val('');
    Servicio.val('');
    $('#Intervalos').val('');
    $('#idtiempo').val('');
    $('#RespuestaTime').html('');
    Fecha.val(date);
    Fecha.attr('disable', false);
    if (idtiempo == undefined) {
        $('#AgregarTiempoModal').modal('show');
    }
    else {
        var url = $('#urlopenmodaltimes').val();
        var data = '_token=' + $('#_token').val() + '&id_tiempo=' + idtiempo;
        $.post(url, data, function (result) {
            $('#AdminTiemposCitas input[id=idtiempo]').val(idtiempo);
            Sede.val(result.id_sede);
            Sede.attr('disabled', 'disabled');
            Servicio.val(result.id_servicio);
            Servicio.attr('disabled', 'disabled');
            Fecha.val(result.fecha);
            Fecha.attr('disabled', 'disabled');
            $('#Intervalos').val(result.intervalo_tiempo);
            $('#AgregarTiempoModal').modal('show');
        }).fail(function () {
            _notify('Ocurrio un error al intentar cargar los datos,<br>' +
                'por favor intentalo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft')
        });
    }


}

function AgregarTiempos() {
    var Sede = $('#SedeTime').val();
    var Servicio = $('#ServicioTime').val();
    var Fecha = $('#FechaInicioSaveTime').val();
    var HoraInicio = $('#HoraDesde').val();
    var HoraFin = $('#HoraHasta').val();
    var FdesdeCompare = new Date('November 13, 2013 ' + HoraInicio);
    var FhastaCompare = new Date('November 13, 2013 ' + HoraFin);
    var HdCompare = FdesdeCompare.getTime();
    var HhCompare = FhastaCompare.getTime();
    var DiffMinutes = (((HhCompare - HdCompare) / 1000) / 60);
    var Intervalos = $('#Intervalos').val();
    var contenido = $('#RespuestaTime');

    var mensaje = '';

    if (Sede == "" || Servicio == "" || Intervalos == "" || Fecha == "" || Fecha == "0000-00-00" || Fecha == undefined
        || HoraInicio == undefined || HoraInicio == "" || HoraFin == undefined || HoraFin == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';

        contenido.html(mensaje);
    } else if (HhCompare <= HdCompare) {
        _notify('La Hora Desde no puede ser mayor o igual a la Hora Hasta.',
            'info',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else if (DiffMinutes < Intervalos) {
        _notify('La diferencia de horas (' + DiffMinutes + ') es menor a la del intervalo (' + Intervalos + ')',
            'info',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
    else {
        var form = $('#AdminTiemposCitas');
        var url = form.attr('action');
        var data = form.serialize();
        $.post(url, data, function (result) {
            if (result.Type == 'Guardado') {
                $('#AgregarTiempoModal').modal('hide');
                _notify('Guardado!!! La agenda se ha configurado correctamente',
                    'success',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
                printTableTimes();
            } else {
                mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                    ' <div class="alert alert-info alert-white rounded">' +
                    '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                    '<div class="icon">' +
                    '<i class="fa fa-warning"></i>' +
                    '</div>' +
                    result.Message +
                    '</div>' +
                    '</div>';
                contenido.html(mensaje);
            }

        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error cargando los datos.' +
                'Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            contenido.html(mensaje);
        });
    }
}

function CerrarVentana() {
    var idtiempo = $('#idtiempo').val();
    var Hora = $('#HoraCita').val();
    var Fecha = $('#FechaCita').val();
    var token = $('#_token').val();
    var data = 'Hora=' + Hora + '&Fecha=' + Fecha + '&idtiempo=' + idtiempo + '&_token=' + token;
    var url = $('#URLCerrarVentana').val();
    $.post(url, data, function (result) {
        if (result.result) {
            PrintTableRis();
            $('#NDocumento').val('');
            $('#TDocumento').val('');
            $('#pnombre').val('');
            $('#snombre').val('');
            $('#papellido').val('');
            $('#sapellido').val('');
            $('#fnacimiento').val('');
            $('#genero').val('');
            $('#eps').val('');
            $('#epsview').val('');
            $('#EstadoCivil').val('');
            $('#ocupacion').val('');
            $('#TipoAfiliacion').val('');
            $('#Nivel').val('');
            $('#SelectDepartamento').html('');
            $('#barrio').val('');
            $('#direccion').val('');
            $('#tel').val('');
            $('#email').val('');
            $('#SelectMunicipio').html('');
            $('#Documento').val('');
            $('#Nombres').val('');
            $('#Apellidos').val('');
            $('#Telefono').val('');
            $('#Parentezco').val('');
            $('#estudio').val('');
            $('#estudioview').val('');
            $('#lado').val('');
            $('#proyeccionesrx').val();
            $('#copago').val('0');
            $('#tapciente').val('');
            $('#prioridad').val('');
            $('#ubicacion').val('');
            $('#Extremidad').val('');
            $('#portatil').prop('checked', false);
            $('#anestesia').prop('checked', false);
            $('#sedacion').prop('checked', false);
            $('#reconstruccion').prop('checked', false);
            $('#MyModalAgendamiento').modal('hide');
        }
    }).fail(function () {
        _notify('Ocurrio un error al intentar cerrrar la ventana, por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}


function BloquearCita(Hora, Fecha, TiempoCita) {
    swal({
        title: "¿Estás seguro de bloquear esta cita?",
        text: "Si bloqueas esta cita podrias ocacionar fallas en el sistema!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, Bloquearlo!",
        closeOnConfirm: false
    }, function () {
        var token = $('#_token').val();
        var url = $('#rutablockcita').val();
        var data = '_token=' + token + '&Hora=' + Hora + '&Fecha=' + Fecha + '&TiempoCita=' + TiempoCita;
        $.post(url, data, function (result) {
            if (result.Type == 'Success') {
                swal("Bloqueado!", " El turno se ha bloqueado correctamente.", "success");
                PrintTableRis();
            } else {
                swal("Error",
                    "El Turno no se puede bloquear debido a que se encuentran citas asignados dentro del mismo",
                    "error");
            }
        }).fail(function () {
            swal("Cancelado", "Ocurrio un error al intentar bloquear el turno, por favor intentelo nuevamente", "error");
        });
    });
}
function DesBloquearCita(Hora, Fecha, TiempoCita) {
    swal({
        title: "¿Estás seguro de desbloquear esta cita?",
        text: "Si desbloqueas esta cita podrias ocacionar fallas en el sistema!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, Desbloquearlo!",
        closeOnConfirm: false
    }, function () {
        var token = $('#_token').val();
        var url = $('#rutadisblockcita').val();
        var data = '_token=' + token + '&Hora=' + Hora + '&Fecha=' + Fecha + '&TiempoCita=' + TiempoCita;
        $.post(url, data, function (result) {
            if (result.Type == 'Success') {
                swal("Desbloqueado!", " El turno se ha desbloqueado correctamente.", "success");
                PrintTableRis(TiempoCita);
            } else {
                swal("Error",
                    "El Turno no se puede desbloquear, ya que no se encuentra como bloqueado",
                    "error");
            }
        }).fail(function () {
            swal("Cancelado", "Ocurrio un error al intentar desbloquear el turno, por favor intentelo nuevamente", "error");
        });
    });
}

$(function () {
    $('#HoraDesdeTime').datetimepicker({
        format: 'LT'
    });
    $('#HoraHastaTime').datetimepicker({
        format: 'LT'
    });
});
