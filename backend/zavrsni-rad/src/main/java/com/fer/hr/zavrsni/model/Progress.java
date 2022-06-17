package com.fer.hr.zavrsni.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Progress {
    private final String name;
    private final String weight;
    private final int sets;
    private final int reps;
    private final int user_id;
    private final String date;

    public Progress(@JsonProperty  String name,@JsonProperty String weight,@JsonProperty int sets,@JsonProperty int reps,@JsonProperty int user_id, @JsonProperty String date) {
        this.name = name;
        this.weight = weight;
        this.sets = sets;
        this.reps = reps;
        this.user_id = user_id;
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public String getName() {
        return name;
    }

    public String getWeight() {
        return weight;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }

    public int getUser_id() {
        return user_id;
    }
}
