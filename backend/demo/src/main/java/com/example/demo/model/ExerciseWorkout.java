package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class ExerciseWorkout {

    @NotBlank
    private final int workout_id;

    @NotBlank
    private final int exercise_id;

    @NotBlank
    private final int sets;

    @NotBlank
    private final int reps;

    public ExerciseWorkout(
            @JsonProperty("workout_id") int workout_id,
            @JsonProperty("exercise_id") int exercise_id,
            @JsonProperty("sets") int sets,
            @JsonProperty("reps") int reps) {
        this.workout_id = workout_id;
        this.exercise_id = exercise_id;
        this.sets = sets;
        this.reps = reps;
    }

    public int getWorkout_id() {
        return workout_id;
    }

    public int getExercise_id() {
        return exercise_id;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }
}
