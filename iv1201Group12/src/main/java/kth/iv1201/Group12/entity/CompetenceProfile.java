package kth.iv1201.Group12.entity;

import jakarta.persistence.*;

@Entity

@Table(name = "competence_profile")

public class CompetenceProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="competence_profile_id;")
    private int  competence_profile_id;
    @Column(name ="person_id")
    private  int person_id;
    @Column(name ="years_of_experience")
    private float years_of_experience;

    public CompetenceProfile(int competence_profile_id, int person_id, float years_of_experience) {
        this.competence_profile_id = competence_profile_id;
        this.person_id = person_id;
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

    public int getPerson_id() {
        return person_id;
    }

    public void setPerson_id(int person_id) {
        this.person_id = person_id;
    }

    public float getYears_of_experience() {
        return years_of_experience;
    }

    public void setYears_of_experience(float years_of_experience) {
        this.years_of_experience = years_of_experience;
    }
}

