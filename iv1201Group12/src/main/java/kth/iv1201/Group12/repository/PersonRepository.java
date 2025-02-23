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

    /**
     * Retrieves all persons from the database.
     *
     * @return A list of all Person entities.
     */
    List<Person> findAll();

    /**
     * Finds a person by their unique person number.
     *
     * @param person_id The unique personal identification number.
     * @return An Optional containing the Person entity if found, otherwise empty.
     */

    Optional <Person>findPersonByPersonNumber(String person_id);
    /**
     * Finds a person by their username.
     *
     * @param userName The username of the person.
     * @return An Optional containing the Person entity if found, otherwise empty.
     */
    Optional< Person> findByUserName(String userName);

    /**
     * Finds a person by their email address.
     *
     * @param email The email address of the person.
     * @return An Optional containing the Person entity if found, otherwise empty.
     */
    Optional <Person> findByEmail(String email);

    Optional<Person>findPeopleByFirstName(String firstName);


    //Optional<PersonDTO> saveUser();



    }
