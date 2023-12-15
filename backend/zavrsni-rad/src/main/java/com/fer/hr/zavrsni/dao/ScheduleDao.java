package com.fer.hr.zavrsni.dao;

import com.fer.hr.zavrsni.model.ScheduleData;

import java.util.List;

public interface ScheduleDao {

    int insertSch(ScheduleData sch, int user_id);

    List<ScheduleData> getSch(int user_id);

    int deleteSch(int id);

    int updateSch(int id, ScheduleData newEvent);
}
