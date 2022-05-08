package com.example.demo.service;

import com.example.demo.dao.ExerciseDao;
import com.example.demo.model.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {

    private final ExerciseDao exerciseDao;

    @Autowired
    public ExerciseService(@Qualifier("postgres_exercise") ExerciseDao exerciseDao) {
        this.exerciseDao = exerciseDao;
    }

    public int addExercise(Exercise exercise) {
        return exerciseDao.insertExercise(exercise);
    }
    public List<Exercise> getAllExercise() {
        return exerciseDao.selectAllExercise();
    }
    public Optional<Exercise> getExerciseById(int id) {
        return exerciseDao.selectExerciseById(id);
    }
    public int deleteExercise(int id) {
        return exerciseDao.deleteExerciseById(id);
    }
    public int updateExercise(int id, Exercise newExercise) {
        return exerciseDao.updateExerciseById(id, newExercise);
    }
}
