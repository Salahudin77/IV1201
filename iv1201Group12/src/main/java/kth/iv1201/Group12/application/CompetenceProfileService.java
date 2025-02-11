package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.repository.CompetenceProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class responsible for handling business logic related to Competence entities.
 * Provides methods to retrieve all competence records from the database.
 */

@Service

public class CompetenceProfileService {
    private CompetenceProfileRepository competenceProfileRepository;

    /**
     * Constructor-based dependency injection for CompetenceRepository.
     *
     * @param competenceProfileRepository The repository handling database operations for Competence entities.
     */

    @Autowired
    public CompetenceProfileService(CompetenceProfileRepository competenceProfileRepository) {
        this.competenceProfileRepository = competenceProfileRepository;
    }
    /**
     * Retrieves a list of all competences stored in the database.
     *
     * @return A list of CompetenceProfile entities.
     */
    public List <CompetenceProfile> competenceList(){
        return competenceProfileRepository.findAll();

    }
}
