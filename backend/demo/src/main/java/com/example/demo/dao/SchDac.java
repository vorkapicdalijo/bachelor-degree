package com.example.demo.dao;

import com.example.demo.model.Sch;
import com.example.demo.model.Schedule;
import com.example.demo.model.ScheduleAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository("postgres_sch")
public class SchDac implements SchDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SchDac(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertSch(ScheduleAction sch, int user_id) {
        final String sql="INSERT INTO test1 (subject, starttime, endtime, user_id) VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                sch.getSubject(),
                sch.getStartTime(),
                sch.getEndTime(),
                user_id);
        return 0;
    }

    @Override
    public List<ScheduleAction> getSch(int user_id) {
        final String sql="SELECT id, subject, starttime, endtime, user_id FROM test1 WHERE user_id = ?";
        List<ScheduleAction> schedules = jdbcTemplate.query(sql, new Object[]{user_id}, (resultSet, i) -> {
            return new ScheduleAction(
                    resultSet.getString("endtime"),
                    Integer.parseInt(resultSet.getString("id")),
                    resultSet.getString("starttime"),
                    resultSet.getString("subject")

            );
        });
        return schedules;
    }

    @Override
    public int deleteSch(int id) {
        final String sql="DELETE FROM test1 WHERE id = ?";
        jdbcTemplate.update(sql, id);
        return 0;
    }

    @Override
    public int updateSch(int id, ScheduleAction newEvent) {
        final String sql="UPDATE test1 SET subject='"+newEvent.getSubject()+"', starttime='"+newEvent.getStartTime()+"', endtime='"+newEvent.getEndTime()+"' WHERE id = ?";
        jdbcTemplate.update(sql,id);
        return 0;
    }
}
