package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    public List<User> getApplicants(long projectId) {
        if (projectService.projectExists(projectId)) {
            Project project = projectService.findProject(projectId);
            return project.getApplicants();
        }
        return null;
    }

    public boolean projectAndUserExists(long projectId, long userId) {
        boolean projectExists = projectService.projectExists(projectId);
        boolean userExists = userService.userExists(userId);
        return projectExists && userExists;
    }

    public User apply(long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        if (userPartOfProject(projectId, userId)) {
            return null;
        }
        return addApplicant(projectId, userId);
    }

    private boolean userPartOfProject(long projectId, long userId) {
        Project project = projectService.findProject(projectId);
        User applicant = userService.findUser(userId);
        if (project.getUser() == applicant) {
            return true;
        }
        return project.getUsers().contains(applicant);
    }

    private User addApplicant(long projectId, long userId) {
        if (applicationExists(projectId, userId)) {
            return null;
        }
        Project project = projectService.findProject(projectId);
        User applicant = userService.findUser(userId);
        getApplicants(projectId).add(applicant);
        projectService.saveProject(project);
        return applicant;
    }

    private boolean applicationExists(long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return false;
        }
        List<User> applicants = getApplicants(projectId);
        User applicant = userService.findUser(userId);
        return applicants.contains(applicant);
    }

    public User findApplicant(long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        User applicant = userService.findUser(userId);
        List<User> applications = getApplicants(projectId);
        if (applications.contains(applicant)) {
            return applicant;
        }
        return null;
    }

    public Boolean acceptApplicant(long projectId, long userId, boolean accepted) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        if (!applicationExists(projectId, userId)) {
            return null;
        }
        User applicant = userService.findUser(userId);
        Project project = projectService.findProject(projectId);
        if (accepted) {
            project.getUsers().add(applicant);
        }
        getApplicants(projectId).remove(applicant);
        projectService.saveProject(project);
        return accepted;
    }
}
