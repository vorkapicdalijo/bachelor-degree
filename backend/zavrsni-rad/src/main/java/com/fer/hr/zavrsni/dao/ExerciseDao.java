package com.fer.hr.zavrsni.dao;

import com.fer.hr.zavrsni.model.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseDao {

    int insertExercise(Exercise exercise);

    List<Exercise> selectAllExercise();

    Optional<Exercise> selectExerciseById(int id);

    int deleteExerciseById(int id);

    int updateExerciseById(int id, Exercise exercise);

    List<Exercise> selectExercisesByUserId(int user_id);
}
