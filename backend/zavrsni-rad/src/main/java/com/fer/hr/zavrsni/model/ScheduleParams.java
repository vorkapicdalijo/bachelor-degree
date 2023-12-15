package com.fer.hr.zavrsni.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ScheduleParams {
    @JsonProperty("StartDate")
    private String startDate;
    @JsonProperty("EndDate")
    private String endDate;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return (" Start:" + this.getStartDate() + " End:" + this.getEndDate());
    }
}
