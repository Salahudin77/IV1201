package kth.iv1201.Group12.presenter;
import jakarta.validation.Valid;
import kth.iv1201.Group12.application.PersonService;
import org.springframework.http.ResponseEntity;
import kth.iv1201.Group12.domain.PersonDTO;
import kth.iv1201.Group12.domain.UserRegistrationDTO;
import kth.iv1201.Group12.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonController {
    private PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping(path = "/people")
    public List<Person> getAllPeoples(){
        return personService.getAllPersons();
    }
    @GetMapping(path = "/getById/{id}")
    public Person getThePersonById(String id){
        return personService.getPersonById(id);
    }



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegistrationDTO userDTO) {
        personService.registerUser(userDTO);
        return ResponseEntity.ok("User registered successfully");
    }
}

