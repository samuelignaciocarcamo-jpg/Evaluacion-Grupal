function validarFormulario() {
    var esValido = true;

    $(".text-danger").hide();
    $("#mensaje-exito").hide();
    $("#mensaje-error").hide();

    var nombre = $("#nombreUsuario").val().trim();
    var email = $("#emailUsuario").val().trim();
    var lugar = $("#lugar").val();
    var fechaVisita = $("#fechaVisita").val();
    var personas = $("#personas").val();

    var tieneNumeros = /[0-9]/.test(nombre);

    if (nombre === "") {
        $(".error-nombre").text("Por favor, ingresa tu nombre.").show();
        esValido = false;
    } else if (tieneNumeros) {
        $(".error-nombre").text("El nombre no puede contener números.").show();
        esValido = false;
    }

    if (email === "") {
        $(".error-email").text("Por favor, ingresa tu correo.").show();
        esValido = false;
    } else if (email.includes("@") === false) {
        $(".error-email").text("El correo debe contener un '@'.").show();
        esValido = false;
    }

    if (lugar === "") {
        $(".error-lugar").show();
        esValido = false;
    }

    if (fechaVisita === "") {
        $(".error-fecha").text("Selecciona la fecha en que deseas ir.").show();
        esValido = false;
    }

    if (personas === "" || parseInt(personas) < 1) {
        $(".error-personas").text("Ingresa al menos 1 visitante.").show();
        esValido = false;
    }

    return esValido;
}

$(document).ready(function() {
    $("#formularioContacto").submit(function(event) {
        event.preventDefault();

        if (validarFormulario()) {
            procesarFormulario();
        }
    });

    $("#btnLimpiar").click(function() {
        $(".text-danger").hide();
        $("#mensaje-exito").hide();
        $("#mensaje-error").hide();
        cancelarEdicion();
    });
});