package com.experis.lagalt.services;

import com.experis.lagalt.models.Applicant;
import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.ApplicantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ApplicantRepository applicantRepository;

    public List<Applicant> getApplicants(long projectId) {
        if (projectService.projectExists(projectId)) {
            return applicantRepository.findAllByProjectId(projectId);
        }
        return null;
    }

    public Applicant save(Applicant applicant, long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        if (applicationExists(projectId, userId)) {
            return null;
        }
        Project project = projectService.findProject(projectId);
        User user = userService.findUser(userId);
        applicant.setProject(project);
        applicant.setUser(user);
        if (applicantPartOfProject(applicant)) {
            return null;
        }
        return applicantRepository.save(applicant);
    }

    public boolean projectAndUserExists(long projectId, long userId) {
        boolean projectExists = projectService.projectExists(projectId);
        boolean userExists = userService.userExists(userId);
        return projectExists && userExists;
    }

    private boolean applicantPartOfProject(Applicant applicant) {
        Project project = projectService.findProject(applicant.getProject().getId());
        User user = userService.findUser(applicant.getUser().getId());
        if (project.getUser() == user) {
            return true;
        }
        return project.getUsers().contains(user);
    }

    private boolean applicationExists(long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return false;
        }
        return applicantRepository.existsByProjectIdAndUserId(projectId, userId);
    }

    public Applicant findApplicant(long projectId, long userId) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        return applicantRepository.findApplicantByProjectIdAndUserId(projectId, userId);
    }

    public Boolean acceptApplicant(long projectId, long userId, boolean accepted) {
        if (!projectAndUserExists(projectId, userId)) {
            return null;
        }
        if (!applicationExists(projectId, userId)) {
            return null;
        }
        User user = userService.findUser(userId);
        Project project = projectService.findProject(projectId);
        if (accepted) {
            project.getUsers().add(user);
        }
        Applicant applicant = findApplicant(projectId, userId);
        applicantRepository.delete(applicant);
        projectService.saveProject(project);
        return accepted;
    }

    public void deleteUserApplications(User user) {
        List<Applicant> userApplications = applicantRepository.findAllByUserId(user.getId());
        applicantRepository.deleteAll(userApplications);
    }

    public void deleteProjectApplications(Project project) {
        List<Applicant> projectApplications = applicantRepository.findAllByProjectId(project.getId());
        applicantRepository.deleteAll(projectApplications);
    }
}
