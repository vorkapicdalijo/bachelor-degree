package com.fer.hr.zavrsni.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Exercise {

    private final int exercise_id;

    @NotBlank
    private final String name;

    private final String imageUrl;

    private final String description;

    private final int user_id;


    public Exercise(
            @JsonProperty("exercise_id") int exercise_id,
            @JsonProperty("name") String name,
            @JsonProperty("imageurl") String imageUrl,
            @JsonProperty("description") String description,
            @JsonProperty("user_id") int user_id)
    {
        this.exercise_id = exercise_id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.user_id = user_id;
    }

    public int getExercise_id() {
        return exercise_id;
    }
    public String getName() {
        return name;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public String getDescription() {
        return description;
    }
    public int getUser_id() {
        return user_id;
    }

}
