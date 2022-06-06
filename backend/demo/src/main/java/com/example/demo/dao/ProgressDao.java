package com.example.demo.dao;

import com.example.demo.model.Progress;

import java.util.List;

public interface ProgressDao {

    int insertProgress(Progress progress);

    List<Progress> getProgress(int user_id);
}
