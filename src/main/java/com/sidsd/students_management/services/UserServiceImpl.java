package com.sidsd.students_management.services;

import com.sidsd.students_management.entity.UserEntity;
import com.sidsd.students_management.model.User;
import com.sidsd.students_management.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        String token = generateNewToken();
        user.setToken(token);
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);
        return user;
    }

    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();
    public static String generateNewToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }



    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();

        List<User> users = userEntities
                .stream()
                .map(usr -> new User(
                        usr.getEmail(),
                        usr.getUsername(),
                        usr.getPassword(),
                        usr.getToken()))
                .collect(Collectors.toList());
        return users;
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity = userRepository.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) {

        List<UserEntity> userEntities = userRepository.findAll();
        User user = new User();
        List<User> users = userEntities
                .stream()
                .map(usr -> new User(
                        usr.getEmail(),
                        usr.getUsername(),
                        usr.getPassword(),
                        usr.getToken()))
                .collect(Collectors.toList());

        users.forEach((User usr) -> {
            if (usr.getEmail().equals(email) && usr.getPassword().equals(password)){
                user.setId(usr.getId());
                user.setPassword(usr.getPassword());
                user.setEmail(usr.getEmail());
                user.setToken(usr.getToken());
            }
        });

        return user;
    }


    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity = userRepository.findById(id).get();
        userEntity.setEmail(user.getEmail());
        userEntity.setEmail(user.getUsername());
        userEntity.setPassword(user.getPassword());
        userEntity.setToken(user.getToken());
        userRepository.save(userEntity);
        return user;
    }
}
