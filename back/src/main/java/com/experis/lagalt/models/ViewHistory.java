package com.experis.lagalt.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "view_history")
public class ViewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "view_id")
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    @JoinColumn(name = "main")
    Set<Project> projectSeenFromMain = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "clicked")
    Set<Project> clickedProjects = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "applied")
    Set<Project> appliedProjects = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "contributed")
    Set<Project> contributedProjects = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Project> getProjectSeenFromMain() {
        return projectSeenFromMain;
    }

    public void setProjectSeenFromMain(Set<Project> projectSeenFromMain) {
        this.projectSeenFromMain = projectSeenFromMain;
    }

    public Set<Project> getClickedProjects() {
        return clickedProjects;
    }

    public void setClickedProjects(Set<Project> clickedProjects) {
        this.clickedProjects = clickedProjects;
    }

    public Set<Project> getAppliedProjects() {
        return appliedProjects;
    }

    public void setAppliedProjects(Set<Project> appliedProjects) {
        this.appliedProjects = appliedProjects;
    }

    public Set<Project> getContributedProjects() {
        return contributedProjects;
    }

    public void setContributedProjects(Set<Project> contributedProjects) {
        this.contributedProjects = contributedProjects;
    }
}
