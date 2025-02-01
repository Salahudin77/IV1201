package kth.iv1201.Group12.application;

import jakarta.transaction.Transactional;
import kth.iv1201.Group12.domain.PersonDTO;
import kth.iv1201.Group12.domain.UserRegistrationDTO;
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

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }


    public Person getPersonById(String person_id) {
        return personRepository.findPersonByPersonNumber(person_id)
                .orElseThrow(() -> new RuntimeException("Person with ID " + person_id + " not found"));


    }

    @Transactional
    public void registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (personRepository.findByUserName(userRegistrationDTO.getUserName()).isPresent()){
            throw new RuntimeException("The User Name is present: " + userRegistrationDTO.getUserName());
        }

        if (personRepository.findPersonByPersonNumber(userRegistrationDTO.getPersonNumber()).isPresent()) {
            throw new RuntimeException("The person Number is present: " + userRegistrationDTO.getPersonNumber());
        }
        if (personRepository.findByEmail(userRegistrationDTO.getEmail()).isPresent()) {
            throw new RuntimeException("The email is present: " + userRegistrationDTO.getEmail());
        }
        Person person = new Person(
                userRegistrationDTO.getFirstName(),
                userRegistrationDTO.getLastName(),
                userRegistrationDTO.getPersonNumber(),
                userRegistrationDTO.getPassword(),
                userRegistrationDTO.getRoleId(),
                userRegistrationDTO.getUserName(),
                userRegistrationDTO.getEmail()
        );


        personRepository.save(person);
    }
}

