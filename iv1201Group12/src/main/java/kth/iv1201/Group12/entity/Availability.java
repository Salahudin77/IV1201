package kth.iv1201.Group12.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "availability_id")
    private int availability_id;
    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
    private Person applicant;

    @Column(name ="from_date")
    private LocalDateTime  from_date;
    @Column(name =" to_date")
    private LocalDateTime   to_date;

    public Availability(int availability_id, Person applicant, LocalDateTime from_date, LocalDateTime to_date) {
        this.availability_id = availability_id;
        this.applicant = applicant;
        this.from_date = from_date;
        this.to_date = to_date;
    }
    public Availability(){

    }

    public int getAvailability_id() {
        return availability_id;
    }

    public void setAvailability_id(int availability_id) {
        this.availability_id = availability_id;
    }

    public Person getApplicant() {
        return applicant;
    }

    public void setApplicant(Person applicant) {
        this.applicant = applicant;
    }



    public LocalDateTime getFrom_date() {
        return from_date;
    }

    public void setFrom_date(LocalDateTime from_date) {
        this.from_date = from_date;
    }

    public LocalDateTime getTo_date() {
        return to_date;
    }

    public void setTo_date(LocalDateTime to_date) {
        this.to_date = to_date;
    }
}
