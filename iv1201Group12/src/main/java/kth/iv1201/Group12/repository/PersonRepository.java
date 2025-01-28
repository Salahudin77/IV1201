package kth.iv1201.Group12.repository;

import kth.iv1201.Group12.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
    public interface PersonRepository extends JpaRepository<Person,Integer> {


    }
