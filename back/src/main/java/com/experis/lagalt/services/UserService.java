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

    public boolean userExists(String googleid) {
        return userRepository.existsByGoogleid(googleid);
    }

    public User findUser(String googleid) {
        Optional<User> optionalUser = userRepository.findByGoogleid(googleid);
        return optionalUser.orElseGet(User::new);
    }

    public boolean deleteUser(String googleid) {
        if (userExists(googleid)) {
            userRepository.deleteByGoogleid(googleid);
            return true;
        }
        return false;
    }

    public List<Project> getUserProjects(String googleid) {
        ArrayList<Project> projects = new ArrayList<>();
        if (userExists(googleid)) {
            User user = findUser(googleid);
            projects.addAll(user.getProjects());
        }
        return projects;
    }
}