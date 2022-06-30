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


import br.ifba.edu.inf012.model.Cliente;
import br.ifba.edu.inf012.repository.ClienteRepository;


@RestController
@RequestMapping(path= "/cliente")
public class ClienteResoucer {

	@Autowired
    private ClienteRepository clienteRepository;

    public void ClienteResource(ClienteRepository ClienteRepository) {
        this.clienteRepository = ClienteRepository;
    }

    @PostMapping
    public ResponseEntity<Cliente> save(@RequestBody Cliente Cliente) {
        clienteRepository.save(Cliente);
        return new ResponseEntity<>(Cliente, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAll() {
        List<Cliente> clientes = new ArrayList<>();
        clientes = clienteRepository.findAll();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Cliente>> getById(@PathVariable Integer id) {
        Optional<Cliente> usuario;
        try {
            usuario = clienteRepository.findById(id);
            return new ResponseEntity<Optional<Cliente>>(usuario, HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Optional<Cliente>> deleteById(@PathVariable Integer id) {
        try {
            clienteRepository.deleteById(id);
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Cliente> update(@PathVariable Integer id,@RequestBody Cliente newCliente){
        return clienteRepository.findById(id).map(cliente -> {
            BeanUtils.copyProperties(newCliente, cliente, "id");
            Cliente clienteUpdated = clienteRepository.save(cliente);
            return ResponseEntity.ok().body(clienteUpdated);
        }).orElse(ResponseEntity.notFound().build());
    }

    
    
}
