package com.experis.lagalt.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany
    @JoinTable(name = "history_projects",
            joinColumns = @JoinColumn(name = "view_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    List<Project> projectSeenFromMain = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "history_project",
            joinColumns = @JoinColumn(name = "view_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    List<Project> clickedProjects = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "history_applied",
            joinColumns = @JoinColumn(name = "view_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    List<Project> appliedProjects = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "history_contributed",
            joinColumns = @JoinColumn(name = "view_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    List<Project> contributedProjects = new ArrayList<>();

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

    public List<Project> getProjectSeenFromMain() {
        return projectSeenFromMain;
    }

    public void setProjectSeenFromMain(List<Project> projectSeenFromMain) {
        this.projectSeenFromMain = projectSeenFromMain;
    }

    public List<Project> getClickedProjects() {
        return clickedProjects;
    }

    public void setClickedProjects(List<Project> clickedProjects) {
        this.clickedProjects = clickedProjects;
    }

    public List<Project> getAppliedProjects() {
        return appliedProjects;
    }

    public void setAppliedProjects(List<Project> appliedProjects) {
        this.appliedProjects = appliedProjects;
    }

    public List<Project> getContributedProjects() {
        return contributedProjects;
    }

    public void setContributedProjects(List<Project> contributedProjects) {
        this.contributedProjects = contributedProjects;
    }
}
