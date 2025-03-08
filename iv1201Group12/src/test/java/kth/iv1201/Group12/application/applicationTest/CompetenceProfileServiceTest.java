package kth.iv1201.Group12.application.applicationTest;

import kth.iv1201.Group12.application.CompetenceProfileService;
import kth.iv1201.Group12.entity.Competence;
import kth.iv1201.Group12.entity.CompetenceProfile;
import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.CompetenceProfileRepository;
import kth.iv1201.Group12.repository.CompetenceRepository;
import kth.iv1201.Group12.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompetenceProfileServiceTest {

    @Mock
    private CompetenceProfileRepository competenceProfileRepository;

    @Mock
    private PersonRepository personRepository;

    @Mock
    private CompetenceRepository competenceRepository;

    @InjectMocks
    private CompetenceProfileService competenceProfileService;

    private Person testPerson;
    private Competence testCompetence;
    private CompetenceProfile testCompetenceProfile;

    @BeforeEach
    void setUp() {
        testPerson = new Person();
        testPerson.setUserName("testUser");

        testCompetence = new Competence();
        testCompetence.setCompetence_id(1);

        testCompetenceProfile = new CompetenceProfile();
        testCompetenceProfile.setApplicant(testPerson);
        testCompetenceProfile.setCompetence(testCompetence);
        testCompetenceProfile.setYears_of_experience(3.5f);
    }

    @Test
    void testCompetenceList_Success() {
        when(competenceProfileRepository.findAll()).thenReturn(Collections.singletonList(testCompetenceProfile));

        List<CompetenceProfile> result = competenceProfileService.competenceList();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(3.5f, result.get(0).getYears_of_experience());

        verify(competenceProfileRepository, times(1)).findAll();
    }

    @Test
    void testAddCompetence_Success() {
        when(personRepository.findByUserName("testUser")).thenReturn(Optional.of(testPerson));
        when(competenceRepository.findById(1)).thenReturn(Optional.of(testCompetence));
        when(competenceProfileRepository.save(any(CompetenceProfile.class))).thenReturn(testCompetenceProfile);

        competenceProfileService.addCompetence(1, 3.5f, "testUser");

        verify(competenceProfileRepository, times(1)).save(any(CompetenceProfile.class));
    }

    @Test
    void testAddCompetence_UserNotFound() {
        when(personRepository.findByUserName("unknownUser")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            competenceProfileService.addCompetence(1, 3.5f, "unknownUser");
        });

        assertEquals("User not found", exception.getMessage());

        verify(competenceProfileRepository, never()).save(any(CompetenceProfile.class));
    }

    @Test
    void testAddCompetence_CompetenceNotFound() {
        when(personRepository.findByUserName("testUser")).thenReturn(Optional.of(testPerson));
        when(competenceRepository.findById(99)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            competenceProfileService.addCompetence(99, 2.0f, "testUser");
        });

        assertEquals("Invalid competence", exception.getMessage());

        verify(competenceProfileRepository, never()).save(any(CompetenceProfile.class));
    }
}
