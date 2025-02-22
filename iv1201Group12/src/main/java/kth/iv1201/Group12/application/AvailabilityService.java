package kth.iv1201.Group12.application;


import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvailabilityService {

    private AvailabilityRepository availabilityRepository;
    private PersonService personService;

    public AvailabilityService(AvailabilityRepository availabilityRepository, PersonService personService) {
        this.availabilityRepository = availabilityRepository;
        this.personService = personService;

    }

    public List<Availability> getAllavailabilities() {
        return availabilityRepository.findAll();
    }

    public void availablePeriod(LocalDateTime from, LocalDateTime to) {
        Person applicant = personService.getLoggedInUser();

        Availability availability = new Availability();
        availability.setFrom_date(from);
        availability.setTo_date(to);

        availabilityRepository.save(availability);
    }
    }


