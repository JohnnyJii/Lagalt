package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean userExists(long id) {
        return userRepository.existsById(id);
    }

    public User findUser(long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElseGet(User::new);
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    public List<Project> getUserProjects(long id) {
        ArrayList<Project> projects = new ArrayList<>();
        if (userExists(id)) {
            User user = findUser(id);
            projects.addAll(user.getProjects());
        }
        return projects;
    }
}
