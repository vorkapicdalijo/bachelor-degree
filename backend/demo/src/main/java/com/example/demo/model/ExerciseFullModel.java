package com.example.demo.model;

import javax.validation.constraints.NotBlank;

public class ExerciseFullModel {

    private final int exercise_id;

    private final int workout_id;

    private final String name;

    private final String imageurl;

    private final String description;

    private final int sets;

    private final int reps;


    public ExerciseFullModel(int exercise_id,int workout_id, String name, String imageurl, String description, int sets, int reps) {
        this.workout_id = workout_id;
        this.exercise_id = exercise_id;
        this.name = name;
        this.imageurl = imageurl;
        this.description = description;
        this.sets = sets;
        this.reps = reps;
    }

    public int getExercise_id() {
        return exercise_id;
    }

    public int getWorkout_id() {
        return workout_id;
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

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }
}
