package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.Competence;
import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.CompetenceProfileRepository;
import kth.iv1201.Group12.repository.CompetenceRepository;
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
    private PersonService personService;

    private CompetenceRepository competenceRepository;

    /**
     * Constructor-based dependency injection for CompetenceRepository.
     *
     * @param competenceProfileRepository The repository handling database operations for Competence entities.
     */

    @Autowired
    public CompetenceProfileService(CompetenceProfileRepository competenceProfileRepository, PersonService personService, CompetenceRepository competenceRepository) {
        this.competenceProfileRepository = competenceProfileRepository;
        this.personService = personService;
        this.competenceRepository = competenceRepository;
    }

    /**
     * Retrieves a list of all competences stored in the database.
     *
     * @return A list of CompetenceProfile entities.
     */
    public List<CompetenceProfile> competenceList() {
        return competenceProfileRepository.findAll();

    }

    public void addCompetence(int competenceId, float yearsOfExperience) {
        Person applicant = personService.getLoggedInUser(); // Get the logged-in user
        CompetenceProfile competenceProfile = new CompetenceProfile();
        competenceProfile.setApplicant(applicant);
        competenceProfile.setYears_of_experience(yearsOfExperience);

         competenceProfileRepository.save(competenceProfile);
    }
}
