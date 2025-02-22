package kth.iv1201.Group12.entity;

import jakarta.persistence.*;

@Entity

@Table(name = "competence_profile")

public class CompetenceProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="competence_profile_id")
    private int  competence_profile_id;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
    private Person applicant;

    @Column(name ="years_of_experience")
    private float years_of_experience;

    public CompetenceProfile(int competence_profile_id, Person applicant, float years_of_experience) {
        this.competence_profile_id = competence_profile_id;
        this.applicant = applicant;
        this.years_of_experience = years_of_experience;
    }
    public CompetenceProfile(){

    }

    public int getCompetence_profile_id() {
        return competence_profile_id;
    }

    public void setCompetence_profile_id(int competence_profile_id) {
        this.competence_profile_id = competence_profile_id;
    }


    public void setApplicant(Person applicant) {
        this.applicant = applicant;
    }

    public float getYears_of_experience() {
        return years_of_experience;
    }

    public void setYears_of_experience(float years_of_experience) {
        this.years_of_experience = years_of_experience;
    }
}

