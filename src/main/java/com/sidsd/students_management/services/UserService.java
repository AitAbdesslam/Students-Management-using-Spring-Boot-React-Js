package com.sidsd.students_management.services;

import com.sidsd.students_management.model.User;
import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    boolean deleteUser(Long id);

    User getUserById(Long id);

    User getUserByEmailAndPassword(String email, String password);

    User updateUser(Long id, User user);
}
