package com.example.demo.dao;

import com.example.demo.model.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseDao {

    int insertExercise(Exercise exercise);

    List<Exercise> selectAllExercise();

    Optional<Exercise> selectExerciseById (int id);

    int deleteExerciseById(int id);

    int updateExerciseById(int id, Exercise exercise);
}
