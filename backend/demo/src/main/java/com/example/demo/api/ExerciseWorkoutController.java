package com.example.demo.api;

import com.example.demo.model.ExerciseFullModel;
import com.example.demo.model.ExerciseWorkout;
import com.example.demo.service.ExerciseWorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("exerciseworkouts")
@RestController
public class ExerciseWorkoutController {

    private final ExerciseWorkoutService exerciseWorkoutService;

    @Autowired
    public ExerciseWorkoutController(ExerciseWorkoutService exerciseWorkoutService) {
        this.exerciseWorkoutService = exerciseWorkoutService;
    }

    @PostMapping
    public void addExerciseWorkout(@Valid @NonNull @RequestBody ExerciseWorkout exerciseWorkout) {
        exerciseWorkoutService.addExerciseWorkout(exerciseWorkout);
    }

    @GetMapping
    public List<ExerciseWorkout> getAllExerciseWorkout() {
        return exerciseWorkoutService.getAllExerciseWorkouts();
    }
    @GetMapping(path = "{id}")
    public List<ExerciseFullModel> getAllExercisesFromWorkout(@PathVariable("id") int workout_id) {
        return exerciseWorkoutService.getAllExercisesFromWorkout(workout_id);
    }
    @DeleteMapping(path = "/{workout_id}/{exercise_id}")
    public void deleteExerciseWorkout(@PathVariable("workout_id") int workout_id, @PathVariable("exercise_id") int exercise_id) {
        exerciseWorkoutService.deleteExerciseWorkout(workout_id,exercise_id);
    }
    @PutMapping(path = "/{workout_id}/{exercise_id}")
    public void updateExerciseWorkout(@PathVariable("workout_id") int workout_id, @PathVariable("exercise_id") int exercise_id, @Valid @NonNull @RequestBody ExerciseWorkout exerciseWorkout) {
        exerciseWorkoutService.updateExerciseWorkout(workout_id, exercise_id, exerciseWorkout);
    }
}
