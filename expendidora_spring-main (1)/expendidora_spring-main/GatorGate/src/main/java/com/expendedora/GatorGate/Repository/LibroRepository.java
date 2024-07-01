package com.expendedora.GatorGate.Repository;

import com.expendedora.GatorGate.Model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {
    // Puedes añadir métodos personalizados si es necesario
}




