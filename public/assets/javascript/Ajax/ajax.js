////AJAX
////---------------------------------------------------------------------------------------------
//function nuevoAjax() {
//    /* Crea el objeto AJAX. Esta funcion es generica para cualquier utilidad de este tipo, por
//     lo que se puede copiar tal como esta aqui */
//    var xmlhttp = false;
//    try {
//        // Creacion del objeto AJAX para navegadores no IE
//        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
//
//    }
//    catch (e) {
//        try {
//            // Creacion del objet AJAX para IE
//            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//
//        }
//        catch (E) {
//
//            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') xmlhttp = new XMLHttpRequest();
//        }
//    }
//    return xmlhttp;
//}
//function ajaxFunction() {
//    var xmlHttp;
//
//    try {
//
//        xmlHttp = new XMLHttpRequest();
//        return xmlHttp;
//    } catch (e) {
//
//        try {
//            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
//            return xmlHttp;
//        } catch (e) {
//
//            try {
//                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
//                return xmlHttp;
//            } catch (e) {
//                alert("Tu navegador no soporta AJAX!");
//                return false;
//            }
//        }
//    }
//}
//var xmlhttp = false;
//
////Chequeo si se usa IExplorer.
//try {
//    //Si la version de Javascript es mayor que la 5.
//    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
//} catch (e) {
//
//    //If not, then use the older active x object.
//    try {
//        //If we are using Internet Explorer.
//        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//    } catch (E) {
//        //Si no, no se esta usando un Internet Explorer.
//        xmlhttp = false;
//    }
//}
////Si no se esta usando un IExplorer, se crea una instancia javascript del objeto.
//if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
//    xmlhttp = new XMLHttpRequest();
//}
////+++++++++++++++++++++++++++++++++++++++++++Validacion usuario existe en base de datos.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//function ValidarUsuario() {
//    var username, password;
//    username = document.getElementById('username').value;
//    password = document.getElementById('password').value;
//
//    //Codigo ajax para enviar datos al servidor y obtener respuesta
//    error = document.getElementById('error');//etiqueta donde se va a mostrar la respuesta
//    ajax = nuevoAjax();
//    //llamado al archivo que va a ejecutar la consulta ajax
//    ajax.open("POST", "validate/validateLogin.php", true);
//    ajax.onreadystatechange = function () {
//        if (ajax.readyState == 4) {
//            if (ajax.responseText == 'false') {
//                error.innerHTML = '<div class="alert alert-danger alert-white rounded"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><div class="icon"><i class="fa fa-times-circle"></i></div><center><font color="red" size="2.5">El usuario o la contraseña no son validos.<font></center></div>';
//            }
//            else {
//                window.location.href = "Contenido/home.php"
//            }
//        }
//    }
//    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//    ajax.send("username=" + username + "&password=" + password + "&tiempo=" + new Date().getTime());
//}
////********************************** funcion para actualizar los pendientes de solicitudes - actualizar cada 10 seg *********************************************************//
//function RefreshContador(usuario) {
//    //Codigo ajax para enviar datos al servidor y obtener respuesta
//
//
//    contador = document.getElementById('contador');//etiqueta donde se va a mostrar la respuesta
//    ajax = nuevoAjax();
//    //llamado al archivo que va a ejecutar la consulta ajax
//    ajax.open("POST", "../ContadorSolicitudes/QuerySolicitudes.php", true);
//    ajax.onreadystatechange = function () {
//        if (ajax.readyState == 4) {
//            contador.innerHTML = ajax.responseText;
//        }
//    }
//    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//    ajax.send("area=" + area + "&usuario=" + usuario + "&tiempo=" + new Date().getTime());
//}
////******************************** funciona para actualizar las notificaciones - actualizar cada 10 seg ***************************************//
//function RefreshNotificacion(area, usuario) {
//    //Codigo ajax para enviar datos al servidor y obtener respuesta
//    notificaciones = document.getElementById('notificaciones');//etiqueta donde se va a mostrar la respuesta
//    ajax2 = nuevoAjax();
//    //llamado al archivo que va a ejecutar la consulta ajax
//    ajax2.open("POST", "../ContadorSolicitudes/QueryNotificaciones.php", true);
//    ajax2.onreadystatechange = function () {
//        if (ajax2.readyState == 4) {
//            notificaciones.innerHTML = ajax2.responseText;
//        }
//    }
//    ajax2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//    ajax2.send("area=" + area + "&usuario=" + usuario + "&tiempo=" + new Date().getTime());
//}
////************************** deshabilitar el boton atras del navegador ***********************************************//
//function nobackbutton() {
//    window.location.hash = "no-back-button";
//    window.location.hash = "Again-No-back-button" //chrome
//    window.onhashchange = function () {
//        window.location.hash = "no-back-button";
//    }
//}
var globalarray = [];
function RefresDiv() {
    var form, url, data, html;
    form = $('#notificationesSolicitudes');
    url = form.attr('action');
    data = form.serialize();
    html = '';

    $.post(url, data, function (result) {
        $('#cantidadsolicitudes').html(result.cantidad);
        $.each(result.notificacion, function (index, value) {
            var array = [];
            for (i in value) {
                array[i] = value[i];
            }
            globalarray[value.idsolicitud] = array;
            html += '<li><a onclick="showmodaldetalle(' + value.idsolicitud + ')"><i class="fa fa-male info"></i><b>' +
                '<strong>' + value.nombreshow + '</strong>' +
                '</b> Realizó una solicitud' +
                ' <span class="date">' + value.FechaHoraSolicitud + '</span></a></li>'
        });
        $('#solpendientes').html(html);
    });
}

