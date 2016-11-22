$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf_token"]').attr('content')
    }
});

function valClient() {
    var url = $('#urlValClient').val();
    var form = $('#RegPerson');
    var data = form.serialize();
    $.post(url, data, function (result) {
        $('#TypeDocument').val(result.documentType);
        $('#firstName').val(result.firstName);
        $('#lastName').val(result.lastName);
        $('#emailAddress').val(result.emailAddress);
    }).fail(function () {
        _notify('Ocurrio un error cargando los datos, \n por favor intentelo nuevamente',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function PrintTable() {
    var url, data, form, document, mensaje;
    document = $('#document').val();
    var content = $('#ContetSearch');
    if (document != '') {
        var image = '<div class="preloader pl-xxl">' +
            '<svg class="pl-circular" viewBox="25 25 50 50">' +
            '<circle class="plc-path" cx="50" cy="50" r="20" />' +
            '</svg>' +
            '</div>';
        content.html(image);
        form = $('#SearchTransaction');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Table);
            $('#' + result.idtable).dataTable();
        }).fail(function () {
            _notify('Ocurrio un error cargando los datos, \n por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    } else {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">&times;</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>El campo numero de documento es obligatorio. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    }
}

function _notify(message, type, animIn, animOut, from) {

    if (from == undefined) {
        from = 'top';
    }
    $.growl({
        icon: '',
        title: '',
        message: message,
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: 'right'
        },
        offset: {
            x: 20,
            y: 85
        },
        spacing: 10,
        z_index: 1051,
        delay: 2500,
        timer: 10000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: animIn,
            exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
        '<button type="button" class="close" data-growl="dismiss">' +
        '<span aria-hidden="true">&times;</span>' +
        '<span class="sr-only">Close</span>' +
        '</button>' +
        '<span data-growl="icon"></span>' +
        '<span data-growl="title"></span>' +
        '<span data-growl="message"></span>' +
        '</div>'
    });
}