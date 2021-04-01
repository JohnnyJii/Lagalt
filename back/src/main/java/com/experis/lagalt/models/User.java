package com.experis.lagalt.models;

import com.experis.lagalt.models.role.Role;
import com.experis.lagalt.models.role.RoleType;
import com.fasterxml.jackson.annotation.JsonGetter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Column(name = "googleid")
    private String googleid;

    @Column(name = "firebaseid")
    private String firebaseid;

    @Column(name = "username")
    private String username;

    @Column(name = "e_mail")
    private String eMail;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "image_source")
    private String imageSource;

    @ElementCollection
    private Set<String> skills;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "user")
    private Set<Project> projects;

    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User() {
        projects = new HashSet<>();
        skills = new HashSet<>();
    }

    @JsonGetter("projects")
    public List<String> projectsGetter() {
        if (projects == null) {
            return null;
        }
        return projectsToIdArray();
    }

    private List<String> projectsToIdArray() {
        return projects
                .stream()
                .map(project -> String.valueOf(project.getId()))
                .collect(Collectors.toList());
    }

    @JsonGetter("roles")
    public List<RoleType> rolesGetter() {
        if (roles == null) {
            return null;
        }
        return rolesToArray();
    }

    private List<RoleType> rolesToArray() {
        return roles.stream()
                .map(role -> role.getRole())
                .collect(Collectors.toList());
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEMail() {
        return eMail;
    }

    public void setEMail(String eMail) {
        this.eMail = eMail;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getGoogleid() { return googleid; }

    public void setGoogleid(String googleid) { this.googleid = googleid; }

    public String getFirebaseid() { return firebaseid; }

    public void setFirebaseid(String firebaseid) { this.firebaseid = firebaseid; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public Set<String> getSkills() {
        return skills;
    }

    public void setSkills(Set<String> skills) {
        this.skills = skills;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}