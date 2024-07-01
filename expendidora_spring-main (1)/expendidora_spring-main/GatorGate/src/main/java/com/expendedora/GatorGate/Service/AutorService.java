package com.expendedora.GatorGate.Service;


import com.expendedora.GatorGate.Model.Autor;

import com.expendedora.GatorGate.Repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {
    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> listarAutores() {
        return autorRepository.findAll();
    }

    public Autor guardarAutor(Autor autor) {
        return autorRepository.save(autor);
    }

    public void eliminarAutorPorId(Long id) {
        autorRepository.deleteById(id);
    }

    public Optional<Autor> obtenerAutorPorId(Long id) {
        return autorRepository.findById(id);
    }

    // Método para actualizar un autor
    public Autor actualizarAutor(Long id, Autor autorActualizado) {
        return autorRepository.findById(id)
                .map(autor -> {
                    autor.setNombre(autorActualizado.getNombre());
                    autor.setApellido(autorActualizado.getApellido());
                    autor.setFechaNacimiento(autorActualizado.getFechaNacimiento());
                    return autorRepository.save(autor);
                })
                .orElse(null);
    }
}