package com.fer.hr.zavrsni.service;

import com.fer.hr.zavrsni.dao.ProgressDao;
import com.fer.hr.zavrsni.model.Progress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    private final ProgressDao progressDao;

    @Autowired
    public ProgressService(@Qualifier("postgres_progress") ProgressDao progressDao) {
        this.progressDao = progressDao;
    }

    public int insertProgress(Progress progress) {
        return this.progressDao.insertProgress(progress);
    }

    public List<Progress> getProgresses(int user_id) {
        return this.progressDao.getProgress(user_id);
    }
}
