package com.example.demo.service;

import com.example.demo.dao.SchDao;
import com.example.demo.model.Sch;
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

    public int insertSch(Sch sch) {
        return schDao.insertSch(sch);
    }
    public List<Sch> getSch() {
        return schDao.getSch();
    }
}
