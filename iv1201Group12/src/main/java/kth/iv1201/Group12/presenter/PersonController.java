package kth.iv1201.Group12.presenter;
import jakarta.validation.Valid;
import kth.iv1201.Group12.application.PersonService;
import org.springframework.http.ResponseEntity;
import kth.iv1201.Group12.domain.PersonDTO;
import kth.iv1201.Group12.domain.UserRegistrationDTO;
import kth.iv1201.Group12.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;


/**
 * Controller for handling HTTP requests related to Person entities.
 * Provides endpoints for user registration, authentication, and data retrieval.
 */
@RestController
@RequestMapping("/api")
public class PersonController {
    private PersonService personService;
    private AuthenticationManager authenticationManager;


    /**
     * Constructor-based dependency injection for PersonService.
     *
     * @param personService The service handling business logic for Person entities.
     */

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
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
     * Authenticates a user based on username and password.
     * (Currently commented out)
     *
     * @param username The username of the user attempting to log in.
     * @param password The password of the user attempting to log in.
     * @return A ResponseEntity containing a success or failure message.
     */
    /*

    /*@PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        if (username.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body("Username and password must not be empty.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login successful for user: " + username);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Login failed: Invalid credentials.");
        }
    }
}

     */
}

