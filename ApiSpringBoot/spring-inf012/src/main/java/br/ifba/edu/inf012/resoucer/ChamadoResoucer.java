package br.ifba.edu.inf012.resoucer;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifba.edu.inf012.model.Chamado;
import br.ifba.edu.inf012.repository.ChamadoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@RestController
@RequestMapping(path= "/chamado")
public class ChamadoResoucer {


	@Autowired
    private ChamadoRepository chamadoRepository;

    public void ChamadoResource(ChamadoRepository ChamadoRepository) {
        this.chamadoRepository = ChamadoRepository;
    }

    @PostMapping
    public ResponseEntity<Chamado> save(@RequestBody Chamado Chamado) {
        chamadoRepository.save(Chamado);
        return new ResponseEntity<>(Chamado, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Chamado>> getAll() {
        List<Chamado> chamados = new ArrayList<>();
        chamados = chamadoRepository.findAll();
        return new ResponseEntity<>(chamados, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Chamado>> getById(@PathVariable Integer id) {
        Optional<Chamado> usuario;
        try {
            usuario = chamadoRepository.findById(id);
            return new ResponseEntity<Optional<Chamado>>(usuario, HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Chamado>>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Optional<Chamado>> deleteById(@PathVariable Integer id) {
        try {
            chamadoRepository.deleteById(id);
            return new ResponseEntity<Optional<Chamado>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Chamado>>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Chamado> update(@PathVariable Integer id,@RequestBody Chamado newChamado){
        return chamadoRepository.findById(id).map(chamado -> {
            BeanUtils.copyProperties(newChamado, chamado, "id");
            Chamado chamadoUpdated = chamadoRepository.save(chamado);
            return ResponseEntity.ok().body(chamadoUpdated);
        }).orElse(ResponseEntity.notFound().build());
    }

    
}
