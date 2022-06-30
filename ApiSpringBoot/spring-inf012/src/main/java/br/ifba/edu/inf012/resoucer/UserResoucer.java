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
import org.springframework.beans.BeanUtils;
import br.ifba.edu.inf012.model.User;
import br.ifba.edu.inf012.repository.UserRepository;


@RestController
@RequestMapping("/user")
public class UserResoucer {
	
	@Autowired
    private UserRepository userRepository;

    public void UserResource(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody User User) {
        userRepository.save(User);
        return new ResponseEntity<>(User, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        List<User> users = new ArrayList<>();
        users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<User>> getById(@PathVariable Integer id) {
        Optional<User> usuario;
        try {
            usuario = userRepository.findById(id);
            return new ResponseEntity<Optional<User>>(usuario, HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<User>>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Optional<User>> deleteById(@PathVariable Integer id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<Optional<User>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<User>>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<User> update(@PathVariable Integer id,@RequestBody User newUser){
        return userRepository.findById(id).map(user -> {
            BeanUtils.copyProperties(newUser, user, "id");
            User userUpdated = userRepository.save(user);
            return ResponseEntity.ok().body(userUpdated);
        }).orElse(ResponseEntity.notFound().build());
    }

	
		
}