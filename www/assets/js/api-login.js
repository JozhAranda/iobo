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
