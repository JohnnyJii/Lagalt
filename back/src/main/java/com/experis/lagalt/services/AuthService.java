package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.models.role.RoleType;
import com.experis.lagalt.security.models.UserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    private final SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority(RoleType.ROLE_ADMIN.name());

    public boolean isLoggedUser(long id) {
        User foundUser = userService.findUser(id);
        return isLoggedUser(foundUser);
    }

    public boolean isLoggedUser(String googleId) {
        User foundUser = userService.findUser(googleId);
        return isLoggedUser(foundUser);
    }

    public boolean isLoggedUser(User user) {
        if (isAdmin()) {
            return true;
        }
        if (user == null) {
            return false;
        }
        return getLoggedGoogleId().equals(user.getGoogleid());
    }

    public boolean isLoggedUsersProject(Project project) {
        if (isAdmin()) {
            return true;
        }
        return loggedUserOwnsProject(project);
    }

    public boolean canDeleteProject(long projectId) {
        if (isAdmin()) {
            return true;
        }
        Project project = projectService.findProject(projectId);
        return loggedUserOwnsProject(project);
    }

    public boolean loggedUserIsPartOfProject(long projectId) {
        Project project = projectService.findProject(projectId);
        return loggedUserIsPartOfProject(project);
    }

    public boolean loggedUserIsPartOfProject(Project project) {
        if (project == null) {
            return false;
        }
        User loggedUser = getLoggedUser();
        if (loggedUserOwnsProject(project)) {
            return true;
        }
        Set<User> participants = project.getUsers();
        return participants.contains(loggedUser);
    }

    private boolean loggedUserOwnsProject(Project project) {
        if (project == null) {
            System.out.println("No project");
            return false;
        }
        if (project.getUser() == null) {
            System.out.println("NO USER FOR PROJECT");
            return false;
        }
        long userId = project.getUser().getId();
        User projectUser = userService.findUser(userId);
        return isLoggedUser(projectUser);
    }

    private String getLoggedGoogleId() {
        return getLoggedUser().getGoogleid();
    }

    private User getLoggedUser() {
        return getLoggedUserDetail().getUser();
    }

    public boolean isAdmin() {
        return loggedUserHasRole(ADMIN);
    }

    private boolean loggedUserHasRole(SimpleGrantedAuthority role) {
        UserDetail userDetail = getLoggedUserDetail();
        return userDetail.getAuthorities().contains(role);
    }

    private UserDetail getLoggedUserDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetail) authentication.getPrincipal();
    }
}
