package kth.iv1201.Group12.presenter;

import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.application.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AvailableController {
    private AvailabilityService availabilityService;

    @Autowired

    public AvailableController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }
    @GetMapping(path = "/available")
    public List<Availability> availabilities(){
        return availabilityService.getAllavailabilities();
    }

}
