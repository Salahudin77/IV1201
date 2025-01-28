package kth.iv1201.Group12.application;

import kth.iv1201.Group12.repository.CompetenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kth.iv1201.Group12.entity.Competence;

import java.util.List;

@Service

public class CompetenceService {
    private CompetenceRepository competenceRepository;

    @Autowired
    public CompetenceService(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }
    public List<Competence>getAllCompetence(){
        return competenceRepository.findAll();
    }
}
