function PrintTableRis() {
    var fecha, sede, servicio, content, mensaje, urlimage, image;

    fecha = $('#Fecha').val();
    sede = $('#Sede').val();
    servicio = $('#Servicio').val();
    content = $('#conten');
    image = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);
    if (fecha == '' || sede == '' || servicio == '') {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    } else {
        var form, data, url;
        form = $('#TomaEstudiosPendientes');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Tabla);
            $("#" + result.idtable).dataTable({
                formatters: {
                    "commands": function (column, row) {
                        return result.Actions;
                    }
                }
            });
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

function PrintTableMisTomados() {
    var fecha, content, urlimage, image;

    fecha = $('#FechaTomados').val();
    content = $('#contentrealizados');
    image = '<div class="preloader pl-xxl">' +
        '<svg class="pl-circular" viewBox="25 25 50 50">' +
        '<circle class="plc-path" cx="50" cy="50" r="20" />' +
        '</svg>' +
        '</div>';
    content.html(image);

    if (fecha == '') {
        mensaje = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <div class="alert alert-danger alert-white rounded">' +
            '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
            '<div class="icon">' +
            '<i class="fa fa fa-times-circle"></i>' +
            '</div>' +
            '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
            '</div>' +
            '</div>';
        content.html(mensaje);
    } else {
        var form, data, url;
        form = $('#MisEstudiosTomados');
        url = form.attr('action');
        data = form.serialize();
        $.post(url, data, function (result) {
            content.html(result.Tabla);
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

function ShowModalTomarEstudioNoIonizante(idinforme, nombrepaciente, nombreestudio, idservicio, anestesia) {
    var Html = '<h5><strong>Nombre del estudio: </strong>' + nombreestudio + ' <br><br>' +
        '<strong>Nombre del paciente: </strong>' + nombrepaciente + '</h5><br>';
    $('#noionizanteservicio').val(idservicio);
    $('#noionizanteanestesia').val(anestesia);
    if (idservicio == 10 && anestesia == 1) {
        Html += ' <div class="input-group fg-float">' +
            '<span class="input-group-addon">' +
            '<i class="zmdi zmdi-account"></i>' +
            '</span>' +
            '<div class="fg-line">' +
            '<input type="text" class="form-control" id="anestesiologo" name="anestesiologo">' +
            '<label class="fg-label">Anestesi&oacute;logo</label>' +
            '</div>' +
            '</div>';
    }
    Html += '<h5 align="center">¿Desea marcar como realizado con lectura?</h5>';
    $('#IdInformeNoionizante').val(idinforme);
    $('#notificacionNoIonizante').html(Html);
    $('#tm_TomarEstudioNoIonizante').modal('show');
}


function validatecheck()
{
    $('#lecthidden').val($("input[name='lectura']:checked").val());
}

function ShowModalTomarEstudioIonizante(idinforme, nombrepaciente, nombreestudio, documento, edad, peso, tecnica,
                                        extremidad, servicio, portatil, espacios)
{


    var divexposiciones = '';
    var imagenesdanadas = '';
    var divlectura='<br>' +
        '<div class="form-group">' +
        '<label class="radio radio-inline m-r-20">'+
        '<input type="radio" name="lectura" id="lectura" value="2" onclick="validatecheck()">'+
        '<i class="input-helper"></i>'+
        'Con lectura'+
        '</label>'+

        '<label class="radio radio-inline m-r-20">'+
        '<input type="radio" name="lectura" id="lectura" value="10" onclick="validatecheck()">'+
        '<i class="input-helper"></i>'+
        'Sin lectura'+
        '</label>' +
        '</div>' +
        '<input type="hidden" id="lecthidden" name="lecthidden">';
        var lect=$('#showlectura').html('');
            lect.hide();

    if (servicio == 1) {
        divexposiciones = '<div class="form-group">' +
            '<label for="r_innecesarias">N° Exposiciones a la Radiaci&oacute;n</label>' +
            '<input type="number" name="r_innecesarias" id="r_innecesarias" class="form-control"' +
            ' value="" placeholder="Exposiciones"/>' +
            '</div>';
        imagenesdanadas = '<div class="form-group">' +
            '<label for="r_innecesarias">Imagenes dañadas</label>' +
            '<input type="number" name="r_innecesarias" id="r_innecesarias" class="form-control"' +
            ' value="" placeholder="Imagenes dañadas"/>' +
            '</div>';

        if (portatil == 1) {
            $('#showfoco').hide();
        } else {
            $('#showfoco').show();
        }

        $('#showdosisrx').show();
        $('#shownuevadosis').show();
    }
    else
    {
        $('#showdosisrx').hide();
        $('#shownuevadosis').hide();
    }
    if (servicio == 2)
    {
        divexposiciones = '<div class="form-group">' +
            '<label for="r_innecesarias">N° Exposiciones a la Radiaci&oacute;n</label>' +
            '<input type="number" name="r_innecesarias" id="r_innecesarias" class="form-control"' +
            ' value="0" placeholder="imagenes dañadas"/>' +
            '</div>';
        imagenesdanadas = '<div class="form-group">' +
            '<label for="r_innecesarias">Imagenes dañadas</label>' +
            '<input type="number" name="r_innecesarias" id="r_innecesarias" class="form-control"' +
            ' value="" placeholder="Imagenes dañadas"/>' +
            '</div>';
        if (espacios == 1) {
            $('#ShowEspacios').show();
        } else {
            $('#ShowEspacios').hide();
        }
        $('#showdosistomo').show();
    } else {
        $('#showdosistomo').hide();
    }

    if(servicio==1 || servicio==3 || servicio==51 || servicio==54){}
    {
        lect.html(divlectura)
        lect.show();
    }

    if (servicio == 4 || servicio == 5 || servicio == 23)
    {
        $('#showdosishemo').show();
    }
    else
    {
        $('#showdosishemo').hide();
    }

    $('#portatil').val(portatil);
    $('#estadistica')[0].reset();
    $('#observacion').text('');
    $('#sotano').attr('checked', false);
    $('#lectura').prop('checked', false);
    $('#divclon').html('');
    $('#showtiempoadd').html('');
    $('#NoSuccess').html('');
    $('#showexposiciones').html(divexposiciones);
    $('#showimagenesdanadas').html(imagenesdanadas);
    $('#idservicio').val(servicio);
    $('#IdInformeionizante').val(idinforme);

    $('#MAS').val('');
    $('#KV').val('');
    $('#distancia').val('');
    $('foco').val('');


    var document = '<h5><strong>N° de identificacion: </strong><i>' + documento + '</i></h5>';
    $('#div_documento').html(document);
    var nombre = ' <h5><strong>Nombres y Apellidos: </strong><i>' + nombrepaciente + '</i></h5>';
    $('#div_nombrecompleto').html(nombre);
    var Edad = '<h5><strong>Edad: </strong><i>' + edad + '</i></h5>';
    $('#div_edad').html(Edad);
    var Peso = ' <h5><strong>Peso: </strong>' + peso + ' Kilogramos</h5>';
    $('#div_peso').html(Peso);
    var estudio = '<h5><strong>Estudio: </strong><i>' + nombreestudio + '</i></h5>';
    $('#estudio').html(estudio);
    var Tecnica = '<h5><strong>Tecnica: </strong><i>' + tecnica + '</i></h5>';
    $('#tecnica').html(Tecnica);
    var Extremidad = '<h5><strong>Extremidad: </strong><i>' + extremidad + '</i></h5>';
    $('#extremidad').html(Extremidad);

    $('#tm_TomarEstudioIonizante').modal('show');
}

function TomarEstudioNoIonizante() {
    var form, url, data, servicio, anestesia, anestesiologo, state;
    form = $('#UrlTomarEstudioNoIonizante');
    url = form.attr('action');
    data = form.serialize();
    servicio = $('#noionizanteservicio').val();
    anestesia = $('#noionizanteanestesia').val();
    if (servicio == 10 && anestesia == 1) {
        anestesiologo = $('#anestesiologo').val();
        if (anestesiologo == '') {
            state = false;
        }
        else {
            state = true;
        }
    }
    else {
        state = true
    }
    if (state) {
        $.post(url, data, function (result) {
            PrintTableRis();
            $('#tm_TomarEstudioNoIonizante').modal('hide');
            _notify('El estudio ha sido guardado correctamente, ahora se encuentra en el listado de pendientes por lectura',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');

        }).fail(function () {
            _notify('Ocurrio un error al intentar tomar el estudio, por favor intentelo nuevamente o contacta al equipo de sistemas',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    } else {
        _notify('El campo anestesi&oacute;logo es un campo obligatorio', 'warning',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
}

function TomarEstudioIonizante() {

    var servicio = $('#idservicio').val();
    var portatil = $('#portatil').val();
    var lectura = $("input[name='lectura']:checked").val();
    var success = false;
    var error = '';
    var Nexposiciones = $('#r_innecesarias').val();
    if (servicio == 1) {
        var MAS = $('#MAS').val();
        var KV = $('#KV').val();
        var Distancia = $('#distancia').val();
        dosis = $('#Dosis').val();
        var foco = foco = $('#foco').val();
        if (MAS == '' || KV == '' || Distancia == '' || dosis == '' || dosis == 0 || (portatil != 1 && foco == '') ||
            Nexposiciones == '' || Nexposiciones == 0) {
            success = false;
            error = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-danger alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon">' +
                '<i class="fa fa fa-times-circle"></i>' +
                '</div>' +
                '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
                '</div>' +
                '</div>';
        } else {
            success = true;
        }
    }
    if (servicio == 2) {
        var DLP = $('#DLP').val();
        var dosis = $('#dosistomo').val();

        if (DLP == '' || DLP == 0 || dosis == '' || dosis == 0 || Nexposiciones == '' || Nexposiciones == 0) {
            error = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-danger alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon">' +
                '<i class="fa fa fa-times-circle"></i>' +
                '</div>' +
                '<strong>Todos los campos son obligatorios. Por Favor Intentelo Nuevamente. </strong>' +
                '</div>' +
                '</div>';
            success = false;
        } else {
            success = true;
        }
    }
    if (servicio == 4 || servicio == 5 || servicio == 23) {
        var fluoroscopia = $('#tiempofluoroscopia').val();
        if (fluoroscopia == '') {
            success = false;
            error = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                ' <div class="alert alert-danger alert-white rounded">' +
                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' +
                '<div class="icon">' +
                '<i class="fa fa fa-times-circle"></i>' +
                '</div>' +
                'El campo <strong>Tiempo Fluoroscopia</strong> es un campo Obligatorio' +
                '</div>' +
                '</div>';
        } else {
            success = true
        }
    }

    if(servicio==1 || servicio==3 || servicio==51 || servicio==54)
    {
        if(lectura==undefined)
        {
            _notify('El campo lectura es obligatorio','danger','animated bounceInLeft','animated bounceOutLeft');
            success=false;
        }else
        {
            success=true;
        }
    }


    if (success) {
        var form = $('#estadistica');
        var url = form.attr('action');
        var data = form.serialize();
        $.post(url, data, function (result) {
            $('#tm_TomarEstudioIonizante').modal('hide');
            _notify('El estudio ha sido guardado correctamente, ahora se encuentra en el listado de pendientes por lectura',
                'success',
                'animated bounceInLeft',
                'animated bounceOutLeft');
            //$('#conten').html('');
            PrintTableRis();
        }).fail(function () {
            _notify('Ocurrio un error al intentar tomar el estudio, por favor intentelo nuevamente o contacta al equipo de sistemas',
                'danger',
                'animated bounceInLeft',
                'animated bounceOutLeft');
        });
    } else {
        $('#NoSuccess').html(error);
    }

}

function Changedosis() {
    var dosis = $('#Dosis0').val();
    $('#Dosis').val(dosis);
}
function calculatedose(ide) {
    var id = ide;
    if (ide == undefined) {
        id = '';
    }
    var portatil, foco, distancia, ma, kv, totaldose;
    portatil = $('#portatil').val() != '' ? parseFloat($('#portatil').val()) : '';
    foco = $('#foco' + id).val() != '' ? parseFloat($('#foco' + id).val()) : '';
    distancia = $('#distancia' + id).val() != '' ? parseFloat($('#distancia' + id).val()) : '';
    ma = $('#MAS' + id).val() != '' ? parseFloat($('#MAS' + id).val()) : '';
    kv = $('#KV' + id).val() != '' ? parseFloat($('#KV' + id).val()) : '';
    totaldose = 0;
    if (portatil == 0 && foco != '' && distancia != '' && ma != '' && kv != '') {
        distancia = (distancia * distancia);
        totaldose = (((((0.93 * kv) / 100) * foco) / (distancia)) / 60) * (ma / foco) * 0.96;
        totaldose = totaldose.toFixed(6);
        $('#Dosis' + id).val(totaldose);
    } else if (portatil == 1 && distancia != '' && ma != '' && kv != '') {
        totaldose = ((0.93 / 600) * kv * ma) / distancia;
        totaldose = totaldose.toFixed(6);
        $('#Dosis' + id).val(totaldose);
    }
    calculatetotaldose();
}

function calculatetotaldose() {
    var contador = $('#contador').val();
    con = 0;
    totaldose = 0;
    totalma = 0;
    totalkv = 0;
    totalfoco = 0;
    totaldistancia = 0;
    while (con != contador) {
        dose = $('#Dosis' + con).val();
        ma = $('#MAS' + con).val();
        kv = $('#KV' + con).val();
        distancia = $('#distancia' + con).val();
        foco = $('#foco' + con).val();
        if (dose == undefined || dose == '') {
            dose = 0;
        }
        if (ma == undefined || ma == '') {
            ma = 0;
        }
        if (kv == undefined || kv == '') {
            kv = 0;
        }
        if (distancia == undefined || distancia == '') {
            distancia = 0;
        }
        if (foco == undefined || foco == '') {
            foco = 0;
        }
        totaldose += parseFloat(dose);
        totalma += parseFloat(ma);
        totalkv += parseFloat(kv);
        totaldistancia += parseFloat(distancia);
        totalfoco += parseFloat(foco);
        con += 1;
    }
    $('#Dosis').val(parseFloat(totaldose).toFixed(6));
    $('#MAS').val(parseInt(totalma));
    $('#KV').val(parseInt(totalkv));
    $('#distancia').val(parseInt(totaldistancia));
    $('#foco').val(parseInt(totalfoco));


}

function totaltiempofluoroscopia() {
    var totalinputs = parseInt(nextinput);
    var totalfluoroscopia = 0;
    var fluoroscopia = 0;
    var i = parseInt(0);
    while (i != totalinputs) {
        fluoroscopia = parseInt($('#campo' + i).val());
        if (fluoroscopia == '' || fluoroscopia == undefined) {
            fluoroscopia = 0;
        }
        totalfluoroscopia = parseInt(totalfluoroscopia) + parseInt(fluoroscopia);
        i += 1;
    }
    $('#tiempofluoroscopia').val(totalfluoroscopia);
    if (totalfluoroscopia > 20) {
        _notify('El tiempo de fluoroscopia (' + totalfluoroscopia + ') es superior al recomendado (20)',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    }
}

var numero = 1;
function Clonar() {
//Creamos un DIv pa1ra generar el array
    var portatil = $('#portatil').val();
    var numero = $('#contador').val();
    $divrow = $('<div class="row"></div>');
    $divma = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>');
    $divkv = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>');
    $divfoco = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>');
    $divdistancia = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>');
    $divdosis = $('<div class="col-lg-4 col-md-4 col-sm-4 col-xs-2"></div>');
    $ma = $('<div class="form-group"><label for="MAS' + numero + '">MA:</label>' +
        '<input type="text" name="MAS' + numero + '" id="MAS' + numero + '" class="form-control" placeholder="MAS" onblur="calculatedose(' + numero + ')"/></div>');
    $kv = $('<div class="form-group"><label for="KV' + numero + '">KV:</label>' +
        '<input type="text" name="KV' + numero + '" id="KV' + numero + '" class="form-control" placeholder="KV" onblur="calculatedose(' + numero + ')"/></div>');
    $distancia = $('<div class="form-group"><label for="distancia' + numero + '">Distancia:</label>' +
        '<input type="text" name="distancia' + numero + '" id="distancia' + numero + '" class="form-control" placeholder="Distancia" onblur="calculatedose(' + numero + ')"/></div>');
    $dosis = $('<div class="form-group"><label for="Dosis' + numero + '">Total Dosis (mSv):</label>' +
        '<input type="text" name="Dosis' + numero + '" id="Dosis' + numero + '" onchange="calculatetotaldose()" class="form-control" placeholder="Total Dosis de Radiacción" readonly/></div>');
    $divma.append($ma);
    $divkv.append($kv);
    $divdistancia.append($distancia);
    $divdosis.append($dosis);
    $divrow.append($divma);
    $divrow.append($divkv);
    $divrow.append($divdistancia);
    if (portatil != '1') {
        $foco = $('<div class="form-group"><label for="foco' + numero + '">Foco:</label>' +
            '<input type="text" name="foco' + numero + '" id="foco' + numero + '" class="form-control  " placeholder="Foco" onblur="calculatedose(' + numero + ')"/></div>');
        $divfoco.append($foco);
        $divrow.append($divfoco);
    } else {
        $divrow.append($divfoco);
    }
    $divrow.append($divdosis);
    $('#divclon').append($divrow);
    numero = parseInt(numero) + 1;
    $('#contador').val(numero);
}

var nextinput = 1;
function AgregarCampos() {

    campo = '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
        '<label for="campo' + nextinput + '"></label><br>' +
        '<input type="number"  class="form-control" style="width: 5em" id="campo' + nextinput + '" name="campo' + nextinput + '" ' +
        'onblur="totaltiempofluoroscopia()" value="0" /></div>';
    $("#showtiempoadd").append(campo);
    nextinput++;
}