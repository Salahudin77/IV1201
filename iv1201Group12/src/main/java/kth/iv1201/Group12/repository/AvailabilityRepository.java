package kth.iv1201.Group12.repository;


import kth.iv1201.Group12.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {



}
