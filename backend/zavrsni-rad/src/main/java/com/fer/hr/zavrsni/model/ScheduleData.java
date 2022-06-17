package com.fer.hr.zavrsni.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ScheduleData {
    @JsonProperty("EndTime")
    private String endTime;
    @JsonProperty("Id")
    private int id;
    @JsonProperty("StartTime")
    private String startTime;
    @JsonProperty("Subject")
    private String subject;

    public ScheduleData(@JsonProperty("EndTime") String endTime, @JsonProperty("Id") int id, @JsonProperty("StartTime") String startTime, @JsonProperty("Subject") String subject) {
        this.endTime = endTime;
        this.id = id;
        this.startTime = startTime;
        this.subject = subject;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return ("Id:"+this.getId()+" Subject:"+this.getSubject()+
        " StartTime:"+this.getStartTime()+" EndTime:"+this.getEndTime());
    }
}
