package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ApplicantService applicantService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean userExists(long id) {
        return userRepository.existsById(id);
    }

    public boolean userExists(String googleid) {
        return userRepository.existsByGoogleid(googleid);
    }

    public User findUser(long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElseGet(User::new);
    }

    public User findUser(String googleid) {
        Optional<User> optionalUser = userRepository.findByGoogleid(googleid);
        return optionalUser.orElseGet(User::new);
    }

    public boolean deleteUser(long id) {
        if (userExists(id)) {
            projectService.deleteUsersProjects(findUser(id));
            applicantService.deleteUserApplications(findUser(id));
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Project> getUserProjects(long id) {
        ArrayList<Project> projects = new ArrayList<>();
        if (userExists(id)) {
            User user = findUser(id);
            projects.addAll(user.getProjects());
        }
        return projects;
    }

    public List<Project> getUserProjectsPartOf(long id) {
        ArrayList<Project> projects = new ArrayList<>();
        if (userExists(id)) {
            Set<Project> projectsPartOf = findUser(id).getProjectsPartOf();
            projects.addAll(projectsPartOf);
        }
        return projects;
    }
}
