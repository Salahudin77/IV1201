package kth.iv1201.Group12.application.applicationTest;

import kth.iv1201.Group12.application.PersonService;
import kth.iv1201.Group12.domain.*;
import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {

    @Mock
    private PersonRepository personRepository;

    @Mock
    private CompetenceProfileRepository competenceProfileRepository;

    @Mock
    private AvailabilityRepository availabilityRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private PersonService personService;

    private Person testPerson;

    @BeforeEach
    void setUp() {
        testPerson = new Person();
        testPerson.setUserName("testUser");
        testPerson.setPersonNumber("123456-7890");
        testPerson.setPassword("password123");
        testPerson.setFirstName("John");
        testPerson.setLastName("Doe");
        testPerson.setEmail("test@example.com");
    }

    @Test
    void testGetAllPersons() {
        when(personRepository.findAll()).thenReturn(Collections.singletonList(testPerson));

        List<Person> result = personService.getAllPersons();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("testUser", result.get(0).getUserName());

        verify(personRepository, times(1)).findAll();
    }

    @Test
    void testGetPersonById_PersonExists() {
        when(personRepository.findPersonByPersonNumber("123456-7890")).thenReturn(Optional.of(testPerson));

        Person result = personService.getPersonById("123456-7890");

        assertNotNull(result);
        assertEquals("testUser", result.getUserName());

        verify(personRepository, times(1)).findPersonByPersonNumber("123456-7890");
    }

    @Test
    void testGetPersonById_PersonNotFound() {
        when(personRepository.findPersonByPersonNumber("999999-9999")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            personService.getPersonById("999999-9999");
        });

        assertEquals("Person with ID 999999-9999 not found", exception.getMessage());

        verify(personRepository, times(1)).findPersonByPersonNumber("999999-9999");
    }

    @Test
    void testRegisterUser_Success() {
        UserRegistrationDTO dto = new UserRegistrationDTO("John", "Doe", "123456-7890", "testUser", "test@example.com", "password123");

        when(personRepository.findByUserName("testUser")).thenReturn(Optional.empty());
        when(personRepository.findPersonByPersonNumber("123456-7890")).thenReturn(Optional.empty());
        when(personRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");

        personService.registerUser(dto);

        verify(personRepository, times(1)).save(any(Person.class));
    }

    @Test
    void testRegisterUser_UsernameAlreadyExists() {
        UserRegistrationDTO dto = new UserRegistrationDTO("John", "Doe", "123456-7890", "testUser", "test@example.com", "password123");

        when(personRepository.findByUserName("testUser")).thenReturn(Optional.of(testPerson));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            personService.registerUser(dto);
        });

        assertEquals("The User Name is present: testUser", exception.getMessage());

        verify(personRepository, never()).save(any(Person.class));
    }

    @Test
    void testGetApplicationSummary_Success() {
        when(personRepository.findByUserName("testUser")).thenReturn(Optional.of(testPerson));
        when(competenceProfileRepository.findByApplicant(testPerson)).thenReturn(new ArrayList<>());
        when(availabilityRepository.findByApplicant(testPerson)).thenReturn(new ArrayList<>());

        ApplicantSummaryDTO summary = personService.getApplicationSummary("testUser");

        assertNotNull(summary);
        assertEquals("testUser", summary.getUsername());

        verify(personRepository, times(1)).findByUserName("testUser");
    }

    @Test
    void testGetApplicationSummary_UserNotFound() {
        when(personRepository.findByUserName("unknownUser")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            personService.getApplicationSummary("unknownUser");
        });

        assertEquals("User not found", exception.getMessage());

        verify(personRepository, times(1)).findByUserName("unknownUser");
    }

    @Test
    void testFetchAllApplications() {
        Person applicant = new Person();
        applicant.setUserName("applicantUser");
        applicant.setFirstName("Alice");
        applicant.setLastName("Smith");
        applicant.setRoleId(2); // Not a recruiter

        when(personRepository.findAll()).thenReturn(Collections.singletonList(applicant));

        List<ApplicationRecuiterSeesDTO> result = personService.fetchAllApplications();

        assertEquals(1, result.size());
        assertEquals("applicantUser", result.get(0).getUsername());

        verify(personRepository, times(1)).findAll();
    }

    @Test
    void testUpdateUnhashedPasswords() {
        Person user1 = new Person();
        user1.setUserName("user1");
        user1.setPassword("unhashedPassword");

        Person user2 = new Person();
        user2.setUserName("user2");
        user2.setPassword("$2a$hashedPassword"); // Already hashed

        List<Person> users = Arrays.asList(user1, user2);

        when(personRepository.findAll()).thenReturn(users);
        when(passwordEncoder.encode("unhashedPassword")).thenReturn("$2a$hashedPassword");

        personService.updateUnhashedPasswords();

        assertEquals("$2a$hashedPassword", user1.getPassword());
        assertEquals("$2a$hashedPassword", user2.getPassword()); // Should not change

        verify(personRepository, times(1)).save(user1);
        verify(personRepository, never()).save(user2);
    }
}
