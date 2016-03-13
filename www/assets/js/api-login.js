$(function() {
  $('#submitSesion').on('click touch', function(event) {

    event.preventDefault();

    var dataLogin = $('#formLogin').serialize();

    $.ajax({
      method: 'POST',
      url: 'https://iobo.herokuapp.com/api/v1/login',
      async: true,
      crossDomain: true,
      data: dataLogin,
      cache: false,
      beforeSend: function(){ $("#submitSesion").val('Iniciando...'); },
      success: function(data) {
        $("body").load("home.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "home.html";
      },
      error: function(xhr, textStatus, errorThrown ) {
        $("#submitSesion").val('Iniciar sesión');
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurrio un error, no desistas e intentalo nuevamente",
            timeout: 5000
          });
        } else {
          $.snackbar({
            content: "Usuario y/o contraseña son invalidas, intentalo nuevamente",
            timeout: 5000
          });
        }
      }
    });

    return false;
  });
});