$(document).ready(function () {
    RefresDiv();
});
//setInterval(RefresDiv, 5000)

function showmodaldetalle(idsolicitud) {
    $('#md_solicitante').val(globalarray[idsolicitud].nombrecompleto);
    $('#md_asunto').val(globalarray[idsolicitud].asunto);
    $('#md_sede').val(globalarray[idsolicitud].sede);
    $('#md_desc_area').val(globalarray[idsolicitud].Area);
    $('#md_id_area').val(globalarray[idsolicitud].idarea);
    $('#md_solicitud').val(globalarray[idsolicitud].idsolicitud);
    $('#md_fechasoli').val(globalarray[idsolicitud].FechaHoraSolicitud);
    $('#md_fechavisit').val(globalarray[idsolicitud].FechaHoraVisita);
    $('#md_texto').html(globalarray[idsolicitud].desc_requerimiento);
    var object = globalarray[idsolicitud].ObservacionSolicitud;
    var string = '';
    for (i in object) {

        string += '<strong>'+object[i].idfuncionario +'</strong>'+ ' - ' + object[i].Notificacion + '<br>';
    }
    $('#md_area_solicitud').html(string);
    if (globalarray[idsolicitud].idarea == 1 || globalarray[idsolicitud].idarea == 2) {
        $('#md_prioridad').val(globalarray[idsolicitud].idprioridad);
        $('#md_tipo_solicitud').val(globalarray[idsolicitud].idtiposolicitud);
        $('#md_estadosolicitud').val(globalarray[idsolicitud].idestadosolicitud);
        if (globalarray[idsolicitud].idarea == 2) {
            $('#md_showequipo').show();
            $('#md_equipo').val(globalarray[idsolicitud].Equipo);
            $('#md_showMarca').show();
            $('#md_Marca').val(globalarray[idsolicitud].Marca);
            $('#md_showModelo').show();
            $('#md_Modelo').val(globalarray[idsolicitud].Modelo);
            $('#md_showSerie').show();
            $('#md_Serie').val(globalarray[idsolicitud].Serie);
        }
    } else {
        $('#md_prioridad').val(globalarray[idsolicitud].idprioridad);
        $('#md_tipo_solicitud').val(globalarray[idsolicitud].idtiposolicitud);
        $('#md_estadosolicitud').val(globalarray[idsolicitud].idestadosolicitud);
        $('#md_prioridad').attr('disabled', true);
        $('#md_tipo_solicitud').attr('disabled', true);
        $('#md_estadosolicitud').attr('disabled', true);
    }
    $('#md_Detalle').modal('show');
}
//setInterval(RefresDiv, 10000000);

////+++++++++++++++++++++++++++++++++++++++funcion para ver listados de eps por select+++++++++++++++++++++++++++++++++++++++
(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);


            this.element.hide();
            var id = this.element.attr('id');
            this._createAutocomplete(id);
            this._createasterisk();

            //this._createShowAllButton();
        },

        _createAutocomplete: function (id) {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";
            cadena = "<input id=" + id + 'view' + " style=\"width:90%;\">";

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

        _createasterisk: function () {

            this.asterisk = $("<span class='asterisk'></span>")
                .appendTo(this.wrapper)

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