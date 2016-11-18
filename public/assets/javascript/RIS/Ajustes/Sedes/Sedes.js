function PrintTable() {
    var url, data, form, estado, mensaje;

    estado = $('#FEstado').val();
    var content = $('#conten');
    if (estado != '' || estado != "") {

        var image = '<div class="preloader pl-xxl">' +
            '<svg class="pl-circular" viewBox="25 25 50 50">' +
            '<circle class="plc-path" cx="50" cy="50" r="20" />' +
            '</svg>' +
            '</div>';
        content.html(image);

        form = $('#FormSedes');
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

function GuardarSede() {
    var idsede, nombre, aetitle, estado, logo;
    idsede = $('#id_sede').val();
    nombre = $('#Nombre').val();
    estado = $('#Estado').val();
    logo = $('#url_logo').val();

    if (nombre == '' && idsede == '') {
        _notify('Nombre es un campo obligatorio',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
    else if (estado == '' && idsede == '') {
        _notify('Estado es un campo obligatorio',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
    else if (logo == '' && idsede == '') {
        _notify('Por favor elija un logo para la sede',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else {
        var form = $('#FormEditarSede');
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: new FormData(form[0]),
            cache: false,
            async: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                PrintTable();
                $('#ModalEditarSedes').modal('hide');
                _notify('Sede guardada correctamente',
                    'success',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
            },
            error: function () {
                _notify('Ocurrio un error al intentar guardar la sede. \n Por favor intentelo nuevamente',
                    'danger',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
            }
        });
    }

}

function OpenModalNewStudy(id) {
    $('#id_sede').val('');
    $('#Nombre').val('');
    $('#ae_title').val('');
    $('#Estado').val('');
    $('#url_logo').val('');
    $('#DivLogo').html('');

    if (id == undefined || id == '' || id == null) {
        $('#ModalEditarSedes').modal('show');
    }
    else {
        var url = $('#urlvalsede').val();
        var data = '_token=' + $('#_token').val() + '&idsede=' + id;
        $.post(url, data, function (result) {
            $('#id_sede').val(result.id_sede);
            $('#Nombre').val(result.desc_sede);
            $('#ae_title').val(result.ae_title);
            $('#Estado').val(result.id_estado);
            $('#DivLogo').html(result.Image);
            $('#ModalEditarSedes').modal('show');
        }).fail(function () {
            _notify('Ocurrio un error cargando los datos, \n por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}