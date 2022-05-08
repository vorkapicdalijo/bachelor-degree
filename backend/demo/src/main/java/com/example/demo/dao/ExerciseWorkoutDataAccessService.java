package com.example.demo.dao;

import com.example.demo.model.ExerciseFullModel;
import com.example.demo.model.ExerciseWorkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("exercise_workout")
public class ExerciseWorkoutDataAccessService implements ExerciseWorkoutDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExerciseWorkoutDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public int insertExerciseWorkout(ExerciseWorkout exerciseWorkout) {
        final String sql = "INSERT INTO exerciseworkout (workout_id, exercise_id, sets, reps) VALUES (?,?,?,?)";
        jdbcTemplate.update(sql,
                exerciseWorkout.getWorkout_id(),
                exerciseWorkout.getExercise_id(),
                exerciseWorkout.getSets(),
                exerciseWorkout.getReps());
        return 0;
    }

    @Override
    public List<ExerciseWorkout> selectAll() {
        final String sql = "SELECT workout_id, exercise_id, sets, reps FROM exerciseworkout";
        List<ExerciseWorkout> exerciseWorkouts = jdbcTemplate.query(sql,
                (resultSet, i) -> {
            return new ExerciseWorkout(
                    Integer.parseInt(resultSet.getString("workout_id")),
                    Integer.parseInt(resultSet.getString("exercise_id")),
                    Integer.parseInt(resultSet.getString("sets")),
                    Integer.parseInt(resultSet.getString("reps"))
            );
                });
        return exerciseWorkouts;
    }

    @Override
    public List<ExerciseFullModel> selectExcercisesFromWorkout(int workout_id) {
        final String sql = "SELECT exercise_id, name, imageurl, description, workout_id, sets, reps FROM " +
                "exercise NATURAL JOIN exerciseworkout WHERE workout_id = ?";

        List<ExerciseFullModel> exerciseFullModels = jdbcTemplate.query(sql,
                new Object[]{workout_id},
                (resultSet, i) -> {
                    return new ExerciseFullModel(
                            Integer.parseInt(resultSet.getString("exercise_id")),
                            Integer.parseInt(resultSet.getString("workout_id")),
                            resultSet.getString("name"),
                            resultSet.getString("imageurl"),
                            resultSet.getString("description"),
                            Integer.parseInt(resultSet.getString("sets")),
                            Integer.parseInt(resultSet.getString("reps"))
                    );
                });
        return exerciseFullModels;
    }

    @Override
    public int updateExerciseWorkout(int workout_id, int exercise_id, ExerciseWorkout exerciseWorkout) {
        final String sql ="UPDATE exerciseworkout SET sets='"+exerciseWorkout.getSets()+"', reps='"+exerciseWorkout.getReps()+"' WHERE workout_id = ? AND exercise_id = ?";

        jdbcTemplate.update(sql, workout_id, exercise_id);
        return 0;
    }

    @Override
    public int deleteExerciseWorkout(int workout_id, int exercise_id) {
        final String sql = "DELETE FROM exerciseworkout WHERE workout_id = ? AND exercise_id = ?";

        jdbcTemplate.update(sql,workout_id, exercise_id);
        return 0;
    }
}
