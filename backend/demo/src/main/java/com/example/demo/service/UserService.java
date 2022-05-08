package com.example.demo.service;

import com.example.demo.dao.UserDao;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(@Qualifier("postgres_user") UserDao userDao) {
        this.userDao = userDao;
    }

    public int addUser(User user) {
        return userDao.insertUser(user);
    }
    public List<User> getAllUser() {
        return userDao.selectAllUser();
    }
    public Optional<User> getUserById(int id) {
        return userDao.selectUserById(id);
    }
    public int deleteUser(int id) {
        return userDao.deleteUserById(id);
    }
    public int updateUser(int id, User newUser) {
        return userDao.updateUserById(id, newUser);
    }
}
