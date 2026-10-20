$(document).ready(function() {
    
    $("#formularioContacto").submit(function(event) {
        
        var esValido = true; 

        $(".text-danger").hide();

        var nombre = $("#nombreUsuario").val();
        var email = $("#emailUsuario").val();
        var region = $("#region").val();
        var sugerencia = $("#sugerencia").val();

        if (nombre == "") {
            $(".error-nombre").show();
            esValido = false;
        }

        if (email == "") {
            $(".error-email").show();
            esValido = false;
        }

        if (region == "") {
            $(".error-region").show();
            esValido = false;
        }

        if (sugerencia == "") {
            $(".error-sugerencia").show();
            esValido = false;
        }

        if (esValido == false) {
            event.preventDefault();
        } else {
            alert("Formulario enviado correctamente.");
        }
    });

    $("#btnLimpiar").click(function(){
        $(".text-danger").hide();
    });
});