package com.example.demo.api;

import com.example.demo.model.Exercise;
import com.example.demo.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("exercises")
@RestController
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping
    public void addExercise(@Valid @NonNull @RequestBody Exercise exercise) {
        exerciseService.addExercise(exercise);
    }

    @GetMapping
    public List<Exercise> getAllExercise() {
        return exerciseService.getAllExercise();
    }

    @GetMapping(path="userexercises/{id}")
    public List<Exercise> getAllUserExercises(@PathVariable("id") int id) {
        return exerciseService.getAllUserExercises(id);
    }

    @GetMapping(path = "{id}")
    public Exercise getPersonById(@PathVariable("id") int id) {
        return exerciseService.getExerciseById(id)
                .orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public void deleteExerciseById(@PathVariable("id") int id) {
        exerciseService.deleteExercise(id);
    }

    @PutMapping(path = "{id}")
    public void updatePerson(@PathVariable("id")  int id, @Valid @NonNull @RequestBody Exercise exerciseToUpdate) {
        exerciseService.updateExercise(id,exerciseToUpdate);
    }
}
