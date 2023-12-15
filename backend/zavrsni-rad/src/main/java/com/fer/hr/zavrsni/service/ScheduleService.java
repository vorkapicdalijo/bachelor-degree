package com.fer.hr.zavrsni.service;

import com.fer.hr.zavrsni.dao.ScheduleDao;
import com.fer.hr.zavrsni.model.ScheduleData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleDao scheduleDao;

    @Autowired
    public ScheduleService(@Qualifier("postgres_schedule") ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }

    public int insertSch(ScheduleData sch, int user_id) {
        return scheduleDao.insertSch(sch, user_id);
    }
    public List<ScheduleData> getSch(int user_id) {
        return scheduleDao.getSch(user_id);
    }
    public int deleteSch(int id) {
        return scheduleDao.deleteSch(id);
    }
    public int updateSch(int id, ScheduleData newEvent) {
        return scheduleDao.updateSch(id, newEvent);
    }
}
