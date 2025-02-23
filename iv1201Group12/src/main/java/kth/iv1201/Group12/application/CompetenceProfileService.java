package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.Competence;
import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.CompetenceProfileRepository;
import kth.iv1201.Group12.repository.CompetenceRepository;
import kth.iv1201.Group12.repository.PersonRepository;
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

    private PersonRepository personRepository;


    private CompetenceRepository competenceRepository;

    /**
     * Constructor-based dependency injection for CompetenceRepository.
     *
     * @param competenceProfileRepository The repository handling database operations for Competence entities.
     */

    @Autowired
    public CompetenceProfileService(CompetenceProfileRepository competenceProfileRepository, PersonRepository personRepository, CompetenceRepository competenceRepository) {
        this.competenceProfileRepository = competenceProfileRepository;
        this.personRepository = personRepository;
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

    public void addCompetence(int competenceId, float yearsOfExperience, String username) {
        Person applicant = personRepository.findByUserName(username)
                . orElseThrow(() -> new RuntimeException("User not found"));
        Competence competence = competenceRepository.findById(competenceId)
                . orElseThrow(() -> new RuntimeException("User not found"));
        CompetenceProfile competenceProfile = new CompetenceProfile();
        competenceProfile.setApplicant(applicant);
        competenceProfile.setCompetence(competence);
        competenceProfile.setYears_of_experience(yearsOfExperience);

         competenceProfileRepository.save(competenceProfile);
    }
}
