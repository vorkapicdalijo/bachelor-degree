package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class Sch {

    private final int Id;
    private final String Subject;
    private final Timestamp StartTime;
    private final Timestamp EndTime;
    private final int isAllDay;

    public Sch(@JsonProperty  int id, @JsonProperty  String subject, @JsonProperty Timestamp startTime,@JsonProperty Timestamp endTime,@JsonProperty int isAllDay) {
        Id = id;
        Subject = subject;
        StartTime = startTime;
        EndTime = endTime;
        this.isAllDay = isAllDay;
    }

    public int getId() {
        return Id;
    }

    public String getSubject() {
        return Subject;
    }

    public Timestamp getStartTime() {
        return StartTime;
    }

    public Timestamp getEndTime() {
        return EndTime;
    }

    public int getIsAllDay() {
        return isAllDay;
    }
}
