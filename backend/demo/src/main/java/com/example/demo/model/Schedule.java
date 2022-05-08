package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

public class Schedule {

    private final int schedule_id;

    private final int user_id;

    private final int workout_id;

    private final Timestamp starttime;

    private final Timestamp endtime;

    public Schedule(
            @JsonProperty("schedule_id") int schedule_id,
            @JsonProperty("user_id") int user_id,
            @JsonProperty("workout_id") int workout_id,
            @JsonProperty("starttime") Timestamp starttime,
            @JsonProperty("endtime") Timestamp endtime) {
        this.schedule_id = schedule_id;
        this.user_id = user_id;
        this.workout_id = workout_id;
        this.starttime = starttime;
        this.endtime = endtime;
    }

    public int getSchedule_id() {
        return schedule_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public int getWorkout_id() {
        return workout_id;
    }

    public Timestamp getStarttime() {
        return starttime;
    }

    public Timestamp getEndtime() {
        return endtime;
    }
}
