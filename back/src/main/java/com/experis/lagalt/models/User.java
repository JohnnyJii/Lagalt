package com.experis.lagalt.models;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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

    @NotBlank(message = "googleid required")
    @Column(name = "googleid", unique = true)
    private String googleid;

    @NotBlank(message = "username required")
    @Column(name = "username")
    private String username;

    @NotBlank(message = "email required")
    @Pattern(regexp = "^(.+)@(.+)\\.(.+)$", message = "invalid email. Example email: example@email.com")
    @Column(name = "e_mail")
    private String eMail;

    @NotBlank(message = "firstname required")
    @Column(name = "first_name")
    private String firstname;


    @NotBlank(message = "lastname required")
    @Column(name = "last_name")
    private String lastname;

    @Column(name = "image_source")
    private String imageSource;

    @ElementCollection
    private Set<String> skills;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "user")
    private Set<Project> projects;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private Set<Project> projectsPartOf;

    public User() {
        projects = new HashSet<>();
        skills = new HashSet<>();
    }

    @JsonGetter("projects")
    public List<String> projectsGetter() {
        if (projects == null) {
            return null;
        }
        return projectsToIdArray(projects);
    }

    @JsonGetter("partOf")
    public List<String> projectsPartOfGetter() {
        if (projectsPartOf == null) {
            return null;
        }
        return projectsToIdArray(projectsPartOf);
    }

    private List<String> projectsToIdArray(Set<Project> projects) {
        return projects
                .stream()
                .map(project -> String.valueOf(project.getId()))
                .collect(Collectors.toList());
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGoogleid() {
        return googleid;
    }

    public void setGoogleid(String googleId) {
        this.googleid = googleId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstName) {
        this.firstname = firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastName) {
        this.lastname = lastName;
    }

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

    public Set<Project> getProjectsPartOf() {
        return projectsPartOf;
    }

    public void setProjectsPartOf(Set<Project> projectsPartOf) {
        this.projectsPartOf = projectsPartOf;
    }
}
