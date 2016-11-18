/**
 * Created by Juan Felipe on 22/10/2015.
 */
var globalarrayArea = [];

function PrintTable() {
    var form = $('#Solicitud');
    var data = form.serialize();
    var url = form.attr('action');
    var content = $('#conten');
    var urlimage = App.conf.assetsPath + '/' + App.conf.imgPath + '/loading.gif';
    var image = '<div align="center"><img src="' + urlimage + '" width="100" height="100"></div>';
    content.html(image);
    $.post(url, data, function (result) {
        var table = '<table id="SolicitudesTable" class="table table-bordered" data-step="5" data-intro="&lt;strong&gt;Tabla Solicitudes pendientes&lt;/strong&gt; &lt;br/&gt; Este es el listado de solicitudes pendientes, resultado de los filtros seleccionados en la parte superior del modulo">';

        $.each(result.notificationsArea, function (index, value) {
            var array = [];
            for (i in value) {
                array[i] = value[i];
            }
            globalarrayArea[value.idsolicitud] = array;

        });

        table += '<thead>'

        con = parseInt(6);
        var tittle = result.encabezado.tittle;
        var dataintro = result.encabezado.dataintro;
        for (i in result.encabezado.tittle) {
            step = con;
            table += '<th data-step="' + step + '" data-intro="&lt;strong&gt;Columna ' + tittle[i] + '&lt;/strong&gt; &lt;br/&gt; ' + dataintro[i] + '">' + tittle[i] + '</th>';
            con = parseInt(con) + parseInt(1);
        }

        table += '</thead>' + '<tbody>';


        $.each(result.listDate, function (index, value) {
            table += '<tr>';
            for (i = 0; i < value.length; i++) {
                table += '<td>' + value[i] + '</td>';
            }
            table += '</tr>';
            //$('#solpendientes').html(html);
        });
        table += '</tbody></table>';
        content.html(table);


        $('#SolicitudesTable').dataTable({"aaSorting": [[2, 'desc']]});
        if (jQuery().iCheck) {
            $('.icheck').iCheck({
                checkboxClass: 'icheckbox_square-blue checkbox',
                radioClass: 'iradio_square-blue'
            });
        }

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


function showmodaldetalleArea(idsolicitud) {
    $('#md_solicitante').val(globalarrayArea[idsolicitud].nombrecompleto);
    $('#md_asunto').val(globalarrayArea[idsolicitud].asunto);
    $('#md_sede').val(globalarrayArea[idsolicitud].sede);
    $('#md_desc_area').val(globalarrayArea[idsolicitud].Area);
    $('#md_id_area').val(globalarrayArea[idsolicitud].idarea);
    $('#md_solicitud').val(globalarrayArea[idsolicitud].idsolicitud);
    $('#md_fechasoli').val(globalarrayArea[idsolicitud].FechaHoraSolicitud);
    $('#md_fechavisit').val(globalarrayArea[idsolicitud].FechaHoraVisita);
    $('#md_texto').html(globalarrayArea[idsolicitud].desc_requerimiento);
    var object = globalarrayArea[idsolicitud].ObservacionSolicitud;
    var string = '';
    for (i in object) {

        string += '<strong>' + object[i].idfuncionario + '</strong>' + ' - ' + object[i].Notificacion + '<br>';
    }
    $('#md_area_solicitud').html(string);
    if (globalarrayArea[idsolicitud].idarea == 1 || globalarrayArea[idsolicitud].idarea == 2) {
        $('#md_prioridad').val(globalarrayArea[idsolicitud].idprioridad);
        $('#md_tipo_solicitud').val(globalarrayArea[idsolicitud].idtiposolicitud);
        $('#md_estadosolicitud').val(globalarrayArea[idsolicitud].idestadosolicitud);
        if (globalarrayArea[idsolicitud].idarea == 2) {
            $('#md_showequipo').show();
            $('#md_equipo').val(globalarrayArea[idsolicitud].Equipo);
            $('#md_showMarca').show();
            $('#md_Marca').val(globalarrayArea[idsolicitud].Marca);
            $('#md_showModelo').show();
            $('#md_Modelo').val(globalarrayArea[idsolicitud].Modelo);
            $('#md_showSerie').show();
            $('#md_Serie').val(globalarrayArea[idsolicitud].Serie);
        }
    } else {
        $('#md_prioridad').val(globalarrayArea[idsolicitud].idprioridad);
        $('#md_tipo_solicitud').val(globalarrayArea[idsolicitud].idtiposolicitud);
        $('#md_estadosolicitud').val(globalarrayArea[idsolicitud].idestadosolicitud);
        $('#md_prioridad').attr('disabled', true);
        $('#md_tipo_solicitud').attr('disabled', true);
        $('#md_estadosolicitud').attr('disabled', true);
    }
    $('#md_Detalle').modal('show');
}


function showtutorial() {
    introJs().setOption('showBullets', false).start();

}
//++++++++++++++++++++++++++++++++++ funcion para bloquear boton luego de que se haya enviado el formulario ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkSubmit() {
    document.getElementById('divshow').innerHTML = '<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar <ispan class="glyphicon glyphicon-remove" aria-hidden="true"></i>' + '</button><button type="button"  class="btn btn-primary" disabled="disabled">Enviando.. <i class="glyphicon glyphicon-refresh"></button>';
    return true;
}