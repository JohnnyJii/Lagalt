package com.experis.lagalt.security.models;

import com.experis.lagalt.models.User;
import com.experis.lagalt.models.role.Role;
import com.experis.lagalt.models.role.RoleType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDetail implements UserDetails {

    private String googleId;
    private User user;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetail(String googleId, User user,
                      Collection<? extends GrantedAuthority> authorities) {
        this.googleId = googleId;
        this.user = user;
        this.authorities = authorities;
    }

    public static UserDetail build(User user) {
        List<GrantedAuthority> authorityList = convertRolesToAuthority(user.getRoles());
        return new UserDetail(user.getGoogleid(), user, authorityList);
    }

    private static List<GrantedAuthority> convertRolesToAuthority(Set<Role> roles) {
        if (roles == null) {
            return new ArrayList<>();
        }
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().name()))
                .collect(Collectors.toList());
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}