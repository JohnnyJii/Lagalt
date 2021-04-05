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

    @Autowired
    private ApplicantService applicantService;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public boolean projectExists(long id) {
        return projectRepository.existsById(id);
    }

    public Project findProject(long id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        return optionalProject.orElseGet(Project::new);
    }

    public void deleteProject(long id) {
        if (projectExists(id)) {
            applicantService.deleteProjectApplications(findProject(id));
            projectRepository.deleteById(id);
        }
    }

    public void deleteUsersProjects(User user) {
        deleteAllProjects(user.getProjects());
        deleteUserReferenceFromProjects(user);
    }

    private void deleteAllProjects(Iterable<Project> projects) {
        projectRepository.deleteAll(projects);
    }

    private void deleteUserReferenceFromProjects(User user) {
        for (Project project : user.getProjectsPartOf()) {
            project.getUsers().remove(user);
        }
    }
}