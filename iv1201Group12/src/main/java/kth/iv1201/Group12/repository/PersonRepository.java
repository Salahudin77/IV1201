package kth.iv1201.Group12.repository;

import kth.iv1201.Group12.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import kth.iv1201.Group12.domain.PersonDTO;

import java.util.List;
import java.util.Optional;


@Repository
    public interface PersonRepository extends JpaRepository<Person,Integer> {

    List<Person> findAll();


    Optional <Person>findPersonByPersonNumber(String person_id);
    Optional< Person> findByUserName(String userName);
    Optional <Person> findByEmail(String email);





    //Optional<PersonDTO> saveUser();



    }
