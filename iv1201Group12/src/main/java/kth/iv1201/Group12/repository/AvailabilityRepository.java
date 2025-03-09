package kth.iv1201.Group12.repository;


import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

import java.util.Optional;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {

    List<Availability> findByApplicant(Person applicant);



}
