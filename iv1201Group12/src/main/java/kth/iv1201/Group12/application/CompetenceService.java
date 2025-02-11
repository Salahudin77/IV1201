package kth.iv1201.Group12.application;

import kth.iv1201.Group12.repository.CompetenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kth.iv1201.Group12.entity.Competence;

import java.util.List;

/**
 * Service class responsible for handling business logic related to Competence entities.
 * Provides methods to retrieve all competence records from the database.
 */


@Service

public class CompetenceService {
    private CompetenceRepository competenceRepository;

    /**
     * Constructor-based dependency injection for CompetenceRepository.
     *
     * @param competenceRepository The repository handling database operations for Competence entities.
     */
    @Autowired
    public CompetenceService(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }
    /**
     * Retrieves a list of all competences stored in the database.
     *
     * @return A list of Competence entities.
     */
    public List<Competence>getAllCompetence(){
        return competenceRepository.findAll();
    }
}
