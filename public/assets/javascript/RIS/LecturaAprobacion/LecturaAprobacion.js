function PrintTable(formulario) {
    var fechaDesde, fechaHasta, sedes, servicio, content, mensaje, urlimage, image;
    fechaDesde = $('#' + formulario + ' input[id=fechaDesde]').val();
    fechaHasta = $('#' + formulario + ' input[id=fechaHasta]').val();
    servicio = $('#' + formulario + ' select[id=servicios]').val();
    sedes = $('#' + formulario + ' select[id=sedes]').val();
    content = $('#' + formulario + ' div[id=Conten]');
    image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (fechaDesde == '' || fechaHasta == '' || servicio == '' || sedes == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Por Favor llenar los campos obligatorios, Intentelo nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    } else {
        var form, data, url;
        form = $('#' + formulario);
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Tabla);
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
function ShowModalLecturaAprobacion(idinforme) {
    var url, data, token;
    token = $('#_tokenLectura').val();
    url = $('#UrlCargarLectura').val();
    data = 'idinforme=' + idinforme + '&_token=' + token;
    $('#IdInformeLectura').val(idinforme);
    $.post(url, data, function (result) {
        if (result.TypeUser == 'False') {
            swal({
                title: "Error de acceso",
                text: "No puedes visualizar esta pantalla ya que no eres un especialista dentro del sistema.",
                type: "warning",
                showCancelButton: false,
                showconfirmButton: false,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false
            });
        } else {
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
            $('#lectura').val(result.Detalle);
            $(".note-editable").html(result.Detalle);
            $('#la_LecturaInforme').modal('show');
        }
    }).fail(function () {
        _notify('Ocurrio un error al intentar cargar la pantalla, por favor intentelo de nuevo o comuniquese con el departamento de sistemas', 'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function GuardarLectura(opcion) {
    var url, data, form, lectura, tresultado;
    lectura = $('#lectura').val();
    tresultado = $('#TipoResultado').val();
    if (lectura == "" || tresultado == "") {
        var mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        $('#Respuesta').html(mensaje);
    } else {
        form = $('#LecturaAprobacion');
        url = form.attr('action');
        data = form.serialize() + '&opcion=' + opcion;
        $.post(url, data, function (result) {
            _notify('El paciente fue guardado con exito, ya se encuentra disponible para el siguiente proceso', 'success','animated bounceInLeft',
                'animated bounceOutLeft');
            $('#la_LecturaInforme').modal('hide');
            $('#LecturaAprobacion')[0].reset();
            $("#lectura").val('');
            $(".note-editable").html('');
            PrintTable('ListaLecturaAprobacion');
            PrintTable('ListaPendientesPorAprobar');
        }).fail(function () {
            _notify('Ocurrio un error al intentar guardar la lectura, por favor intentelo nuevamente', 'danger','animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}
function ShowModalDevolverEstudio(idinforme) {
    var url, data, token;
    token = $('#_tokendevolucion').val();
    $('#D_IdInforme').val(idinforme);
    observacion = $('#observacionTipo').val('');
    url = $('#urlcargardevolucion').val();
    data = 'idinforme=' + idinforme + '&_token=' + token;
    $.post(url, data, function (result) {
        $('#divD_documento').html(result.id);
        $('#divD_nombrecompleto').html(result.nombre);
        $('#divD_edad').html(result.edad);
        $('#estudioD').html(result.nombreest);
        $('#tecnicaD').html(result.tecnica);
        $('#FechaCitaD').html(result.fecha);
        $('#div_select_tipo_devolucion').html(result.select);
        $('#Observacion').text('');
        $('#mo_DevolverEstudio').modal('show');
    }).fail(function () {
        _notify('Ocurrio un error al intentar cargar la pantalla, por favor intentelo de nuevo o comuniquese con el departamento de sistemas', 'danger','animated bounceInLeft',
            'animated bounceOutLeft');
    });
}
function DevolverEstudio() {
    var url, data, form, tdevolucion, observacion;
    tdevolucion = $('#tipodevolucion').val();
    observacion = $('#Observacion').val();
    if (tdevolucion == "" || observacion == "") {
        var mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        $('#Resp').html(mensaje);
    } else {
        form = $('#DevolucionEstudio');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            _notify('El estudio fue devuelto exitosamente', 'success');
            $('#mo_DevolverEstudio').modal('hide');
            $('#DevolucionEstudio')[0].reset();
            PrintTable('ListaLecturaAprobacion');
            PrintTable('ListaPendientesPorAprobar');
        }).fail(function () {
            _notify('Ocurrio un error al intentar Devolver el estudio, por favor intentelo nuevamente', 'danger','animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}

function ViewStudies(id_paciente) {
    var paciente = id_paciente;
    var token = $('#_token').val();
    var url = $('#URLViewStudies').val();
    var data = '_token=' + token + '&paciente=' + paciente;
    $.post(url, data, function (result) {
        $('#ContenidoStudies').html(result.Tabla);
        $('#' + result.idtable).dataTable();
        $('#nomPaciente').html('Estudios del Paciente - ' + result.NombrePaciente);
        $('#mo_ViewEstudies').modal('show');
    }).fail(function () {
        _notify('Ocurrio un error al intentar cargar la pantalla, por favor intentelo de nuevo o comuniquese con el departamento de sistemas', 'danger','animated bounceInLeft',
            'animated bounceOutLeft');
    });
}
