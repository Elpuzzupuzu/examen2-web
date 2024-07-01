$(document).ready(function() {
    cargarLibros();

    // Función para cargar la lista de libros
    function cargarLibros() {
        $.get('http://localhost:8080/machines', function(libros) {
            $('#listaLibros').empty();
            $.each(libros, function(index, libro) {
                $('#listaLibros').append(`<li>${libro.titulo} - Publicado: ${new Date(libro.fechaPublicacion).toLocaleDateString()} - Autor ID: ${libro.autorId} - Precio: $${libro.precio.toFixed(2)}
                <button onclick="editarLibro(${libro.id})">Editar</button>
                <button onclick="eliminarLibro(${libro.id})">Eliminar</button></li>`);
            });
        });
    }

    // Función para guardar o actualizar un libro
    $('#formLibro').submit(function(event) {
        event.preventDefault();
        var libroId = $('#libroId').val();
        var titulo = $('#titulo').val();
        var fechaPublicacion = $('#fechaPublicacion').val();
        var autorId = $('#autorId').val();
        var precio = parseFloat($('#precio').val());

        // Validar fecha de publicación
        var hoy = new Date();
        var fechaSeleccionada = new Date(fechaPublicacion);
        if (fechaSeleccionada > hoy) {
            alert('La fecha de publicación no puede ser una fecha futura.');
            return;
        }

        var libro = {
            titulo: titulo,
            fechaPublicacion: fechaPublicacion,
            autorId: autorId,
            precio: precio
        };

        if (libroId) {
            // Actualizar libro
            $.ajax({
                url: `http://localhost:8080/machines/actualizarlibro/${libroId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(libro),
                success: function(response) {
                    console.log('Libro actualizado:', response);
                    cargarLibros();
                    limpiarFormulario();
                }
            });
        } else {
            // Guardar nuevo libro
            $.ajax({
                url: 'http://localhost:8080/machines/guardarlibro',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(libro),
                success: function(response) {
                    console.log('Nuevo libro guardado:', response);
                    cargarLibros();
                    limpiarFormulario();
                }
            });
        }
    });

    // Función para editar un libro
    window.editarLibro = function(id) {
        $.get(`http://localhost:8080/machines/obtenerlibro/${id}`, function(libro) {
            $('#libroId').val(libro.id);
            $('#titulo').val(libro.titulo);
            $('#fechaPublicacion').val(libro.fechaPublicacion.substring(0, 10)); // Formato yyyy-mm-dd
            $('#autorId').val(libro.autorId);
            $('#precio').val(libro.precio);
        });
    };

    // Función para eliminar un libro
    window.eliminarLibro = function(id) {
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            $.ajax({
                url: `http://localhost:8080/machines/eliminarlibro/${id}`,
                type: 'DELETE',
                success: function(response) {
                    console.log('Libro eliminado:', response);
                    cargarLibros();
                    limpiarFormulario();
                }
            });
        }
    };

    // Función para limpiar el formulario
    function limpiarFormulario() {
        $('#libroId').val('');
        $('#titulo').val('');
        $('#fechaPublicacion').val('');
        $('#autorId').val('');
        $('#precio').val('');
    }
});
