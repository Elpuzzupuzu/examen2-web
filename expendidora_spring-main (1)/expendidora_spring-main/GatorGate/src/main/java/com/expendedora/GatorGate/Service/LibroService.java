package com.expendedora.GatorGate.Service;

import com.expendedora.GatorGate.Model.Libro;
import com.expendedora.GatorGate.Repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {
    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> listarLibros() {
        return libroRepository.findAll();
    }

    public Libro guardarLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    public void eliminarLibroPorId(Long id) {
        libroRepository.deleteById(id);
    }

    public Optional<Libro> obtenerLibroPorId(Long id) {
        return libroRepository.findById(id);
    }

    // Método para actualizar un libro
    public Libro actualizarLibro(Long id, Libro libroActualizado) {
        return libroRepository.findById(id)
                .map(libro -> {
                    libro.setTitulo(libroActualizado.getTitulo());
                    libro.setFechaPublicacion(libroActualizado.getFechaPublicacion());
                    libro.setAutorId(libroActualizado.getAutorId());
                    libro.setPrecio(libroActualizado.getPrecio());
                    return libroRepository.save(libro);
                })
                .orElse(null);
    }
}