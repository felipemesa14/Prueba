/**
 * Created by Cristian Sierra on 05/08/2016.
 */
function PrintTable() {

    var form = $('#FormFacturacionConfg');
    var url = form.attr('action');
    var data = form.serialize();
    var content = $('#conten');
    var image = ' <div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    $.post(url, data, function (result) {
        content.html(result.table);
        $('#' + result.idtable).dataTable();

    }).fail(function () {
        _notify('Ocurrio un error al intentar cargar los datos, por favor intentelo nuevamente.', 'info', '', '');
        content.html('<br>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<div class="alert alert-info alert-white rounded">' +
            '<button type = "button" data-dismiss = "alert" aria-hidden = "true" class="close" >&times;</button>' +
            '<div class="icon">' +
            '<i class="fa fa-info"></i>' +
            '</div>' +
            '<strong> Ocurrio un error cargando los datos, por favor intentelo nuevamente.</strong>' +
            '</div>' +
            '</div>');
    });
}


function AgregarContratacion() {
    var divradios = $('#showradios');
    var fields = $('#showfields');
    var error = $('#showerrors');
    divradios.html('');
    fields.html('');
    error.html('');


    $('#TipoContratacion').val('');
    $('#SedeSave').val('');

    $('#ModalAgregarConfiguracionSedes').modal('show');
}

function LoadFields() {
    var TipoContrato = $('#TipoContratacion').val();
    var Sede = $('#SedeSave').val();
    var token = $('#_token').val();
    var divradios = $('#showradios');
    var fields = $('#showfields');
    var error = $('#showerrors');

    divradios.html('');
    fields.html('');
    error.html('');


    if (TipoContrato == 1 || TipoContrato == 3) {
        var Radios = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<br>' +
            '<label>Servicios</label>' +
            '<br>' +
            '<label class="radio radio-inline m-r-20">' +
            '<input id="servicesquantity" onclick="FieldsServices()" name="servicesquantity" type="radio" name="inlineRadioOptions" value="1">' +
            '<i class="input-helper"></i>' +
            'La tarifa es para todos los servicios' +
            '</label>' +
            '<label class="radio radio-inline m-r-20">' +
            '<input id="servicesquantity" onclick="FieldsServices()" name="servicesquantity" type="radio" name="inlineRadioOptions" value="2">' +
            '<i class="input-helper"></i>' +
            'Tarifas individuales' +
            '</label>' +
            '</div>';

        divradios.html(Radios);
    }
    else {
        FieldsServices();
    }

}
function FieldsServices() {
    var selected = $('input:radio[name=servicesquantity]:checked').val();
    if (selected == undefined) {
        selected = 99;
    }
    $('#servicioscontratacionsave').val(selected);
    var fields = $('#showfields');
    fields.html('');

    var TipoContrato = $('#TipoContratacion').val();
    var url = $('#urlLoadFields').val();
    var token = $('#_token').val();
    var data = 'Opcion=' + selected + '&tipocontrato=' + TipoContrato + '&_token=' + token;

    $.post(url, data, function (result) {
        if (result.type == 1) {
            fields.html(result.Fields);
        } else {
            $('#showradios').html(result.Inputs);
            fields.html(result.Services);
        }
    }).fail(function () {

    });
}


function GuardarContratacion() {
    var form = $('#FormConfigurarSedeFacturacion');
    var url = form.attr('action');
    var data = form.serialize();

    $.post(url, data, function (result) {

        if (result.Status == 'Save') {
            PrintTable();
            _notify('Guardado!!! La configuracion para este sede se ha guardado correctamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
            $('#ModalAgregarConfiguracionSedes').modal('hide');
        } else if (result.Status == 'Exist') {
            $('#showerrors').html(result.Error);
        } else {
            _notify('Error!!! La configuracion no pudo ser guardada. Por favor intentelo nuevamente',
                'warning',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        }

    }).fail(function () {
        _notify('Ocurrio un error al intentar guardar los datos, por favor intentlo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function ChangeContratacion(idcontratacion, idcontratacionevento) {
    var token = $('#_token').val();
    var url = $('#urlchangecontratacion').val();
    var data = 'idcontratacion=' + idcontratacion + '&idcontratacionevento=' + idcontratacionevento + '&_token=' + token;
    $.post(url, data, function (result) {
        $('#editnameservice').val(result.servicio);
        if (result.idtipocontratacion == 1 || result.idtipocontratacion == 3) {
            $('#ManualEditConfg').val(result.manual);
            $('#OperadorEditConfg').val(result.operador);
            $('#editporcentaje').val(result.porcentaje);

            if (result.idtipocontratacion == 3) {
                $('#editporcentajecontratacion').val(result.porcentajecontrato);
            }
            $('#ModalEditarConfiguracionServicios').modal('show');
        }
        else {

        }
    }).fail(function () {

    });
}