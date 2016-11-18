/**
 * Created by Juan Felipe on 18/10/2016.
 */
function PrintTableEPS() {
    var url, data, form, estado, mensaje;

    estado = $('#EpsEstado').val();
    var content = $('#conten');
    if (estado != '' || estado != "") {

        var image = '<div class="preloader pl-xxl">' +
            '<svg class="pl-circular" viewBox="25 25 50 50">' +
            '<circle class="plc-path" cx="50" cy="50" r="20" />' +
            '</svg>' +
            '</div>';
        content.html(image);

        form = $('#FormEPS');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Table);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">&times;</button>' +
                '<div class="icon">' +
                '<i class="fa fa fa-times-circle"></i>' +
                '</div>' +
                '<strong>Ocurrio un error al intentar cargar los datos, por favor intent. </strong>' +
                '</div>' +
                '</div>';
        });
    } else {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">&times;</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
}

function OpenModalNewEPS(id) {
    $('#id_eps').val('');
    $('#NombreEps').val('');
    $('#EstadoEps').val('');

    if (id == undefined || id == '' || id == null) {
        $('#ModalEditarEPS').modal('show');
    }
    else {
        var url = $('#urlvalEPS').val();
        var data = '_token=' + $('#_token').val() + '&ideps=' + id;
        $.post(url, data, function (result) {
            $('#id_eps').val(result.id_eps);
            $('#NombreEps').val(result.desc_eps);
            $('#EstadoEps').val(result.id_estado);
            $('#ModalEditarEPS').modal('show');
        }).fail(function () {
            _notify('Ocurrio un error cargando los datos, \n por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}

function GuardarEPS() {
    var ideps, nombre, estado;
    ideps = $('#id_sede').val();
    nombre = $('#NombreEps').val();
    estado = $('#EstadoEps').val();

    if (nombre == '' && ideps == '') {
        _notify('Nombre es un campo obligatorio',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
    else if (estado == '' && ideps == '') {
        _notify('Estado es un campo obligatorio',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else {
        var form = $('#FormEditarEPS');
        var url = form.attr('action');
        var data = form.serialize();
        $.post(url, data, function (result) {
            PrintTableEPS();
            $('#ModalEditarEPS').modal('hide');
            _notify('Eps guardada correctamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        }).fail(function () {
            _notify('Ocurrio un error al intentar guardar la eps. \n Por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }

}