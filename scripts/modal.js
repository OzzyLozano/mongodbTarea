$(document).ready(function() {
  // Mostrar el modal al hacer clic en el enlace
  $('#add-book-link').on('click', function(e) {
    e.preventDefault();
    $('#modal').addClass('show'); // Agregar la clase "show" al modal
  });

  // Cerrar el modal al hacer clic en el botón de cierre o fuera del modal
  $('.close, .modal').on('click', function() {
    $('#modal').removeClass('show'); // Quitar la clase "show" del modal
  });

  // Evitar que hacer clic en el contenido del modal lo cierre
  $('.modal-content').on('click', function(e) {
    e.stopPropagation();
  });

  // Evitar el cierre del modal al presionar Enter
  $('.modal-content').on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
});
