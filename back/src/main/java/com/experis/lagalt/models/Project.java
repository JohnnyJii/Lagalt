package com.experis.lagalt.models;

import com.fasterxml.jackson.annotation.JsonGetter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "industry")
    private String industry;

    @Column(name = "description")
    private String description;

    @Column(name = "gitlink")
    private String gitlink;

    @Column(name = "progress")
    private String progress;

    @ElementCollection
    private Set<String> skills;

    @ManyToOne
    @JoinColumn(name = "googleid")
    private User user;

    public Project() {
        skills = new HashSet<>();
    }

    @JsonGetter("user")
    public String userGetter() {
        if (user == null) {
            return null;
        }
        return user.getGoogleid();
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
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
}