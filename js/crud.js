function obtenerRegistros() {
    try {
        var datos = localStorage.getItem("visitas");
        if (datos) {
            return JSON.parse(datos);
        } else {
            return [];
        }
    } catch (error) {
        mostrarMensaje("Error al leer las visitas guardadas.", true);
        return [];
    }
}

function guardarRegistros(lista) {
    try {
        localStorage.setItem("visitas", JSON.stringify(lista));
        return true;
    } catch (error) {
        mostrarMensaje("Error al guardar la visita.", true);
        return false;
    }
}

function crearRegistro(nuevoRegistro) {
    var lista = obtenerRegistros();
    lista.push(nuevoRegistro);
    return guardarRegistros(lista);
}

function actualizarRegistro(indice, registroEditado) {
    var lista = obtenerRegistros();
    if (indice >= 0 && indice < lista.length) {
        lista[indice] = registroEditado;
        return guardarRegistros(lista);
    }
    return false;
}

function eliminarRegistro(indice) {
    var confirmar = confirm("¿Seguro que deseas cancelar y eliminar esta visita?");
    if (confirmar) {
        var lista = obtenerRegistros();
        lista.splice(indice, 1);
        if (guardarRegistros(lista)) {
            if ($("#editIndex").val() !== "") {
                $("#formularioContacto")[0].reset();
                cancelarEdicion();
            }
            mostrarRegistros();
            mostrarMensaje("Visita eliminada correctamente.", false);
        }
    }
}

function editarRegistro(indice) {
    var lista = obtenerRegistros();
    var registro = lista[indice];

    if (registro) {
        $(".text-danger").hide();
        $("#mensaje-exito").hide();
        $("#mensaje-error").hide();

        $("#nombreUsuario").val(registro.nombre);
        $("#emailUsuario").val(registro.email);
        $("#lugar").val(registro.lugar);
        $("#fechaVisita").val(registro.fechaVisita);
        $("#personas").val(registro.personas);
        $("#sugerencia").val(registro.sugerencia);

        $("#editIndex").val(indice);
        $("#btnEnviar").text("Actualizar visita");
        $("#btnCancelarEdicion").show();
    }
}

function cancelarEdicion() {
    $("#editIndex").val("");
    $("#btnEnviar").text("Solicitar visita");
    $("#btnCancelarEdicion").hide();
}

function obtenerNombreLugar(valor) {
    var texto = $("#lugar option[value='" + valor + "']").text();
    if (texto !== "") {
        return texto;
    }
    return valor;
}

function mostrarMensaje(texto, esError) {
    $("#mensaje-exito").hide();
    $("#mensaje-error").hide();

    if (esError) {
        $("#mensaje-error").text(texto).show();
    } else {
        $("#mensaje-exito").text(texto).show();
    }
}

function mostrarRegistros() {
    var lista = obtenerRegistros();
    var contenedor = $("#listaRegistros");

    if (lista.length === 0) {
        contenedor.html('<p class="text-muted text-center mb-0">Aún no hay visitas programadas.</p>');
        return;
    }

    var html = '<div class="table-responsive">';
    html += '<table class="table table-striped table-bordered align-middle mb-0">';
    html += '<thead><tr>';
    html += '<th>#</th>';
    html += '<th>Visitante</th>';
    html += '<th>Correo</th>';
    html += '<th>Destino</th>';
    html += '<th>Fecha Visita</th>';
    html += '<th>Personas</th>';
    html += '<th>Comentarios</th>';
    html += '<th>Acciones</th>';
    html += '</tr></thead><tbody>';

    for (var i = 0; i < lista.length; i++) {
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + lista[i].nombre + '</td>';
        html += '<td>' + lista[i].email + '</td>';
        html += '<td>' + obtenerNombreLugar(lista[i].lugar) + '</td>';
        html += '<td>' + lista[i].fechaVisita + '</td>';
        html += '<td>' + lista[i].personas + '</td>';
        html += '<td>' + lista[i].sugerencia + '</td>';
        html += '<td class="text-nowrap">';
        html += '<button type="button" class="btn btn-sm btn-primary me-1" onclick="editarRegistro(' + i + ')">Editar</button>';
        html += '<button type="button" class="btn btn-sm btn-danger" onclick="eliminarRegistro(' + i + ')">Eliminar</button>';
        html += '</td>';
        html += '</tr>';
    }

    html += '</tbody></table></div>';
    contenedor.html(html);
}

function procesarFormulario() {
    var datos = {
        nombre: $("#nombreUsuario").val().trim(),
        email: $("#emailUsuario").val().trim(),
        lugar: $("#lugar").val(),
        fechaVisita: $("#fechaVisita").val(),
        personas: $("#personas").val(),
        sugerencia: $("#sugerencia").val().trim()
    };

    var indice = $("#editIndex").val();

    if (indice === "") {
        if (crearRegistro(datos)) {
            mostrarMensaje("¡Visita registrada correctamente!", false);
            $("#formularioContacto")[0].reset();
            mostrarRegistros();
        }
    } else {
        if (actualizarRegistro(parseInt(indice), datos)) {
            mostrarMensaje("¡Visita actualizada correctamente!", false);
            $("#formularioContacto")[0].reset();
            cancelarEdicion();
            mostrarRegistros();
        }
    }
}

$(document).ready(function() {
    mostrarRegistros();

    $("#btnCancelarEdicion").click(function() {
        $("#formularioContacto")[0].reset();
        $(".text-danger").hide();
        cancelarEdicion();
    });
});