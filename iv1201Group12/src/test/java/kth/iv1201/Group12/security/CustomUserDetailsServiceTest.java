package kth.iv1201.Group12.security;

import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {

    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    private Person recruiter;
    private Person applicant;

    @BeforeEach
    void setUp() {
        recruiter = new Person();
        recruiter.setUserName("recruiterUser");
        recruiter.setPassword("hashedPassword123");
        recruiter.setRoleId(1); // Recruiter role

        applicant = new Person();
        applicant.setUserName("applicantUser");
        applicant.setPassword("hashedPassword456");
        applicant.setRoleId(2); // Applicant role
    }

    @Test
    void testLoadUserByUsername_Recruiter() {
        when(personRepository.findByUserName("recruiterUser")).thenReturn(Optional.of(recruiter));

        UserDetails userDetails = customUserDetailsService.loadUserByUsername("recruiterUser");

        assertNotNull(userDetails);
        assertEquals("recruiterUser", userDetails.getUsername());
        assertEquals("hashedPassword123", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_RECRUITER")));

        verify(personRepository, times(1)).findByUserName("recruiterUser");
    }

    @Test
    void testLoadUserByUsername_Applicant() {
        when(personRepository.findByUserName("applicantUser")).thenReturn(Optional.of(applicant));

        UserDetails userDetails = customUserDetailsService.loadUserByUsername("applicantUser");

        assertNotNull(userDetails);
        assertEquals("applicantUser", userDetails.getUsername());
        assertEquals("hashedPassword456", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_APPLICANT")));

        verify(personRepository, times(1)).findByUserName("applicantUser");
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(personRepository.findByUserName("unknownUser")).thenReturn(Optional.empty());

        Exception exception = assertThrows(UsernameNotFoundException.class, () -> {
            customUserDetailsService.loadUserByUsername("unknownUser");
        });

        assertEquals("User not found: unknownUser", exception.getMessage());

        verify(personRepository, times(1)).findByUserName("unknownUser");
    }
}
