package com.example.demo.dao;

import com.example.demo.model.Exercise;
import com.example.demo.model.ExerciseFullModel;
import com.example.demo.model.ExerciseWorkout;

import java.util.List;

public interface ExerciseWorkoutDao {

    int insertExerciseWorkout(ExerciseWorkout exerciseWorkout);

    List<ExerciseWorkout> selectAll();

    List<ExerciseFullModel> selectExcercisesFromWorkout(int workout_id);

    int updateExerciseWorkout(int workout_id, int exercise_id, ExerciseWorkout exerciseWorkout);

    int deleteExerciseWorkout(int workout_id, int exercise_id);
}
