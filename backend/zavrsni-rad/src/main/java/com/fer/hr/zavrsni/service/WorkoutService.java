package com.fer.hr.zavrsni.service;

import com.fer.hr.zavrsni.dao.WorkoutDao;
import com.fer.hr.zavrsni.model.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutDao workoutDao;

    @Autowired
    public WorkoutService(@Qualifier("postgres_workout") WorkoutDao workoutDao) {
        this.workoutDao = workoutDao;
    }

    public int addWorkout(Workout workout) {
        return workoutDao.insertWorkout(workout);
    }
    public List<Workout> getAllWorkouts() {
        return workoutDao.selectAllWorkouts();
    }
    public List<Workout> getAllUserWorkouts(int user_id) {
        return workoutDao.selectWorkoutsByUserId(user_id);
    }
    public int deleteWorkout(int workout_id) {
        return workoutDao.deleteWorkoutByWorkoutId(workout_id);
    }
    public int updateWorkout(int workout_id, Workout newWorkout) {
        return workoutDao.updateWorkoutById(workout_id, newWorkout);
    }

}
