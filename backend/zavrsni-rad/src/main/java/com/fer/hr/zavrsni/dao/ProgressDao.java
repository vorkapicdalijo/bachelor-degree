package com.fer.hr.zavrsni.dao;

import com.fer.hr.zavrsni.model.Progress;

import java.util.List;

public interface ProgressDao {

    int insertProgress(Progress progress);

    List<Progress> getProgress(int user_id);
}
