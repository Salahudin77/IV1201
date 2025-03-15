package kth.iv1201.Group12.presenter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import kth.iv1201.Group12.application.AvailabilityService;
import kth.iv1201.Group12.application.CompetenceProfileService;
import kth.iv1201.Group12.application.PersonService;
import kth.iv1201.Group12.domain.*;
import org.springframework.http.ResponseEntity;
import kth.iv1201.Group12.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

import kth.iv1201.Group12.application.CompetenceProfileService;
import org.springframework.security.core.*;

/**
 * Controller for handling HTTP requests related to Person entities.
 * Provides endpoints for user registration, authentication, and data retrieval.
 */
@RestController
@RequestMapping("/api")
public class PersonController {
    private final PersonService personService;
    private final AuthenticationManager authenticationManager;
    private final CompetenceProfileService competenceProfileService;
    private final AvailabilityService availabilityService;

    /**
     * Constructor-based dependency injection for PersonService, AuthenticationManager,
     * CompetenceProfileService, and AvailabilityService.
     *
     * @param personService The service handling business logic for Person entities.
     * @param authenticationManager The authentication manager for handling user authentication.
     * @param competenceProfileService The service handling competence profile operations.
     * @param availabilityService The service handling availability operations.
     */
    @Autowired
    public PersonController(PersonService personService, AuthenticationManager authenticationManager, CompetenceProfileService competenceProfileService, AvailabilityService availabilityService) {
        this.personService = personService;
        this.authenticationManager = authenticationManager;
        this.competenceProfileService = competenceProfileService;
        this.availabilityService = availabilityService;
    }

    /**
     * Retrieves a list of all registered persons.
     *
     * @return A list of Person entities.
     */
    @GetMapping(path = "/people")
    public List<Person> getAllPeoples() {
        return personService.getAllPersons();
    }

    /**
     * Retrieves a specific person by their unique ID.
     *
     * @param id The unique ID of the person.
     * @return The corresponding Person entity if found.
     */
    @GetMapping(path = "/getById/{id}")
    public Person getThePersonById(String id) {
        return personService.getPersonById(id);
    }

    /**
     * Basic home endpoint for testing.
     *
     * @return A simple "Home" message.
     */
    @GetMapping(path = "/home")
    public String home() {
        return "Home";
    }

    /**
     * Registers a new user in the system.
     *
     * @param userDTO The user registration data transfer object containing user details.
     * @return A ResponseEntity with a success message if registration is successful.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegistrationDTO userDTO) {
        personService.registerUser(userDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    /**
     * Retrieves the username of the currently authenticated user.
     *
     * @return The username of the currently authenticated user.
     */
    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    /**
     * Authenticates a user and logs them into the system.
     *
     * @param loginDTO The login data transfer object containing username and password.
     * @param request The HTTP request object.
     * @return A ResponseEntity containing the user's role if authentication is successful.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        // 1) Authenticate the credentials
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        // 2) Set user authentication in Spring Security context
        SecurityContextHolder.getContext().setAuthentication(auth);

        // 3) Force session creation so Spring Security will issue a JSESSIONID cookie
        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        // Logging or debug info
        System.out.println("DEBUG: User logged in -> " + auth.getName());

        // 4) Retrieve the user's role
        // Assuming roles are stored as authorities
        String role = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("No Role Assigned");

        // 5) Return the role in the response
        return ResponseEntity.ok(role);
    }

    /**
     * Adds a competence profile for the currently authenticated user.
     *
     * @param competenceDto The competence profile data transfer object containing competence details.
     * @return A ResponseEntity with a success message if the competence is added successfully.
     */
    @PostMapping(path = "/addCompetence")
    public ResponseEntity<String> addCompetence(@RequestBody CompetenceProfileDTO competenceDto) {
        String userName = getCurrentUsername();
        competenceProfileService.addCompetence(
                competenceDto.getCompetenceId(),
                competenceDto.getYearsOfExperience(),
                userName
        );

        return ResponseEntity.ok("Competence has been added for user: ");
    }

    /**
     * Adds availability periods for the currently authenticated user.
     *
     * @param availabityDTO The availability data transfer object containing availability details.
     * @return A ResponseEntity with a success message if the availability periods are added successfully.
     */
    @PostMapping(path = "/availability")
    public ResponseEntity<String> addAvailablePeriods(@RequestBody AvailabityDTO availabityDTO) {
        String userName = getCurrentUsername();
        availabilityService.availablePeriod(availabityDTO.getFrom(), availabityDTO.getTo(), userName);
        return ResponseEntity.ok("The availability Periods have been added!");
    }

    /**
     * Retrieves the application summary for the currently authenticated user.
     *
     * @return A ResponseEntity containing the application summary.
     */
    @GetMapping(path = "/application-summary")
    public ResponseEntity<ApplicantSummaryDTO> getApplicationSummary() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ApplicantSummaryDTO summary = personService.getApplicationSummary(username);
        return ResponseEntity.ok(summary);
    }

    /**
     * Retrieves all applications for recruiters to view.
     *
     * @return A ResponseEntity containing a list of all applications.
     */
    @GetMapping(path = "/fetchAllApplications")
    public ResponseEntity<List<ApplicationRecuiterSeesDTO>> getAllApplications() {
        return ResponseEntity.ok(personService.fetchAllApplications());
    }
}
