package com.example.demo.dao;

import com.example.demo.model.Sch;
import com.example.demo.model.ScheduleAction;

import java.util.List;

public interface SchDao {

    int insertSch(ScheduleAction sch, int user_id);

    List<ScheduleAction> getSch(int user_id);

    int deleteSch(int id);

    int updateSch(int id, ScheduleAction newEvent);
}
