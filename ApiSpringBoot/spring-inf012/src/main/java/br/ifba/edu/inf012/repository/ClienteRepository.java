package br.ifba.edu.inf012.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ifba.edu.inf012.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,Integer>{

}
