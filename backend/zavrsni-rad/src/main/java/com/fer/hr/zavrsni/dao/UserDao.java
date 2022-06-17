package com.fer.hr.zavrsni.dao;

import com.fer.hr.zavrsni.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {

    User insertUser(User exercise);

    List<User> selectAllUser();

    Optional<User> selectUserById(int id);

    int deleteUserById(int id);

    int updateUserById(int id, User user);

    User getUser(String username);
}
