package com.example.demo.dao;

import com.example.demo.model.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository("postgres_schedule")
public class ScheduleDataAccessService implements ScheduleDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ScheduleDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertSchedule(Schedule schedule) {
        final String sql="INSERT INTO schedule (starttime, endtime, workout_id, user_id) VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                schedule.getStarttime(),
                schedule.getEndtime(),
                schedule.getWorkout_id(),
                schedule.getUser_id());
        return 0;
    }

    @Override
    public List<Schedule> selectWholeSchedule() {
        final String sql = "SELECT schedule_id, workout_id, user_id, starttime, endtime FROM schedule";

        List<Schedule> schedules = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Schedule(
                    Integer.parseInt(resultSet.getString("schedule_id")),
                    Integer.parseInt(resultSet.getString("workout_id")),
                    Integer.parseInt(resultSet.getString("user_id")),
                    Timestamp.valueOf(resultSet.getString("starttime")),
                    Timestamp.valueOf(resultSet.getString("endtime"))
            );
        });
        return schedules;
    }

    @Override
    public List<Schedule> selectScheduleFromuser(int user_id) {
        final String sql = "SELECT schedule_id, workout_id, user_id, starttime, endtime FROM schedule WHERE user_id = ?";

        List<Schedule> schedules = jdbcTemplate.query(sql,
                new Object[]{user_id},
                (resultSet, i) -> {
                    return new Schedule(
                            Integer.parseInt(resultSet.getString("schedule_id")),
                            Integer.parseInt(resultSet.getString("workout_id")),
                            Integer.parseInt(resultSet.getString("user_id")),
                            Timestamp.valueOf(resultSet.getString("starttime")),
                            Timestamp.valueOf(resultSet.getString("endtime"))
                    );
                });
        return schedules;
    }

    @Override
    public int deleteWholeUserSchedule(int user_id) {
        final String sql ="DELETE FROM schedule WHERE user_id = ?";
        jdbcTemplate.update(sql, user_id);
        return 0;
    }

    @Override
    public int deleteSchedule(int schedule_id) {
        final String sql = "DELETE FROM schedule WHERE schedule_id = ?";

        jdbcTemplate.update(sql,schedule_id);
        return 0;
    }

    @Override
    public int updateSchedule(int schedule_id, Schedule schedule) {
        final String sql = "UPDATE schedule SET starttime='"+schedule.getStarttime()+"', endtime='"+schedule.getEndtime()+"'," +
                "workout_id='"+schedule.getWorkout_id()+"'";
        jdbcTemplate.update(sql,schedule_id);

        return 0;
    }
}
