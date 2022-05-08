package com.example.demo.dao;

import com.example.demo.model.Schedule;

import java.util.List;

public interface ScheduleDao {

    int insertSchedule(Schedule schedule);

    List<Schedule> selectWholeSchedule();
    List<Schedule> selectScheduleFromuser(int user_id);

    int deleteWholeUserSchedule(int user_id);
    int deleteSchedule(int schedule_id);
    int updateSchedule(int schedule_id, Schedule schedule);

}
