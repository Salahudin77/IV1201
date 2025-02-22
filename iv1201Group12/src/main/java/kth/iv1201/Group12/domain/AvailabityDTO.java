package kth.iv1201.Group12.domain;

import kth.iv1201.Group12.entity.Person;

import java.time.LocalDateTime;

public class AvailabityDTO {
    private LocalDateTime from;
    private LocalDateTime to;



    public LocalDateTime getFrom() {
        return from;
    }

    public void setFrom(LocalDateTime from) {
        this.from = from;
    }

    public LocalDateTime getTo() {
        return to;
    }

    public void setTo(LocalDateTime to) {
        this.to = to;
    }
}
