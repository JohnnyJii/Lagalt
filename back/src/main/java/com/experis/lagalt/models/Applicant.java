package com.experis.lagalt.models;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "applicants")
public class Applicant implements GetUserDetails {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "motivation_letter")
    private String motivationLetter;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @JsonGetter("userId")
    public String userIdGetter() {
        return String.valueOf(user.getId());
    }

    @JsonGetter("projectId")
    public String projectIdGetter() {
        return String.valueOf(project.getId());
    }

    @Override
    public String geteMail() {
        return user.geteMail();
    }

    @Override
    public String getFirstname() {
        return user.getFirstname();
    }

    @Override
    public String getLastname() {
        return user.getLastname();
    }

    @Override
    public String getImageSource() {
        return user.getImageSource();
    }

    @Override
    public Set<String> getSkills() {
        return user.getSkills();
    }

    @Override
    public String getDescription() {
        return user.getDescription();
    }

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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getMotivationLetter() {
        return motivationLetter;
    }

    public void setMotivationLetter(String motivationLetter) {
        this.motivationLetter = motivationLetter;
    }
}
