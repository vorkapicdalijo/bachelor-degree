package com.example.demo.dao;

import com.example.demo.model.Exercise;
import com.example.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres_exercise")
public class ExerciseDataAccessService implements ExerciseDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExerciseDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public int insertExercise(Exercise exercise) {
        final String sql ="INSERT INTO exercise (name, imageurl, description) VALUES (?,?,?)";
        jdbcTemplate.update(sql,
                exercise.getName(),
                exercise.getImageurl(),
                exercise.getDescription());
        return 0;
    }

    @Override
    public List<Exercise> selectAllExercise() {
        final String sql = "SELECT exercise_id, name, imageurl, description from exercise ORDER BY exercise_id ASC";
        List<Exercise> exercises = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Exercise(
                    Integer.parseInt(resultSet.getString("exercise_id")),
                    resultSet.getString("name"),
                    resultSet.getString("imageurl"),
                    resultSet.getString("description"));
        });
        //return List.of(new Person(UUID.randomUUID(), "FROM POSTGRES"));
        return exercises;
    }

    @Override
    public Optional<Exercise> selectExerciseById(int id) {
        final String sql = "SELECT exercise_id, name, imageurl, description FROM exercise WHERE exercise_id = ?";

        Exercise exercise = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new Exercise(
                            Integer.parseInt(resultSet.getString("exercise_id")),
                            resultSet.getString("name"),
                            resultSet.getString("imageurl"),
                            resultSet.getString("description"));
                });

        return Optional.ofNullable(exercise);
    }

    @Override
    public int deleteExerciseById(int id) {
        final String sql = "DELETE FROM exercise WHERE exercise_id = ?";

        jdbcTemplate.update(sql, id);
        return 0;
    }

    @Override
    public int updateExerciseById(int id, Exercise exercise) {
        final String sql = "UPDATE exercise SET name='"+exercise.getName()+"', imageurl='"+exercise.getImageurl()+"', description='"+exercise.getDescription()+"' WHERE exercise_id = ?";

        jdbcTemplate.update(sql, id);

        return 0;
    }
}
