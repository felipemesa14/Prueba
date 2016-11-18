/**
 * Created by Sistemas on 2/24/2016.
 */
function PrintTable() {
    var servicio, content, mensaje, image;

    servicio = $('#Servicio').val();
    content = $('#conten');
    image = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);

    if (servicio == '') {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>El campo servicio es obligatorio. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    } else {
        var form, data, url;
        form = $('#FormEstudios');
        url = form.attr('action');
        data = form.serialize();

        $.post(url, data, function (result) {
            content.html(result.Table);
            $("#" + result.idtable).dataTable();
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon">' +
                '<i class="fa fa-warning"></i>' +
                '</div>' +
                '<strong>Ocurrio un error cargando los datos. Por Favor Intentelo Nuevamente. </strong>' +
                '</div></div>';
            content.html(mensaje);
        });
    }
}

function OpenModalNewStudy() {
    $('#ModalEditarEstudio').modal('show');
}

function OpenModalEditarEstudio(idestudio) {

    $('#id_estudio').val(idestudio);
    var token = $('#_token').val();
    var url = $('#urlopenmodaleditarestudio').val();
    var data = 'id_estudio=' + idestudio + '&_token=' + token;
    $.post(url, data, function (result) {
        $('#nom_estudio').val(result.nom_estudio);
        $('#cod_iss').val(result.cod_iss);
        $('#val_iss').val(result.val_iss);
        $('#cod_iss2001').val(result.cod_iss2001);
        $('#val_iss2001').val(result.val_iss2001);
        $('#cod_soat').val(result.cod_soat);
        $('#val_soat').val(result.val_soat);
        $('#cups_iss').val(result.cups_iss);
        $('#id_servicio').val(result.id_servicio);
        $('#id_estado').val(result.id_estado);
        $('#cod_propio').val(result.cod_propio);
        $('#val_propio').val(result.val_propio);
        if (result.uvr == 'V') {
            $('#uvrel').prop('checked', true);
        }
        $('#ModalEditarEstudio').modal('show');
    }).fail(function () {
        _notify('Ocurrio un error al intentar abrir el estudio, por favor intentelo nuevamente.', 'danger');
    });
}

function ShowButton() {
    var Servicio = $('#Servicio').val();
    var button = $('#showbuttonnewstudy');

    if (Servicio == '') {
        button.hide();
    } else {
        button.show();
    }
}

function GuardarEstudio() {
    var form = $('#FormEditarEstudio');
    var url = form.attr('action');
    var uvr = 'F';
    if ($('#uvrel').prop('checked')) {
        uvr = 'V'
    }
    var data = form.serialize() + '&uvr=' + uvr;
    $.post(url, data, function () {
        PrintTable();
        _notify('El estudio se guardo correctamente', 'success', 'animated bounceInLeft',
            'animated bounceOutLeft');
        $('#ModalEditarEstudio').modal('hide');
    }).fail(function () {
        _notify('Ocurrio un error al intentar guardar el estudio, por favor intentelo nuevamente.', 'danger', 'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

$('#ModalEditarEstudio').on('hidden.bs.modal', function () {
    $('#FormEditarEstudio')[0].reset();
    $('#id_estudio').val('');
});