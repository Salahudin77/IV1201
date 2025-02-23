package kth.iv1201.Group12.application;


import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import kth.iv1201.Group12.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvailabilityService {

    private AvailabilityRepository availabilityRepository;
    private PersonRepository personRepository;

    public AvailabilityService(AvailabilityRepository availabilityRepository, PersonRepository personRepository) {
        this.availabilityRepository = availabilityRepository;
        this.personRepository = personRepository;

    }

    public List<Availability> getAllavailabilities() {
        return availabilityRepository.findAll();
    }

    public void availablePeriod(LocalDate from, LocalDate to, String username) {
        Person applicant = personRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Availability availability = new Availability();
        availability.setApplicant(applicant);
        availability.setFrom_date(from);
        availability.setTo_date(to);

        availabilityRepository.save(availability);
    }
    }


