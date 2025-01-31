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

    @Query("SELECT p.name AS name, p.surname AS surname, p.username AS username FROM Person p WHERE p.person_id = :person_id")

    Optional<PersonDTO> findPersonById(int person_id);

    Optional<PersonDTO> saveUser();



    }
