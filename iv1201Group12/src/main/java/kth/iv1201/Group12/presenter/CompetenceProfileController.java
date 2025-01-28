package kth.iv1201.Group12.presenter;

import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.application.CompetenceProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class CompetenceProfileController {

    private CompetenceProfileService competenceProfileService;
    @Autowired
    public CompetenceProfileController(CompetenceProfileService competenceProfileService) {
        this.competenceProfileService = competenceProfileService;
    }


    @GetMapping(path = "/Profile")
    public List<CompetenceProfile> getAllcompetenceProfiles(){
        return competenceProfileService.competenceList();
    }

}
