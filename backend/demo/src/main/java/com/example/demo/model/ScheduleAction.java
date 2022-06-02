package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ScheduleAction {
    @JsonProperty("EndTime")
    private String endTime;
    @JsonProperty("Id")
    private int id;
    @JsonProperty("StartTime")
    private String startTime;
    @JsonProperty("Subject")
    private String subject;

    public ScheduleAction(@JsonProperty("EndTime") String endTime,@JsonProperty("Id") int id,@JsonProperty("StartTime") String startTime,@JsonProperty("Subject") String subject) {
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
