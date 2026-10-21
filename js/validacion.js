$(document).ready(function() {
    
    $("#formularioContacto").submit(function(event) {
        
        var esValido = true; 

        // Ocultamos todos los mensajes rojos y el mensaje de éxito al intentar enviar
        $(".text-danger").hide();
        $("#mensaje-exito").hide();

        var nombre = $("#nombreUsuario").val().trim();
        var email = $("#emailUsuario").val().trim();
        var region = $("#region").val();
        var sugerencia = $("#sugerencia").val().trim();

        // Verificamos si el nombre contiene algún número del 0 al 9
        var tieneNumeros = /[0-9]/.test(nombre);

        // Validación del nombre (vacío o con números)
        if (nombre === "") {
            $(".error-nombre").text("Por favor, ingresa tu nombre.").show();
            esValido = false;
        } else if (tieneNumeros) {
            $(".error-nombre").text("El nombre no puede contener números.").show();
            esValido = false;
        }

        if (email === "") {
            $(".error-email").show();
            esValido = false;
        }

        if (region === "") {
            $(".error-region").show();
            esValido = false;
        }

        if (sugerencia === "") {
            $(".error-sugerencia").show();
            esValido = false;
        }

        // Si hay errores, frenamos el envío
        if (esValido === false) {
            event.preventDefault();
        } else {
            // Si todo está bien, frenamos la recarga de página para ver el mensaje verde
            event.preventDefault(); 
            $("#mensaje-exito").show();
            $("#formularioContacto")[0].reset(); // Limpia el formulario automáticamente
        }
    });

    // Ocultar mensajes al presionar el botón Limpiar
    $("#btnLimpiar").click(function(){
        $(".text-danger").hide();
        $("#mensaje-exito").hide();
    });
});