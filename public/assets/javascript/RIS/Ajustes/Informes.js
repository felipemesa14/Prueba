/* Created by Felipe on 24/02/2016.*/

function PrintTableInformes() {
    var desde, hasta, sede, servicio, estado, content, mensaje, urlimage, image;
    desde = $('#fechaDesde').val();
    hasta = $('#fechaHasta').val();
    sede = $('#sedes').val();
    servicio = $('#servicios').val();
    estado = $('#Estado').val();
    content = $('#contenido');
    image = ' <div class="preloader pl-xxl">' + '<svg class="pl-circular" viewBox="25 25 50 50">' + '<circle class="plc-path" cx="50" cy="50" r="20" />' + '</svg>' + '</div>';
    content.html(image);

    if (desde == '' || hasta == '' || sede == '' || servicio == '' || estado == '') {
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
        form = $('#AuditoriaEstudios');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.RespuestaHtml);
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

function Validar() {
    var content = $('#respuesta');
    var observacion = $('#observacionInformes').val().trim();
    var EstadoDevolver = $('#EstadoDevolver').val();
    var EstadoActual = $('#EstadoActual').val();
    if (EstadoDevolver == '' || observacion == '') {
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
        if (EstadoDevolver >= EstadoActual) {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-danger alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">X</button>' +
                '<div class="icon">' +
                '<i class="fa fa fa-times-circle"></i>' +
                '</div>' +
                '<strong>Por favor seleccione un estado de devolucion válido</strong>' +
                '</div>' +
                '</div>';
            content.html(mensaje);
        } else {
            var form, data, url;
            form = $('#InformesForm');
            url = form.attr('action');
            data = form.serialize();
            $.post(url, data, function (result) {
                content.html(result.RespuestaHtml);
                $('#mo_Informes').modal('hide');
                $('#InformesForm')[0].reset();
                PrintTableInformes();
                _notify('Estudio devuelto correctamente',
                    'success',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
            }).fail(function () {
                _notify('Error al guardar los cambios efectuados',
                    'danger',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
            });
        }
    }
}