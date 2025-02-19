package kth.iv1201.Group12.entity;

import jakarta.persistence.*;

@Entity

@Table(name = "competence")

public class Competence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "competence_id")
    private int competence_id;

    private String name;

    public Competence(int competence_id, String name) {
        this.competence_id = competence_id;
        this.name = name;
    }
    public Competence(){

    }

    public int getCompetence_id() {
        return competence_id;
    }

    public void setCompetence_id(int competence_id) {
        this.competence_id = competence_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
