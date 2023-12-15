package com.fer.hr.zavrsni.repository;

import com.fer.hr.zavrsni.dao.UserDao;
import com.fer.hr.zavrsni.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository("postgres_user")
public class UserDataAccessService implements UserDao, UserDetailsService {

    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {

        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final String sql = "SELECT user_id, name, email, password, role from appuser WHERE email=?";
        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{username},
                (resultSet, i) -> {
                    return new User(
                            Integer.parseInt(resultSet.getString("user_id")),
                            resultSet.getString("name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("role"));
                });
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public User insertUser(User user) {
        final String sql ="INSERT INTO appuser (name, email, password,role) VALUES (?,?,?,?)";

        jdbcTemplate.update(sql, user.getName(), user.getEmail(), passwordEncoder.encode(user.getPassword()), user.getRole());
        return user;
    }

    @Override
    public List<User> selectAllUser() {
        final String sql = "SELECT user_id, name, email, password, role from appuser";
        List<User> users = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new User(
                    Integer.parseInt(resultSet.getString("user_id")),
                    resultSet.getString("name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("role"));
        });
        //return List.of(new Person(UUID.randomUUID(), "FROM POSTGRES"));
        return users;
    }

    @Override
    public Optional<User> selectUserById(int id) {
        final String sql = "SELECT user_id, name, email, password, role FROM appuser WHERE user_id = ?";

        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new User(
                            Integer.parseInt(resultSet.getString("user_id")),
                            resultSet.getString("name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("role"));
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
        final String sql = "UPDATE appuser SET name='"+user.getName()+"', email='"+user.getEmail()+"', password='"+user.getPassword()+"' WHERE user_id = ?";

        jdbcTemplate.update(sql, id);

        return 0;
    }

    @Override
    public User getUser(String username) {
        final String sql = "SELECT user_id, name, email, password, role from appuser WHERE email=?";
        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{username},
                (resultSet, i) -> {
                    return new User(
                            Integer.parseInt(resultSet.getString("user_id")),
                            resultSet.getString("name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("role"));
                });
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

}
