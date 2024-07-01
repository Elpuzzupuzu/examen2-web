package com.expendedora.GatorGate.Controller;

import com.expendedora.GatorGate.Model.Libro;
import com.expendedora.GatorGate.Service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Controlador para la clase Machine
@RestController
@RequestMapping("/machines")
@CrossOrigin// ojo soluciona el error del origen de la informacion
public class LibroController {
    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> listarLibros() {
        return libroService.listarLibros();
    }

    @PostMapping("/guardarlibro")
    public Libro guardarLibro(@RequestBody Libro libro) {
        return libroService.guardarLibro(libro);
    }

    @DeleteMapping("eliminarlibro/{id}")
    public void eliminarLibro(@PathVariable Long id) {
        libroService.eliminarLibroPorId(id);
    }

    @GetMapping("obtenerlibro/{id}")
    public Optional<Libro> obtenerLibroPorId(@PathVariable Long id) {
        return libroService.obtenerLibroPorId(id);
    }

    @PutMapping("actualizarlibro/{id}")
    public Libro actualizarLibro(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        return libroService.actualizarLibro(id, libroActualizado);
    }

    // Otros métodos según las operaciones que necesites
}