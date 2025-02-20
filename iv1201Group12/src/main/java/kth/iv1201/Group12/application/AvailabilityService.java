package kth.iv1201.Group12.application;


import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvailabilityService {

    private AvailabilityRepository availabilityService;
    private PersonService personService;

    public AvailabilityService(AvailabilityRepository availabilityService) {
        this.availabilityService = availabilityService;
    }
    public List<Availability>getAllavailabilities(){
        return availabilityService.findAll();
    }

    /*public String availablePeriod(LocalDateTime from, LocalDateTime to, int person_id){
        Person applicant = personService.getLoggedInUser(person_id);

     */

    }


