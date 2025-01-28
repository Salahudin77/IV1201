package kth.iv1201.Group12.application;


import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {

    private AvailabilityRepository availabilityService;

    public AvailabilityService(AvailabilityRepository availabilityService) {
        this.availabilityService = availabilityService;
    }
    public List<Availability>getAllavailabilities(){
        return availabilityService.findAll();
    }
}

