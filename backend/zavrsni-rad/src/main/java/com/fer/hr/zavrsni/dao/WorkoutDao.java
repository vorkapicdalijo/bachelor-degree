package com.fer.hr.zavrsni.dao;

import com.fer.hr.zavrsni.model.Workout;

import java.util.List;
import java.util.Optional;

public interface WorkoutDao {

    int insertWorkout(Workout workout);

    List<Workout> selectAllWorkouts();

    List<Workout> selectWorkoutsByUserId(int user_id);

    Optional<Workout> selectWorkoutById(int workout_id);

    int deleteWorkoutByWorkoutId(int workout_id);

    int deleteAllUserWorkouts(int user_id);

    int updateWorkoutById(int workout_id, Workout workout);
}
