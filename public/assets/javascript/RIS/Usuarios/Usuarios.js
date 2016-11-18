/**
 * Created by Sistemas on 2/26/2016.
 */
$(document).ready(function () {
    var UrlBuscador = $('#urlbuscadorpaciente').val();
    var Token = $('#_token').val();
    var Paciente = $('#Paciente');
    _BuscadorPacientes(UrlBuscador, Token, Paciente);
});

function MostrarInformacionPaciente() {
    var form = $('#InformacionPacient');
    var data = form.serialize();
    var url = form.attr('action');
    $.post(url, data, function (result) {
        $('#NDocumentoOld').val(result.Paciente.id_paciente);
        $('#NDocumento').val(result.Paciente.id_paciente);
        $('#TDocumento').val(result.Paciente.id_tipo_documento);
        $('#pnombre').val(result.Paciente.nom_1);
        $('#snombre').val(result.Paciente.nom_2);
        $('#papellido').val(result.Paciente.ape_1);
        $('#sapellido').val(result.Paciente.ape_2);
        $('#fnacimiento').val(result.Paciente.fecha_nacimiento);
        $('#genero').val(result.Paciente.id_sexo);
        $('#eps').val(result.Paciente.id_eps);
        $('#EstadoCivil').val(result.Paciente.id_estado_civil);
        $('#ocupacion').val(result.Paciente.ocupacion);
        $('#TipoAfiliacion').val(result.Paciente.id_tipo_afiliacion);
        $('#Nivel').val(result.Paciente.nivel);
        $('#departamento').val(result.cod_dpto);
        $('#municipio').val(result.Paciente.cod_mun);
        $('#barrio').val(result.Paciente.barrio);
        $('#direccion').val(result.Paciente.direccion);
        $('#tel').val(result.Paciente.tel);
        $('#email').val(result.Paciente.email);
        $('#MyModalPacient').modal('show');
    }).fail(function () {
        _notify('Error, intentelo de nuevo',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function GuardarInformacionPaciente() {
    var form = $('#UpdatePaciente');
    var data = form.serialize();
    var url = form.attr('action');
    $.post(url, data, function (result) {
        $('#MyModalPacient').modal('hide');
        _notify('La informacion del paciente ha sido guardada correctamente',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
        $('#Paciente').val('');
    }).fail(function () {
        _notify('Error al guardar el paciente, intentelo de nuevo',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}