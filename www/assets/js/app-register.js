$(function() {

  $('#submitRegister').on('click touch', function(event) {

    event.preventDefault();

    var dataRegister = $('#formRegister').serialize();

    $.ajax({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/customer',
      async: true,
      crossDomain: true,
      data: dataRegister,
      cache: false,
      beforeSend: function(){ $("#submitRegister").val('Guardando...'); },
      success: function(data) {
        $("body").load("home.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "home.html";
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
        $("#submitRegister").val('Guardar');
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurri&oacute; un error, no desistas e intentalo nuevamente",
            timeout: 5000
          });
        } else {
          $.snackbar({
            content: "Ocurri&oacute; un error, intentalo nuevamente",
            timeout: 5000
          });
        }
      }
    });

    return false;
  });
});
