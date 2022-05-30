package com.example.demo.dao;

import com.example.demo.model.Sch;

import java.util.List;

public interface SchDao {

    int insertSch(Sch sch);

    List<Sch> getSch();
}
