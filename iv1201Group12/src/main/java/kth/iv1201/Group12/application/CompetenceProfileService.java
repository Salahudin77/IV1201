package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.repository.CompetenceProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class CompetenceProfileService {
    private CompetenceProfileRepository competenceProfileRepository;

    @Autowired
    public CompetenceProfileService(CompetenceProfileRepository competenceProfileRepository) {
        this.competenceProfileRepository = competenceProfileRepository;
    }
    public List <CompetenceProfile> competenceList(){
        return competenceProfileRepository.findAll();

    }
}
