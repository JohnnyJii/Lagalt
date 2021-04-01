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

    private final SimpleGrantedAuthority USER = new SimpleGrantedAuthority(RoleType.ROLE_USER.name());
    private final SimpleGrantedAuthority OWNER = new SimpleGrantedAuthority(RoleType.ROLE_OWNER.name());
    private final SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority(RoleType.ROLE_ADMIN.name());

    public boolean isLoggedUsersProject(Project project) {
        if (isAdmin()) {
            return true;
        }
        // TODO handle missing content
        // Adding required params solves???
        if (project.getUser() == null) {
            System.out.println("NO USER FOR PROJECT");
            return false;
        }
        long userId = project.getUser().getId();
        User projectUser = userService.findUser(userId);
        if (projectUser.getGoogleid() == null) {
            System.out.println("NO GOOGLE ID FOR PROJECT USER");
            return false;
        }
        return projectUser.getGoogleid().equals(getLoggedGoogleId());
    }

    public String getLoggedGoogleId() {
        return getLoggedUser().getGoogleid();
    }

    public User getLoggedUser() {
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
