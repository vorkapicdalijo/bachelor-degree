package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Exercise {

    private final int exercise_id;

    @NotBlank
    private final String name;

    private final String imageurl;

    private final String description;


    public Exercise(
            @JsonProperty("exercise_id") int exercise_id,
            @JsonProperty("name") String name,
            @JsonProperty("imageurl") String imageUrl,
            @JsonProperty("description") String description)
    {
        this.exercise_id = exercise_id;
        this.name = name;
        this.imageurl = imageUrl;
        this.description = description;
    }

    public int getExercise_id() {
        return exercise_id;
    }
    public String getName() {
        return name;
    }
    public String getImageurl() {
        return imageurl;
    }
    public String getDescription() {
        return description;
    }

}
