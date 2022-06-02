package com.example.demo.service;

import com.example.demo.dao.SchDao;
import com.example.demo.model.Sch;
import com.example.demo.model.ScheduleAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Service
public class SchService {

    private final SchDao schDao;

    @Autowired
    public SchService(@Qualifier("postgres_sch") SchDao schDao) {
        this.schDao = schDao;
    }

    public int insertSch(ScheduleAction sch) {
        return schDao.insertSch(sch);
    }
    public List<ScheduleAction> getSch() {
        return schDao.getSch();
    }
    public int deleteSch(int id) {
        return schDao.deleteSch(id);
    }
    public int updateSch(int id, ScheduleAction newEvent) {
        return schDao.updateSch(id, newEvent);
    }
}
