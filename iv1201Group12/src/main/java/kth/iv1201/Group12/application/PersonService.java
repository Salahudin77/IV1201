package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PersonService {
    private PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person>getAllPersons(){
        return personRepository.findAll();
    }


    public Person getPersonById(int person_id){
       return personRepository.findById(person_id)
                .orElseThrow(() -> new RuntimeException("Person with ID " + person_id + " not found"));


    }


}

