package kth.iv1201.Group12.application.applicationTest;

import kth.iv1201.Group12.application.AvailabilityService;
import kth.iv1201.Group12.entity.Availability;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.AvailabilityRepository;
import kth.iv1201.Group12.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AvailabilityServiceTest {

    @Mock
    private AvailabilityRepository availabilityRepository;

    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private AvailabilityService availabilityService;

    private Person testPerson;
    private Availability testAvailability;

    @BeforeEach
    void setUp() {
        // Create a test person
        testPerson = new Person();
        testPerson.setFirstName("Testid");

        // Create a test availability period
        testAvailability = new Availability();
        testAvailability.setApplicant(testPerson);
        testAvailability.setFrom_date(LocalDate.of(2024, 3, 1));
        testAvailability.setTo_date(LocalDate.of(2024, 3, 10));
    }

    @Test
    void testGetAllAvailabilities() {
        when(availabilityRepository.findAll()).thenReturn(Collections.singletonList(testAvailability));

        var result = availabilityService.getAllavailabilities();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testAvailability, result.get(0));

        verify(availabilityRepository, times(1)).findAll();
    }

    @Test
    void testAvailablePeriod_Success() {
        when(personRepository.findByUserName("testUser")).thenReturn(Optional.of(testPerson));
        when(availabilityRepository.save(any(Availability.class))).thenReturn(testAvailability);

        assertDoesNotThrow(() -> availabilityService.availablePeriod(
                LocalDate.of(2024, 3, 1),
                LocalDate.of(2024, 3, 10),
                "testUser"
        ));

        verify(personRepository, times(1)).findByUserName("testUser");
        verify(availabilityRepository, times(1)).save(any(Availability.class));
    }

    @Test
    void testAvailablePeriod_UserNotFound() {
        when(personRepository.findByUserName("unknownUser")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () ->
                availabilityService.availablePeriod(
                        LocalDate.of(2024, 3, 1),
                        LocalDate.of(2024, 3, 10),
                        "unknownUser"
                ));

        assertEquals("User not found", exception.getMessage());

        verify(personRepository, times(1)).findByUserName("unknownUser");
        verify(availabilityRepository, never()).save(any(Availability.class));
    }
}
