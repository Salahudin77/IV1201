package kth.iv1201.Group12.application;

import jakarta.transaction.Transactional;
import kth.iv1201.Group12.domain.*;
import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.entity.Role;
import kth.iv1201.Group12.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;



@Service
public class PersonService {
    private PersonRepository personRepository;
    private RoleRepository roleRepository;
    private CompetenceProfileRepository competenceProfileRepository;
    private AvailabilityRepository availabilityRepository;
    private PasswordEncoder passwordEncoder;


    /**
     * Constructor-based dependency injection for PersonRepository and PasswordEncoder.
     *
     * @param personRepository Repository for accessing person data.
     */
    @Autowired
    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder, CompetenceProfileRepository competenceProfileRepository, AvailabilityRepository availabilityRepository) {

        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.competenceProfileRepository = competenceProfileRepository;
        this.availabilityRepository = availabilityRepository;
    }

    /**
     * Retrieves a list of all persons stored in the database.
     *
     * @return A list of Person entities.
     */

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    /**
     * Retrieves a person based on their unique person number.
     *
     * @param person_id The unique personal identification number.
     * @return The corresponding Person entity if found.
     * @throws RuntimeException If no person is found with the given ID.
     */


    public Person getPersonById(String person_id) {
        return personRepository.findPersonByPersonNumber(person_id)
                .orElseThrow(() -> new RuntimeException("Person with ID " + person_id + " not found"));


    }

    public Person getLoggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return personRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    /**
     * Registers a new user in the system after validating unique constraints.
     *
     * @param userRegistrationDTO The user registration data transfer object containing user details.
     * @throws RuntimeException If the username, person number, or email already exists in the database.
     */

    @Transactional
    public void registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (personRepository.findByUserName(userRegistrationDTO.getUserName()).isPresent()) {
            throw new RuntimeException("The User Name is present: " + userRegistrationDTO.getUserName());
        }

        if (personRepository.findPersonByPersonNumber(userRegistrationDTO.getPersonNumber()).isPresent()) {
            throw new RuntimeException("The person Number is present: " + userRegistrationDTO.getPersonNumber());
        }
        if (personRepository.findByEmail(userRegistrationDTO.getEmail()).isPresent()) {
            throw new RuntimeException("The email is present: " + userRegistrationDTO.getEmail());
        }

        //userRegistrationDTO.setPassword(bCryptPasswordEncoder.encode(userRegistrationDTO.getPassword()));


        Person person = new Person(
                userRegistrationDTO.getFirstName(),
                userRegistrationDTO.getLastName(),
                userRegistrationDTO.getPersonNumber(),
                passwordEncoder.encode(userRegistrationDTO.getPassword()),
                userRegistrationDTO.getUserName(),
                userRegistrationDTO.getEmail()
        );

        person.setRoleId(2); // den här säger att role_id = 2 då är det en applicant


        personRepository.save(person);
    }

    public ApplicantSummaryDTO getApplicationSummary(String username) {
        // Fetch applicant
        Person applicant = personRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch competence profiles & convert to DTO
        List<CompetenceProfile> competenceProfiles = competenceProfileRepository.findByApplicant(applicant);
        List<CompetenceProfileDTO> competenceDTOs = new ArrayList<>();
        for (CompetenceProfile profile : competenceProfiles) {
            CompetenceProfileDTO dto = new CompetenceProfileDTO(
                    profile.getCompetence().getCompetence_id(),  // Get competence ID
                    (int) profile.getYears_of_experience()       // Cast float to int if needed
            );
            competenceDTOs.add(dto);
        }

        // Fetch availability & convert to DTO
        List<Availability> availabilities = availabilityRepository.findByApplicant(applicant);
        List<AvailabityDTO> availabilityDTOs = new ArrayList<>();
        for (Availability availability : availabilities) {
            AvailabityDTO dto = new AvailabityDTO(
                    availability.getFrom_date(),
                    availability.getTo_date()
            );
            availabilityDTOs.add(dto);
        }

        // Return DTO with converted data
        return new ApplicantSummaryDTO(applicant.getUserName(), competenceDTOs, availabilityDTOs);
    }


    public List<ApplicationRecuiterSeesDTO> fetchAllApplications() {
        List<Person> applicants = personRepository.findAll(); // Get all applicants
        List<ApplicationRecuiterSeesDTO> applicantSummaries = new ArrayList<>();


        for (Person applicant : applicants) {

            if (applicant.getRoleId() != 1) {


                ApplicationRecuiterSeesDTO applicantSummary = new ApplicationRecuiterSeesDTO(
                        applicant.getUserName(),
                        applicant.getFirstName(),
                        applicant.getLastName(),
                        "UNHANDLED"
                );

                applicantSummaries.add(applicantSummary);
            }


        }
        return applicantSummaries;
    }

    public void updateUnhashedPasswords() {
        List<Person> users = personRepository.findAll();

        for (Person user : users) {
            String password = user.getPassword();

            if(password == null || password.isEmpty()){
                continue;
            }


            if (!password.startsWith("$2a$")) {

                String hashedPassword = passwordEncoder.encode(password);
                user.setPassword(hashedPassword);
                personRepository.save(user);
                System.out.println("Updated password for: " + user.getUserName());
            }
        }


        System.out.println("✅ All unhashed passwords are now encrypted!");
    }


}


