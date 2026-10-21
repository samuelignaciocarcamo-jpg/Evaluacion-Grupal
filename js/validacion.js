$(document).ready(function() {
    
    $("#formularioContacto").submit(function(event) {
        
        var esValido = true; 

        $(".text-danger").hide();
        $("#mensaje-exito").hide();

        var nombre = $("#nombreUsuario").val().trim();
        var email = $("#emailUsuario").val().trim();
        var region = $("#region").val();
        var sugerencia = $("#sugerencia").val().trim();

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

        }

        if (region === "") {
            $(".error-region").text("Por favor, selecciona una región.").show();
            esValido = false;
        }

        if (sugerencia === "") {
            $(".error-sugerencia").show();
            esValido = false;
        }

        if (esValido === false) {
            event.preventDefault();
        } else {
            event.preventDefault(); 
            $("#mensaje-exito").show();
            $("#formularioContacto")[0].reset(); 
        }
    });

    $("#btnLimpiar").click(function(){
        $(".text-danger").hide();
        $("#mensaje-exito").hide();
    });
});