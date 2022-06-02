package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
public class ScheduleDTO {

    private  String action;
    @JsonProperty("EndDate")
    private  String endDate;
    @JsonProperty("StartDate")
    private  String startDate;
    private  List<ScheduleAction> added;
    private  List<ScheduleAction> changed;
    private  List<ScheduleAction> deleted;
    private  ScheduleParams params;

    /*
    public ScheduleDTO(@JsonProperty String action,
                       @JsonProperty String endDate,
                       @JsonProperty String startDate,
                       @JsonProperty List<ScheduleAction> added,
                       @JsonProperty List<ScheduleAction> changed,
                       @JsonProperty List<ScheduleAction> deleted,
                       @JsonProperty ScheduleParams params) {
        this.action = action;
        this.EndDate = endDate;
        this.StartDate = startDate;
        this.added = added;
        this.changed = changed;
        this.deleted = deleted;
        this.params = params;
    } */

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public List<ScheduleAction> getAdded() {
        return added;
    }

    public void setAdded(List<ScheduleAction> added) {
        this.added = added;
    }

    public List<ScheduleAction> getChanged() {
        return changed;
    }

    public void setChanged(List<ScheduleAction> changed) {
        this.changed = changed;
    }

    public List<ScheduleAction> getDeleted() {
        return deleted;
    }

    public void setDeleted(List<ScheduleAction> deleted) {
        this.deleted = deleted;
    }

    public ScheduleParams getParams() {
        return params;
    }

    public void setParams(ScheduleParams params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "Action:"+action+"\\n StartDate:"+startDate+"\\n EndDate:"+endDate+ "\\n Added:"+added+"\\n Params:"+params;
    }
}
