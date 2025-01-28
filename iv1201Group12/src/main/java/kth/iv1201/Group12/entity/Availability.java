package kth.iv1201.Group12.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Availability {

    @Id
    private int availability_id;
    private int person_id;

    private LocalDateTime  from_date;

    private LocalDateTime   to_date;

    public Availability(int availability_id, int person_id, LocalDateTime from_date, LocalDateTime to_date) {
        this.availability_id = availability_id;
        this.person_id = person_id;
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

    public int getPerson_id() {
        return person_id;
    }

    public void setPerson_id(int person_id) {
        this.person_id = person_id;
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
