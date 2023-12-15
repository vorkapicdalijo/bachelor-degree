package com.fer.hr.zavrsni.repository;

import com.fer.hr.zavrsni.dao.ProgressDao;
import com.fer.hr.zavrsni.model.Progress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_progress")
public class ProgressDataAccessService implements ProgressDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProgressDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertProgress(Progress progress) {
        final String sql = "INSERT INTO progress (name,weight,sets,reps,user_id,date) VALUES (?,?,?,?,?,?)";
        jdbcTemplate.update(sql,
                progress.getName(),
                progress.getWeight(),
                progress.getSets(),
                progress.getReps(),
                progress.getUser_id(),
                progress.getDate());
        return 0;
    }

    @Override
    public List<Progress> getProgress(int user_id) {
        final String sql = "SELECT name,weight,sets,reps,user_id,date FROM progress WHERE user_id=?";
        List<Progress> progresses = jdbcTemplate.query(sql,
                new Object[]{user_id},
                (resultSet,i) -> {
                    return new Progress(
                            resultSet.getString("name"),
                            resultSet.getString("weight"),
                            Integer.parseInt(resultSet.getString("sets")),
                            Integer.parseInt(resultSet.getString("reps")),
                            Integer.parseInt(resultSet.getString("user_id")),
                            resultSet.getString("date"));
                });
        return progresses;
    }
}
