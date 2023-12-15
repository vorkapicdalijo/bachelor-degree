package com.fer.hr.zavrsni.api;

import com.fer.hr.zavrsni.model.Workout;
import com.fer.hr.zavrsni.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("workouts")
@RestController
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public void addWorkout(@Valid @NonNull @RequestBody Workout workout) {
        workoutService.addWorkout(workout);
    }

    @GetMapping
    public List<Workout>  getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @GetMapping(path="userworkouts/{id}")
    public List<Workout> getAllUserWorkouts(@PathVariable("id") int id) {
        return workoutService.getAllUserWorkouts(id);
    }
    @DeleteMapping(path="{id}")
    public int getWorkoutById(@PathVariable("id") int id) {
        return workoutService.deleteWorkout(id);
    }
    @PutMapping(path="{id}")
    public int updateWorkout(@PathVariable("id") int id, @Valid @NonNull @RequestBody Workout workoutToUpdate) {
        return workoutService.updateWorkout(id, workoutToUpdate);
    }

}

