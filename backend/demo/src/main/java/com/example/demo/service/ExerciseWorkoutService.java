package com.example.demo.service;

import com.example.demo.dao.ExerciseWorkoutDao;
import com.example.demo.model.ExerciseFullModel;
import com.example.demo.model.ExerciseWorkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseWorkoutService {

    private final ExerciseWorkoutDao exerciseWorkoutDao;

    @Autowired
    public ExerciseWorkoutService(@Qualifier("exercise_workout") ExerciseWorkoutDao exerciseWorkoutDao) {
        this.exerciseWorkoutDao = exerciseWorkoutDao;
    }

    public int addExerciseWorkout(ExerciseWorkout exerciseWorkout) {
        return exerciseWorkoutDao.insertExerciseWorkout(exerciseWorkout);
    }
    public List<ExerciseWorkout> getAllExerciseWorkouts() {
        return exerciseWorkoutDao.selectAll();
    }
    public List<ExerciseFullModel> getAllExercisesFromWorkout(int workout_id) {
        return exerciseWorkoutDao.selectExcercisesFromWorkout(workout_id);
    }
    public int updateExerciseWorkout(int workout_id, int exercise_id, ExerciseWorkout newExercise) {
        return exerciseWorkoutDao.updateExerciseWorkout(workout_id,exercise_id,newExercise);
    }
    public int deleteExerciseWorkout(int workout_id, int exercise_id) {
        return exerciseWorkoutDao.deleteExerciseWorkout(workout_id, exercise_id);
    }


}
