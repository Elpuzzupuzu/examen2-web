package com.expendedora.GatorGate.Repository;

import com.expendedora.GatorGate.Model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutorRepository extends JpaRepository<Autor, Long> {
    // Puedes añadir métodos personalizados si es necesario
}
