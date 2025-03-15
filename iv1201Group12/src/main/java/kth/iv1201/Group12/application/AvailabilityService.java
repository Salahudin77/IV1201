package kth.iv1201.Group12.application;

import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import kth.iv1201.Group12.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Service class for handling business logic related to availability periods.
 * This class provides methods to manage availability data for applicants.
 */
@Service
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final PersonRepository personRepository;

    /**
     * Constructor for dependency injection of the AvailabilityRepository and PersonRepository.
     *
     * @param availabilityRepository The repository for managing availability data.
     * @param personRepository The repository for managing person data.
     */
    public AvailabilityService(AvailabilityRepository availabilityRepository, PersonRepository personRepository) {
        this.availabilityRepository = availabilityRepository;
        this.personRepository = personRepository;
    }

    /**
     * Retrieves a list of all availability periods stored in the database.
     *
     * @return A list of all Availability entities.
     */
    public List<Availability> getAllavailabilities() {
        return availabilityRepository.findAll();
    }

    /**
     * Adds a new availability period for a specific applicant.
     *
     * @param from The start date of the availability period.
     * @param to The end date of the availability period.
     * @param username The username of the applicant for whom the availability period is being added.
     * @throws RuntimeException If the applicant with the specified username is not found.
     */
    public void availablePeriod(LocalDate from, LocalDate to, String username) {
        Person applicant = personRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Availability availability = new Availability();
        availability.setApplicant(applicant);
        availability.setFrom_date(from);
        availability.setTo_date(to);

        availabilityRepository.save(availability);
    }
}
