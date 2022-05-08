package com.example.demo.service;

import com.example.demo.dao.ScheduleDao;
import com.example.demo.model.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleDao scheduleDao;

    @Autowired
    public ScheduleService(ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }

    public int addSchedule(Schedule schedule) {
        return scheduleDao.insertSchedule(schedule);
    }
    public List<Schedule> getWholeSchedule() {
        return scheduleDao.selectWholeSchedule();
    }
    public List<Schedule> getScheduleFromUser(int user_id) {
        return scheduleDao.selectScheduleFromuser(user_id);
    }
    public int deleteWholeUserSchedule(int user_id) {
        return scheduleDao.deleteWholeUserSchedule(user_id);
    }

    public int deleteSchedule(int id) {
        return scheduleDao.deleteSchedule(id);
    }
    public int updateSchedule(int id, Schedule schedule) {
        return scheduleDao.updateSchedule(id, schedule);
    }
}
