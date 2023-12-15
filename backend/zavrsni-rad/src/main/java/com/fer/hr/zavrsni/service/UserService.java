package com.fer.hr.zavrsni.service;

import com.fer.hr.zavrsni.dao.UserDao;
import com.fer.hr.zavrsni.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class UserService {

    private final UserDao userDao;
    private final UserDetailsService userDetailsService;

    @Autowired
    public UserService(@Qualifier("postgres_user") UserDao userDao, UserDetailsService userDetailsService) {
        this.userDao = userDao;
        this.userDetailsService = userDetailsService;
    }

    public User addUser(User user) {
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
    public UserDetails findUser(String email) { return userDetailsService.loadUserByUsername(email); }
    public User getUser(String username) {return userDao.getUser(username); }
}
