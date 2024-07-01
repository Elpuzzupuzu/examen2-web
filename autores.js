$(document).ready(function() {
    cargarAutores();

    // Función para cargar la lista de autores
    function cargarAutores() {
        $.get('http://localhost:8080/api/autores', function(autores) {
            $('#listaAutores').empty();
            $.each(autores, function(index, autor) {
                $('#listaAutores').append(`<li>${autor.nombre} ${autor.apellido} (${new Date(autor.fechaNacimiento).toLocaleDateString()}) 
                <button onclick="editarAutor(${autor.id})">Editar</button>
                <button onclick="eliminarAutor(${autor.id})">Eliminar</button></li>`);
            });
        });
    }

    // Función para guardar o actualizar un autor
    $('#formAutor').submit(function(event) {
        event.preventDefault();
        var autorId = $('#autorId').val();
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var fechaNacimiento = $('#fechaNacimiento').val();

        // Validar fecha de nacimiento
        var hoy = new Date();
        var fechaSeleccionada = new Date(fechaNacimiento);
        if (fechaSeleccionada > hoy) {
            alert('La fecha de nacimiento no puede ser una fecha futura.');
            return;
        }

        var autor = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento
        };

        if (autorId) {
            // Actualizar autor
            $.ajax({
                url: `http://localhost:8080/api/autores/actualizar/${autorId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(autor),
                success: function(response) {
                    console.log('Autor actualizado:', response);
                    cargarAutores();
                    limpiarFormulario();
                }
            });
        } else {
            // Guardar nuevo autor
            $.ajax({
                url: 'http://localhost:8080/api/autores/guardarautor',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(autor),
                success: function(response) {
                    console.log('Nuevo autor guardado:', response);
                    cargarAutores();
                    limpiarFormulario();
                }
            });
        }
    });

    // Función para editar un autor
    window.editarAutor = function(id) {
        $.get(`http://localhost:8080/api/autores/obtener/${id}`, function(autor) {
            $('#autorId').val(autor.id);
            $('#nombre').val(autor.nombre);
            $('#apellido').val(autor.apellido);
            $('#fechaNacimiento').val(autor.fechaNacimiento.substring(0, 10)); // Formato yyyy-mm-dd
        });
    };

    // Función para eliminar un autor
    window.eliminarAutor = function(id) {
        if (confirm('¿Estás seguro de eliminar este autor?')) {
            $.ajax({
                url: `http://localhost:8080/api/autores/eliminar/${id}`,
                type: 'DELETE',
                success: function(response) {
                    console.log('Autor eliminado:', response);
                    cargarAutores();
                    limpiarFormulario();
                }
            });
        }
    };

    // Función para limpiar el formulario
    function limpiarFormulario() {
        $('#autorId').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#fechaNacimiento').val('');
    }
});
