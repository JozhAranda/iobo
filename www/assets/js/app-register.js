/*
Copyright (C) 2016 Joshua Aranda
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
$(function() {

  $('#submitRegister').on('click touch', function(event) {

    event.preventDefault();

    var dataRegister = $('#formRegister').serialize();

    $.ajax({
      method: 'POST',
      url: 'https://iobo.herokuapp.com/api/v1/customer',
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
