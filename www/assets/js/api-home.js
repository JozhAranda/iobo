$(function()
  $('a.viewDiscover').on('click touch', function(event) {
    console.log('12345');
    event.preventDefault();

    var value = $(this).attr('title');

    console.log(value);

    $.ajax({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/jobs/' + value,
      async: true,
      crossDomain: true,
      cache: false,
      success: function(data) {
        $("body").load("discover.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "discover.html";
      },
      error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
          }
          return;
        }
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
