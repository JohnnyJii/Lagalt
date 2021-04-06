package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.ProjectRepository;
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
    private ProjectRepository projectRepository;

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

    public User findUser(long id) {
        Optional<User> optionalUser = userRepository.findById(id);
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

    public boolean userExists(String googleId) {
        return userRepository.existsByGoogleid(googleId);
    }

    public User findUser(String googleId) {
        Optional<User> optionalUser = userRepository.findByGoogleid(googleId);
        return optionalUser.orElseGet(User::new);
    }

    public List<Project> getProjectsNewContentForUser(long id) {
        ArrayList<Project> projects = new ArrayList<>();
        if (userExists(id)) {
            Set<Project> allProjects = (Set) projectRepository.findAll();
            User user = findUser(id);
            Set<Project> projectsPartOf = user.getProjectsPartOf();

            for(Project proj : allProjects){
                if(projectsPartOf.contains(proj)){
                    allProjects.remove(proj);
                }
            }

            ArrayList<Project> orderedProjects = orderByUserSkills(allProjects, user);

            projects.addAll(orderedProjects);
        }
        return projects;
    }

    // Helper method for new content ordering by user skills
    private ArrayList<Project> orderByUserSkills(Set<Project> unorderedProjects, User user) {
        ArrayList<Project> projects = new ArrayList<>();
        ArrayList<Project> unordered = new ArrayList<>();
        unordered.addAll(unorderedProjects);
        Project temp;

        for (int i = 0; i < unordered.size() - 1; i++) {
            for (int j = i + 1; j < unorderedProjects.size(); j++) {
                if (compareSkills(unordered.get(i),unordered.get(j),user)){
                    temp = unordered.get(i);
                    unordered.add(i,unordered.get(j));
                    unordered.add(j,temp);
                }
            }
        }

        return unordered;
    }

    // Comparison of skills required for project
    private boolean compareSkills(Project projectA, Project projectB, User user) {
        int projectAScore=0;
        int projectBScore=0;

        for(String skill:projectA.getSkills()){
            if(user.getSkills().contains(skill)){
                projectAScore+=1;
            }
        }

        for(String skill:projectB.getSkills()){
            if(user.getSkills().contains(skill)){
                projectBScore+=1;
            }
        }

        if(projectAScore>projectBScore){
            return true;
        } else{
            return false;
        }
    }

}
