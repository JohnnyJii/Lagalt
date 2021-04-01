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

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    private final SimpleGrantedAuthority USER = new SimpleGrantedAuthority(RoleType.ROLE_USER.name());
    private final SimpleGrantedAuthority OWNER = new SimpleGrantedAuthority(RoleType.ROLE_OWNER.name());
    private final SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority(RoleType.ROLE_ADMIN.name());

    public boolean isLoggedUser(User user) {
        if (isAdmin()) {
            return true;
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

    private boolean loggedUserOwnsProject(Project project) {
        // TODO handle missing content
        // Adding required params solves???
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

    public boolean isUser() {
        return userHasRole(USER);
    }

    public boolean isOwner() {
        return userHasRole(OWNER);
    }

    public boolean isAdmin() {
        return userHasRole(ADMIN);
    }

    private boolean userHasRole(SimpleGrantedAuthority role) {
        UserDetail userDetail = getLoggedUserDetail();
        return userDetail.getAuthorities().contains(role);
    }

    private UserDetail getLoggedUserDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetail) authentication.getPrincipal();
    }
}
