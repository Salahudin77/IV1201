package kth.iv1201.Group12.repository;

import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.*;

@Repository
public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile,Integer> {


    List<CompetenceProfile> findByApplicant(Person applicant);


}
