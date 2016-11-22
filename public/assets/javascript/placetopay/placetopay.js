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