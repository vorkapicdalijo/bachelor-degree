package com.example.demo.dao;

import com.example.demo.model.Sch;
import com.example.demo.model.Schedule;
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
    public int insertSch(Sch sch) {
        final String sql="INSERT INTO test1 (subject, starttime, endtime, isallday) VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                sch.getSubject(),
                sch.getStartTime(),
                sch.getEndTime(),
                sch.getIsAllDay());
        return 0;
    }

    @Override
    public List<Sch> getSch() {
        final String sql="SELECT id, subject, starttime, endtime, isallday FROM test1";
        List<Sch> schedules = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Sch(
                    Integer.parseInt(resultSet.getString("id")),
                    resultSet.getString("subject"),
                    Timestamp.valueOf(resultSet.getString("starttime")),
                    Timestamp.valueOf(resultSet.getString("endtime")),
                    Integer.parseInt(resultSet.getString("isallday"))
            );
        });
        return schedules;
    }
}
