package kth.iv1201.Group12.domain;

import kth.iv1201.Group12.entity.Person;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AvailabityDTO {
    private LocalDate from;
    private LocalDate to;

    public AvailabityDTO(LocalDate from, LocalDate to) {
        this.from = from;
        this.to = to;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }
}

