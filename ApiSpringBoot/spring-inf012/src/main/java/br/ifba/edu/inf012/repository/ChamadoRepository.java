package br.ifba.edu.inf012.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ifba.edu.inf012.model.Chamado;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado,Integer>{

}
