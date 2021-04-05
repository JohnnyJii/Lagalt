package com.experis.lagalt.models;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "title required")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "industry required")
    @Column(name = "industry")
    private String industry;

    @NotBlank(message = "description required")
    @Column(name = "description")
    private String description;

    @Column(name = "gitlink")
    private String gitlink;

    @Column(name = "progress")
    @NotBlank(message = "progress required")
    private String progress;

    @ElementCollection
    private Set<String> tags;

    @ElementCollection
    private Set<String> skills;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private Set<Applicant> applications;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "project_users",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users;

    @JsonGetter("user")
    public String userGetter() {
        if (user == null) {
            return null;
        }
        return String.valueOf(user.getId());
    }

    // Getters and setters
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getGitlink() {
        return gitlink;
    }

    public void setGitlink(String gitlink) {
        this.gitlink = gitlink;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Applicant> getApplications() {
        return applications;
    }

    public void setApplications(Set<Applicant> applications) {
        this.applications = applications;
    }
}
