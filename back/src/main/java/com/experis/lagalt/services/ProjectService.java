package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public boolean projectExists(String googleid) {
        return projectRepository.existsByGoogleid(googleid);
    }

    public Project findProject(String googleid) {
        Optional<Project> optionalProject = projectRepository.findByGoogleid(googleid);
        return optionalProject.orElseGet(Project::new);
    }

    public void deleteProject(String googleid) {
        if(projectExists(googleid)) {
            projectRepository.deleteByGoogleid(googleid);
        }
    }

    public User getProjectUser(String googleid) {
        User projectUser = new User();
        if (projectExists(googleid)) {
            Project project = findProject(googleid);
            projectUser = project.getUser();
        }
        return projectUser;
    }
}