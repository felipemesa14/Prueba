$(document).ready(function () {
    $('#TablaUsuarios').dataTable();
});

function OpenModalUsuarios(idfuncionario) {
    $('#id_funcionario').val(idfuncionario);
    var token = $('#_token').val();
    var url = $('#UrlOpenModelUsuario').val();
    var data = 'id_funcionario=' + idfuncionario + '&_token=' + token;
    $.post(url, data, function (result) {
        $('#id_tipo_documento').val(result.Funcionario.id_tipo_documento);
        $('#nombres').val(result.Funcionario.nombres);
        $('#apellidos').val(result.Funcionario.apellidos);
        $('#fecha_nacimiento').val(result.Funcionario.fecha_nacimiento);
        $('#cod_dpto').val(result.DepartamentoSelect.cod_dpto);
        $('#cod_mun').val(result.Funcionario.cod_mun);
        $('#direccion').val(result.Funcionario.direccion);
        $('#telefonos').val(result.Funcionario.telefonos);
        $('#email').val(result.Funcionario.email);
        $('#id_grupo_empleado').val(result.Funcionario.id_grupo_empleado);
        $('#id_estado').val(result.Funcionario.id_estado);
        $('#salario').val(result.Funcionario.salario);
        $('#aux_transporte').val(result.Funcionario.aux_transporte);
        if (result.Especialista != null) {
            $('#reg_medico').val(result.Especialista.reg_medico);
            $('#id_especialidad').val(result.Especialista.id_especialidad);
            $('#id_universidad').val(result.Especialista.id_universidad);
            var pathfirmas = $('#pathfirmas').val();
            $('#url_firma').attr("src", pathfirmas + '/' + result.Especialista.url_firma);
            if (result.Especialista.firma_respaldo == '1') {

                $('#firma_respaldo').prop('checked', true);

            }
        }
        DivEspecial();
        $('#ModalUsuarios').modal('show');
    }).fail(function () {
        _notify('Ocurrio un error al intentar abrir la modal, por favor intentelo nuevamente.',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}

function OpenModalNewUser() {
    $('#ModalUsuarios').modal('show');
}

function GuardarUsuario() {
    var form = $('#FormUsuario');
    var url = form.attr("action");
    var data = new FormData(form[0]);
    var UrlRespuesta = $('#UrlRespuesta').val();
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        processData: false,
        contentType: false
    }).done(function (data) {
        _notify('El usuario se guardo correctamente',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
        $('#ModalUsuarios').modal('hide');
        location.href = UrlRespuesta;
    }).fail(function () {
        _notify('Ocurrio un error al intentar guardar, por favor intentelo nuevamente.',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}
function Close() {
    $('#FormUsuario')[0].reset();
    $('#FormPermisosUsuario')[0].reset();
    $('input:checkbox').removeAttr('checked');
}
function DivEspecial() {
    var id_grupo_empleado = $('#id_grupo_empleado').val();
    if (id_grupo_empleado == 4) {
        $('#DivEspecialistas').show();
    } else {
        $('#DivEspecialistas').hide();
    }
}
function ModalPermisosUsuarios(id_funcionario) {
    $('#id_funcionario_permisos').val(id_funcionario);
    var token = $('#_token').val();
    var url = $('#URLPermisos').val();
    var data = 'id_funcionario=' + id_funcionario + '&_token=' + token;
    $.post(url, data, function (result) {
        $('#Nombres').val(result.Nombres);
        $('#Check').html(result.Html);
        $('#ModalPermisosUsuario').modal('show');
    }).fail(function () {
        _notify('Ocurrio un error al intentar abrir la modal, por favor intentelo nuevamente.',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });
}
function GuardarPermisos() {
    var checkboxValues = "";
    $('input[type="checkbox"]:checked').each(function () {
        if ($(this).val() != 'on') {
            checkboxValues += $(this).val() + ",";
        }
    });
    checkboxValues = checkboxValues.substring(0, checkboxValues.length - 1);
    var form = $('#FormPermisosUsuario');
    var url = form.attr('action');
    var token = $('#_token').val();
    var funcionario = $('#id_funcionario_permisos').val();
    var data = '_token=' + token + '&modulos=' + checkboxValues + '&id_funcionario=' + funcionario;
    $.post(url, data, function () {
        _notify('Permisos Guardados correctamente',
            'success',
            'animated bounceInLeft',
            'animated bounceOutLeft');
        $('#ModalPermisosUsuario').modal('hide');
    }).fail(function () {
        _notify('Ocurrio un error al guardar, por favor intentelo nuevamente.',
            'danger',
            'animated bounceInLeft',
            'animated bounceOutLeft');
    });

}