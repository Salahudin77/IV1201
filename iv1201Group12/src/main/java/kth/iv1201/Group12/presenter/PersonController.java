package kth.iv1201.Group12.presenter;
import kth.iv1201.Group12.application.PersonService;


import kth.iv1201.Group12.domain.PersonDTO;
import kth.iv1201.Group12.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {
    private PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping(path = "/persons")
    public List<Person> getAllPeoples(){
        return personService.getAllPersons();
    }
    //@GetMapping(path = "/getById/{id}")
    public PersonDTO getThePersonById(int id){
        return personService.getPersonById(id);
    }

    }

