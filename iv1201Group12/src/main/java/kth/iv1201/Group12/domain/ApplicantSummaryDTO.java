package kth.iv1201.Group12.domain;
import java.util.List;

public class ApplicantSummaryDTO {


        private String username;
        private List<CompetenceProfileDTO> competences;
        private List<AvailabityDTO> availability;

    public ApplicantSummaryDTO(String username, List<CompetenceProfileDTO> competences, List<AvailabityDTO> availability) {
        this.username = username;
        this.competences = competences;
        this.availability = availability;
    }

    public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public List<CompetenceProfileDTO> getCompetences() {
            return competences;
        }

        public void setCompetences(List<CompetenceProfileDTO> competences) {
            this.competences = competences;
        }

        public List<AvailabityDTO> getAvailability() {
            return availability;
        }

        public void setAvailability(List<AvailabityDTO> availability) {
            this.availability = availability;
        }
    }


