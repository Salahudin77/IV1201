package kth.iv1201.Group12.presenter;

import kth.iv1201.Group12.entity.Competence;
import kth.iv1201.Group12.application.CompetenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class CompetenceController {

    private CompetenceService competenceService;

    @Autowired
    public CompetenceController(CompetenceService competenceService) {
        this.competenceService = competenceService;
    }





    @GetMapping(path = "/competence")
    public List<Competence> competences(){
    return competenceService.getAllCompetence();
    }
}
