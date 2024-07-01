package com.expendedora.GatorGate.Controller;

import com.expendedora.GatorGate.Model.Autor;
import com.expendedora.GatorGate.Repository.AutorRepository;
import com.expendedora.GatorGate.Service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Controlador para la clase Product

@RestController
@RequestMapping("/api/autores")
public class AutorController {
    @Autowired
    private AutorService autorService;

    @GetMapping
    public List<Autor> listarAutores() {
        return autorService.listarAutores();
    }

    @PostMapping("/guardarautor")
    public Autor guardarAutor(@RequestBody Autor autor) {
        return autorService.guardarAutor(autor);
    }

    @DeleteMapping("eliminar/{id}")
    public void eliminarAutor(@PathVariable Long id) {
        autorService.eliminarAutorPorId(id);
    }

    @GetMapping("obtener/{id}")
    public Optional<Autor> obtenerAutorPorId(@PathVariable Long id) {
        return autorService.obtenerAutorPorId(id);
    }

    @PutMapping("actualizar/{id}")
    public Autor actualizarAutor(@PathVariable Long id, @RequestBody Autor autorActualizado) {
        return autorService.actualizarAutor(id, autorActualizado);
    }

    // Otros métodos según las operaciones que necesites
}

