package com.example.demo.dao;

import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postgres_user")
public class UserDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public int insertUser(User user) {
        final String sql ="INSERT INTO appuser (name, email, password) VALUES (?,?,?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPassword());
        return 0;
    }

    @Override
    public List<User> selectAllUser() {
        final String sql = "SELECT user_id, name, email, password from appuser";
        List<User> users = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new User(
                    Integer.parseInt(resultSet.getString("user_id")),
                    resultSet.getString("name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"));
        });
        //return List.of(new Person(UUID.randomUUID(), "FROM POSTGRES"));
        return users;
    }

    @Override
    public Optional<User> selectUserById(int id) {
        final String sql = "SELECT user_id, name, email, password FROM appuser WHERE user_id = ?";

        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new User(
                            Integer.parseInt(resultSet.getString("user_id")),
                            resultSet.getString("name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"));
                });

        return Optional.ofNullable(user);
    }

    @Override
    public int deleteUserById(int id) {
        final String sql = "DELETE FROM appuser WHERE user_id = ?";

        jdbcTemplate.update(sql, id);
        return 0;
    }

    @Override
    public int updateUserById(int id, User user) {
        final String sql = "UPDATE user SET name='"+user.getName()+"', email='"+user.getEmail()+"', password='"+user.getPassword()+"' WHERE user_id = ?";

        jdbcTemplate.update(sql, id);

        return 0;
    }
}
