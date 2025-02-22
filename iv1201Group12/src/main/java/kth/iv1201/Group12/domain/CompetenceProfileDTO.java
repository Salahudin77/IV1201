package kth.iv1201.Group12.domain;

public class CompetenceProfileDTO {
    private int competenceId;
    private int yearsOfExperience;

    public CompetenceProfileDTO(int competenceId, int yearsOfExperience) {
        this.competenceId = competenceId;
        this.yearsOfExperience = yearsOfExperience;
    }

    public int getCompetenceId() {
        return competenceId;
    }

    public void setCompetenceId(int competenceId) {
        this.competenceId = competenceId;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }
}
