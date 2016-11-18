function _OpenModalObservaciones(idinforme) {
    var url, data, token;
    token = $('#tokenobservacion').val();
    $('#IdInformeOb').val(idinforme);
    observacion = $('#observacionTipo').val('');
    url = $('#urlcargarobservaciones').val();
    data = 'idinforme=' + idinforme + '&_token=' + token;

    $.post(url, data, function (result) {
        $('#divO_documento').html(result.id);
        $('#divO_nombrecompleto').html(result.nombre);
        $('#divO_edad').html(result.edad);
        $('#estudioO').html(result.nombreest);
        $('#tecnicaO').html(result.tecnica);
        $('#FechaCitaO').html(result.fecha);
        $('#div_select_tipo_comentario').html(result.select);
        $('#o_Comentarios').html(result.Html);
        $('#mo_AgregarObservacionesInforme').modal('show');
    }).fail(function () {
        _notify('Error al abrir la modal',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function _GuardarObservacion() {
    var form, data, url, tipo, observacion;
    tipo = $('#Observaciontipocomentario').val();
    observacion = $('#observacionTipo').val().trim();

    if (tipo == '0' || observacion == '') {
        _notify('Por favor llene todos los campos antes de continuar',
            'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else {
        form = $('#ObservacionForm');
        data = form.serialize();
        url = form.attr('action');

        $.post(url, data, function (result) {
            $('#o_Comentarios').html(result.Html);
            _notify('El comentario ha sido guardado correctamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        }).fail(function () {
            _notify('Ocurrio un error al intentar guardar el comentario, por favor intentelo nuevamente',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}

function _OpenModalModificarCita(idinforme, idtiempo) {
    var url, data, token;
    token = $('#tokenobservacion').val();
    url = $('#ShowModificarCitas').val();
    data = 'idinforme=' + idinforme + '&_token=' + token;

    $.post(url, data, function (result) {
        //MostrarEstudios('',1);
        $("#edit_informe input[name=idinforme]").val(result.idinforme);
        $("#edit_informe input[name=NDocumento]").val(result.ndocumento);
        $("#edit_informe input[name=pnombre]").val(result.pnombre);
        $('#edit_informe input[name=snombre]').val(result.snombre);
        $('#edit_informe input[name=papellido]').val(result.papellido);
        $('#edit_informe input[name=sapellido]').val(result.sapellido);
        $('#edit_informe select[id=sede]').val(result.idsede);
        $('#edit_informe select[id=servicio]').val(result.idservicio);
        $('#edit_informe input[id=idsede]').val(result.idsede);
        $('#edit_informe input[id=idservicio]').val(result.idservicio);
        $('#edit_informe div[id=SelectEstudio]').html(result.idestudio);
        $('#edit_informe select[id=tecnica]').val(result.idtecnica);
        $('#edit_informe select[id=lado]').val(result.idlado);
        $('#edit_informe input[id=Extremidad]').val(result.extremidad);
        $('#edit_informe div[id=showproyeccion]').html(result.proyecciones);
        $('#edit_informe div[id=showreconstruccion]').html(result.reconstruccion);
        $('#edit_informe div[id=showguia]').html(result.guia);
        $('#edit_informe div[id=showcomparativa]').html(result.comparativa);
        $('#edit_informe input[id=copago]').val(result.copago);
        $('#edit_informe select[id=tpaciente]').val(result.TipoPaciente);
        $('#edit_informe select[id=prioridad]').val(result.Prioridad);
        $('#edit_informe input[id=ubicacion]').val(result.ubicacion);
        $('#edit_informe div[id=ShowPaS]').html(result.PaS);
        $('#edit_informe input[id=FechaCita]').val(result.fechacita);
        $('#DivHoraCita').html('<input type="text" id="HoraCita" name="HoraCita" class="form-control">');
        $('#edit_informe input[id=idInforme]').val(result.id_informe);
        $('#edit_informe input[id=fnacimiento]').val(result.fnacimiento);
        //$('#edit_informe select[id=genero]').val(result.genero);
        $('#edit_informe input[id=HoraCita]').val(result.horacita);
        $('#edit_informe input[id=idtiempo]').val(idtiempo);
        $('#edit_informe select[id=estudio]').combobox();

        //$('#edit_informe input[id=]').val(result.idpaciente);
        $('#mo_ModificarEstudio').modal('show');
        ValidarCita(1);
    }).fail(function () {
        _notify('Error al abrir la modal, intentelo de nuevo por favor',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

//*****************************//funcion para validar la cita
function ValidarCita(formu) {
    //obtencion del grupo de empleados
    var formulario = formu == undefined ? 'NuevaAgenda' : 'edit_informe';
    var form = $('#' + formulario);
    var data = form.serialize() + '&formulario=' + formulario;
    var url = $('#URLValidarCita').val();
    var idpaciente = $('#' + formulario + ' input[id=NDocumento]').val();
    var servicio = $('#' + formulario + ' input[id=idservicio]').val();
    var sede = $('#' + formulario + ' input[id=idsede]').val();
    var fecha = $('#' + formulario + ' input[id=FechaCita]').val();
    var hora = $('#' + formulario + ' input[id=HoraCita').val();
    var Html = $('#' + formulario + ' div[id=divshow]');
    if (idpaciente == "" || servicio == "" || fecha == "" || hora == "" || hora == "" || sede == "") {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Por Favor llenar los campos obligatorios, Intentelo nuevamente. </strong>' +
            '</div>' +
            '</div>';
        Html.html(mensaje);
    } else {
        $.post(url, data, function (result) {
            Html.html(result.RespuestaHtml);
        }).fail(function () {
            mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-warning alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">�</button>' +
                '<div class="icon"><i class="fa fa-warning"></i></div><strong>Ocurrio un error, por favor intentelo de nuevo </strong>' +
                '</div></div>';
            Html.html(mensaje);
        });
    }
}


function GuardarAjax(formulario) {
    var form = $('#' + formulario);
    var url = form.attr('action');
    var data = new FormData(form[0]);

    var NDocumento = $('#' + formulario + ' input[id=NDocumento]').val();
    var TipoDocumento = $('#' + formulario + ' select[id=TDocumento]').val();
    var pnombre = $('#' + formulario + ' input[id=pnombre]').val();
    var DivVal = $('#' + formulario + ' div[id=DivVal]');
    var papellido = $('#' + formulario + ' input[id=papellido]').val();
    var fnacimiento = $('#' + formulario + ' input[id=fnacimiento]').val();
    var genero = $('#' + formulario + ' select[id=genero]');
    var eps = $('#' + formulario + ' select[id=eps]').val();
    var EstadoCivil = $('#' + formulario + ' select[id=EstadoCivil]').val();
    var TipoAfiliacion = $('#' + formulario + ' select[id=TipoAfiliacion]').val();
    var Nivel = $('#' + formulario + ' select[id=Nivel]').val();
    var Estudio = $('#' + formulario + ' select[id=estudio]').val();
    var TipoPaciente = $('#' + formulario + ' select[id=tpaciente]').val();
    var Prioridad = $('#' + formulario + ' select[id=prioridad]').val();
    if (NDocumento == '' || NDocumento == undefined) {
        _notify('El <b>Numero de Documento</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#NDocumento').focus();
    } else if (TipoDocumento == '' || TipoDocumento == undefined) {
        _notify('El <b>Tipo de Documento</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#TDocumento').focus();
    } else if (pnombre == '' || pnombre == undefined) {
        _notify('El <b>Primer Nombre</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#pnombre').focus();
    } else if (papellido == '' || papellido == undefined) {
        _notify('El <b>Primer Apellido</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#papellido').focus();
    } else if (fnacimiento == '' || fnacimiento == '0000-00-00' || fnacimiento == undefined) {
        _notify('El <b>Fecha Nacimiento</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#fnacimiento').focus();
    } else if (genero == '' || genero == undefined) {
        _notify('El <b>Sexo</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#genero').focus();
    } else if (eps == '' || eps == undefined) {
        _notify('El <b>EPS</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#epsview').focus();
    } else if (EstadoCivil == '' || EstadoCivil == undefined) {
        _notify('El <b>Estado Civil</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#EstadoCivil').focus();
    } else if (TipoAfiliacion == '' || TipoAfiliacion == undefined) {
        _notify('El <b>Tipo Afiliacion</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#TipoAfiliacion').focus();
    } else if (Nivel == '' || Nivel == undefined) {
        _notify('El <b>Nivel</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#Nivel').focus();
    } else if (Estudio == '' || Estudio == undefined) {
        _notify('El <b>Estudio</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#estudioview').focus();
    } else if (TipoPaciente == '' || TipoPaciente == undefined) {
        _notify('El <b>Tipo Paciente</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#tpaciente').focus();
    } else if (Prioridad == '' || Prioridad == undefined) {
        _notify('La <b>Prioridad</b> es un campo obligatorio', 'danger', 'animated bounceInLeft', 'animated bounceOutLeft');
        $('#prioridad').focus();
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            processData: false,
            contentType: false
        }).done(function (data) {
            if (data.result == 'true') {
                PrintTableRis();
                _notify('El estudio ha sido guardado correctamente, ahora se encuentra en el listado de pendientes tomar.',
                    'success',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
                $('#' + formulario + ' div[id=divshow]').html =
                    '<button type="button" class="btn btn-danger" data-dismiss="modal">' +
                    'Cerrar <i class="glyphicon glyphicon-remove" aria-hidden="true"></i>' +
                    '</button><button type="submit"  class="btn btn-primary" disabled="disabled">' +
                    'Enviando.. <i class="glyphicon glyphicon-refresh"></button>';
                if (formulario == 'edit_informe') {
                    $('#mo_ModificarEstudio').modal('hide');
                    $('#edit_informe')[0].reset();
                } else {
                    $('#MyModalAgendamiento').modal('hide');
                    $('#NuevaAgenda')[0].reset();
                }
            } else {
                $('#btsubmit').hide();
                $('#ShowDivMensaje').html(data.Mess);
                _notify('Este horario ya ha sido asignado',
                    'info',
                    'animated bounceInLeft',
                    'animated bounceOutLeft');
            }

        }).fail(function () {

            _notify('El estudio no ha sido guardado correctamente, por favor intentarlo de nuevo.',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}

function MostrarEstudios(idservicio, ide, formu) {
    var id = ide == undefined ? '' : ide;
    var formulario = formu == undefined ? 'NuevaAgenda' : 'edit_informe';
    if (id == 1) {
        formulario = 'AgendaParcial';
    }
    var servicio = idservicio;
    var form = $('#' + formulario);
    var data = form.serialize() + '&servicioid=' + servicio + '&parameter=' + id;
    var url = $('#URLMostrarEstudio').val();
    var SelectEstudio = $('#' + formulario + ' div[id=SelectEstudio' + id + ']');
    if (servicio == 1) {
        //$('#' + formulario + ' div[id=showcomparativa' + id + ']').show();
        $('#' + formulario + ' div[id=showproyeccion' + id + ']').show();
        $('#' + formulario + ' div[id=descripcion_extremidad' + id + ']').hide();
        $('#' + formulario + ' div[id=Extremidad' + id + ']').val('');

    } else {
        //$('#' + formulario + ' div[id=showcomparativa' + id + ']').hide();
        //$('#' + formulario + ' input[id=comparativa' + id + ']').prop('checked', false);
        $('#' + formulario + ' div[id=showproyeccion' + id + ']').hide();
        $('#' + formulario + ' input[id=proyeccionesrx' + id + ']').val('0');
        $('#' + formulario + ' div[id=descripcion_extremidad' + id + ']').show();
    }
    if (servicio == 1 || servicio == 3 || servicio == 51 || servicio == 9 || servicio == 20 || servicio == 53 || servicio == 7) {
        $('#' + formulario + ' div[id=tecnicaestudio' + id + ']').hide();
    }
    if (servicio == 2) {
        $('#' + formulario + ' div[id=showreconstruccion' + id + ']').show();
    } else {
        $('#' + formulario + ' div[id=showreconstruccion' + id + ']').hide();
        $('#' + formulario + ' input[id=reconstruccion' + id + ']').prop('checked', false);
    }
    if (servicio == 7) {
        $('#' + formulario + ' div[id=showguia' + id + ']').show();
    } else {
        $('#' + formulario + ' div[id=showguia' + id + ']').hide();
    }
    $.post(url, data, function (result) {
        SelectEstudio.html(result.SelectEstudio);
        $('#' + formulario + ' select[id=estudio' + id + ']').combobox();
    }).fail(function () {

    });
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

function _OpenModalCancelarCita(idinforme) {
    var url, data, token;
    token = $('#tokencancelar').val();
    url = $('#ShowCancelarCitas').val();
    $('#IdInformeCancelar').val(idinforme);
    data = 'idinforme=' + idinforme + '&_token=' + token;

    $.post(url, data, function (result) {
        $('#CancelarForm div[id=divO_documento]').html(result.id);
        $('#CancelarForm div[id=divO_nombrecompleto]').html(result.nombre);
        $('#CancelarForm div[id=divO_edad]').html(result.edad);
        $('#CancelarForm div[id=estudioO]').html(result.nombreest);
        $('#CancelarForm div[id=tecnicaO]').html(result.tecnica);
        $('#CancelarForm div[id=FechaCitaO]').html(result.fecha);
        $('#CancelarForm div[id=div_select_tipo_cancelacion]').html(result.select);
        $('#CancelarForm div[id=o_Comentarios]').html(result.Html);
        $('#CancelarForm textarea[id=ObservacionCancelar]').text('');
        $('#mo_CancelarCita').modal('show');
    }).fail(function () {
        _notify('Error al abrir la modal, intentelo de nuevo por favor',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function _CancelarCita() {
    var form, data, url, tipo, observacion;
    tipo = $('#CancelarForm select[id=TipoCancelacion]').val();
    observacion = $('#CancelarForm textarea[id=ObservacionCancelar]').val().trim();
    if (tipo == '' || observacion == '') {
        _notify('Por favor llene todos los campos antes de continuar',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    } else {
        form = $('#CancelarForm');
        data = form.serialize();
        url = form.attr('action');
        $.post(url, data, function (result) {
            PrintTableRis();
            _notify('Se ha cancelado el estudio exitosamente',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
            $('#mo_CancelarCita').modal('hide');
            $('#CancelarForm')[0].reset();
        }).fail(function () {
            _notify('Ocurrrio un error al intentar cancelar la cita, por favot intentelo de nuevo.',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    }
}


function _BuscadorPacientes(url, token, paciente) {
    paciente.autocomplete({
        source: function (request, response) {
            $.get(url, {query: request.term}, function (result) {
                response(result);
            });
        },
        select: function (event, ui) {
            paciente.slideUp('slow', function () {
            });
            paciente.slideDown('slow');
        }
    });
}
function _CheckColor(color) {
    var url, data, token;
    token = $('#URL_token').val();
    url = $('#URLChek').val();
    data = 'color=' + color + '&_token=' + token;
    $.post(url, data, function (result) {

    }).fail(function () {

    });
}

function _datatable(id) {
    $("#" + id).bootgrid({
        css: {
            icon: 'zmdi icon',
            iconColumns: 'zmdi-view-module',
            iconDown: 'zmdi-expand-more',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-expand-less'
        }
    });
}

// funcion para ver listados de eps y estudios por select
(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);


            this.element.hide();
            var id = this.element.attr('id');
            this._createAutocomplete(id);
            //this._createShowAllButton();
        },

        _createAutocomplete: function (id) {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";
            cadena = "<input id=" + id + 'view' + " class=\"form-control input-sm\" required>";
            this.input = $(cadena)
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                //.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy(this, "_source")
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });
            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && ( !request.term || matcher.test(text) ))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
                .val("")
                .attr("title", value + ". No existe dentro del Sistema RIS")
                .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

function _OpenModalInformes(idinforme) {
    var url, data, token;
    token = $('#tokenInformes').val();
    url = $('#ShowModalInformes').val();
    $('#IdInformes').val(idinforme);
    data = 'idinforme=' + idinforme + '&_token=' + token;

    $.post(url, data, function (result) {
        $('#divI_documento').html(result.id);
        $('#divI_nombrecompleto').html(result.nombre);
        $('#divI_edad').html(result.edad);
        $('#estudioI').html(result.nombreest);
        $('#tecnicaI').html(result.tecnica);
        $('#fecha').html(result.IdInformes);
        $('#Tabla').html(result.Tabla);
        $('#EstadoInforme').val(result.Estado);
        $('#EstadoActual').val(result.EstadoActual);
        $('#SelectEstado').html(result.SelectEstado);
        $('#mo_Informes').modal('show');
        $('#observacionInformes').text('');
    }).fail(function () {
        _notify('Error al abrir la modal, intentelo de nuevo por favor',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function CargarMunicipio() {

    var token = $('#token').val();
    var data = 'departamento=' + $('#departamento').val() + '&_token=' + token;
    var url = $('#URLMostrarMunicipio').val();
    var SelectMunicipio = $('#SelectMunicipio');
    $.post(url, data, function (result) {
        SelectMunicipio.html(result.SelectMunicipio);
    }).fail(function () {

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

function _validateActive(idli) {
    $('#' + idli).addClass('active');
}


$(document).ready(function () {
    var path = window.location.pathname;
    var modules = path.split("/");
    var module = modules[modules.length - 1];
    var idli = 'li' + module;

    _validateActive(idli);

    $('#NuevaAgenda').bootstrapValidator({
        message: 'Este valor no es valido',
        feedbackIcons: {
            valid: 'zmdi zmdi-check form-control-feedback',
            invalid: 'zmdi zmdi-close form-control-feedback',
            validating: 'zmdi zmdi-alert-triangle form-control-feedback'
        },
        fields: {
            NDocumento: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El documento no puede ser vacio'
                    }
                }
            },
            TDocumento: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un tipo de documento'
                    }
                }
            },
            pnombre: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El primer nombre no puede ser vacio'
                    }
                }
            },
            papellido: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El primer apellido  no puede ser vacio'
                    }
                }
            },
            genero: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un sexo'
                    }
                }
            },
            epsview: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El campo eps no puede ser vacio'
                    }
                }
            },
            EstadoCivil: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un estado civil'
                    }
                }
            },
            ocupacion: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El campo ocupacion no puede ser vacio'
                    }
                }
            },
            TipoAfiliacion: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione el tipo de afiliacion'
                    }
                }
            },
            Nivel: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un nivel'
                    }
                }
            },
            tpaciente: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un tipo de paciente'
                    }
                }
            },
            prioridad: {
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione una prioridad'
                    }
                }
            }

        }
    });
});

function SelectHoraCita() {
    var formulario = 'edit_informe';
    var Fecha = $('#' + formulario + ' input[id=FechaCita]').val();
    var Servicio = $('#' + formulario + ' select[id=servicio]').val();
    var sede = $('#' + formulario + ' select[id=sede]').val();
    var token = $('#tokenobservacion').val();
    var data = 'Fecha=' + Fecha + '&_token=' + token + '&sede=' + sede + '&servicio=' + Servicio + '&formulario=' + formulario;
    var url = $('#ValidarHoraCita').val();
    $.post(url, data, function (result) {
        $('#DivHoraCita').html(result.return);
        $('#' + formulario + ' input[id=idtiempo]').val(result.idtiempo);
    }).fail(function () {

    });

}