package kth.iv1201.Group12.presenter;

import kth.iv1201.Group12.application.AvailabilityService;
import kth.iv1201.Group12.application.CompetenceProfileService;
import kth.iv1201.Group12.application.PersonService;
import kth.iv1201.Group12.domain.*;
import kth.iv1201.Group12.entity.Person;
import org.junit.jupiter.api.BeforeEach;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.OK;

@ExtendWith(MockitoExtension.class)
class PersonControllerTest {

    @Mock
    private PersonService personService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private CompetenceProfileService competenceProfileService;

    @Mock
    private AvailabilityService availabilityService;

    @InjectMocks
    private PersonController personController;

    private Person testPerson;
    private UserRegistrationDTO testUserDto;
    private CompetenceProfileDTO testCompetenceDto;
    private AvailabityDTO testAvailabilityDto;

    @BeforeEach
    void setUp() {
        testPerson = new Person();
        testPerson.setUserName("testUser");
        testPerson.setPersonNumber("123456-7890");
        testPerson.setEmail("test@example.com");

        testUserDto = new UserRegistrationDTO("John", "Doe", "123456-7890", "testUser", "test@example.com", "password123");

        testCompetenceDto = new CompetenceProfileDTO(2,2);



        testAvailabilityDto = new AvailabityDTO(
                LocalDate.of(2024, 4, 1),  // April 1, 2024
                LocalDate.of(2025, 1, 12)  // January 12, 2025
        );


    }

    @Test
    void testGetAllPeoples() {
        when(personService.getAllPersons()).thenReturn(Collections.singletonList(testPerson));

        List<Person> result = personController.getAllPeoples();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("testUser", result.get(0).getUserName());

        verify(personService, times(1)).getAllPersons();
    }

    @Test
    void testGetThePersonById() {
        when(personService.getPersonById("123456-7890")).thenReturn(testPerson);

        Person result = personController.getThePersonById("123456-7890");

        assertNotNull(result);
        assertEquals("testUser", result.getUserName());

        verify(personService, times(1)).getPersonById("123456-7890");
    }

    @Test
    void testRegisterUser() {
        doNothing().when(personService).registerUser(testUserDto);

        ResponseEntity<String> response = personController.registerUser(testUserDto);

        assertEquals(OK, response.getStatusCode());
        assertEquals("User registered successfully", response.getBody());

        verify(personService, times(1)).registerUser(testUserDto);
    }

    @Test
    void testLogin_Success() {
        LoginDTO loginDTO = new LoginDTO("testUser", "password123");
        Authentication mockAuth = mock(Authentication.class);
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        HttpSession mockSession = mock(HttpSession.class);

        // ✅ Mock authentication process
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(mockAuth);

        // ✅ Mock session creation
        when(mockRequest.getSession(true)).thenReturn(mockSession);

        ResponseEntity<String> response = personController.login(loginDTO, mockRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login successful", response.getBody());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(mockSession, times(1)).setAttribute(eq("SPRING_SECURITY_CONTEXT"), any());
    }


    @Test
    void testLogin_Failure() {
        LoginDTO loginDTO = new LoginDTO("testUser", "wrongPassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Bad credentials"));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            personController.login(loginDTO, mock(HttpServletRequest.class));
        });

        assertEquals("Bad credentials", exception.getMessage());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void testAddCompetence() {
        mockSecurityContext("testUser");

        ResponseEntity<String> response = personController.addCompetence(testCompetenceDto);

        assertEquals(OK, response.getStatusCode());
        assertEquals("Competence has been added for user: ", response.getBody());

        verify(competenceProfileService, times(1)).addCompetence(2, 2f, "testUser");
    }

    @Test
    void testAddAvailablePeriods() {
        mockSecurityContext("testUser");

        ResponseEntity<String> response = personController.addAvailablePeriods(testAvailabilityDto);

        assertEquals(OK, response.getStatusCode());
        assertEquals("The availability Periods have been added!", response.getBody());

        verify(availabilityService, times(1)).availablePeriod(
                testAvailabilityDto.getFrom(),
                testAvailabilityDto.getTo(),
                "testUser"
        );
    }

    @Test
    /*void testGetApplicationSummary() {
        mockSecurityContext("testUser");

        ApplicantSummaryDTO mockSummary = new ApplicantSummaryDTO("Salah","Football",2025-02-01);
        mockSummary.setUsername("testUser");

        when(personService.getApplicationSummary("testUser")).thenReturn(mockSummary);

        ResponseEntity<ApplicantSummaryDTO> response = personController.getApplicationSummary();

        assertEquals(OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testUser", response.getBody().getUsername());

        verify(personService, times(1)).getApplicationSummary("testUser");
    }

     */


    /*void testGetAllApplications() {
       // ApplicationRecuiterSeesDTO mockApplication = new ApplicationRecuiterSeesDTO();
       // mockApplication.setUsername("testUser");

        when(personService.fetchAllApplications()).thenReturn(Collections.singletonList(mockApplication));

        ResponseEntity<List<ApplicationRecuiterSeesDTO>> response = personController.getAllApplications();

        assertEquals(OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("testUser", response.getBody().get(0).getUsername());

        verify(personService, times(1)).fetchAllApplications();
    }

     */

    /**
     * Mocks Spring Security Context for authenticated user.
     */
    private void mockSecurityContext(String username) {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(username);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);
    }
}
