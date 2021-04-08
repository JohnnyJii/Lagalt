package com.experis.lagalt.services;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.models.ViewHistory;
import com.experis.lagalt.repositories.ViewHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ViewHistoryService {

    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private ProjectService projectService;

    public void addViewedFromMain(Collection<Project> projects) {
        User user = authService.getLoggedUser();
        if (user == null) {
            return;
        }
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getProjectSeenFromMain().addAll(projects);
        saveViewHistory(viewHistory);
        System.out.println("saved all from main");
    }

    public void addClickedProject(Project project) {
        User user = authService.getLoggedUser();
        if (user == null) {
            return;
        }
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getClickedProjects().add(project);
        saveViewHistory(viewHistory);
    }

    public void addAppliedProject(long projectId) {
        User user = authService.getLoggedUser();
        if (user == null) {
            return;
        }
        Project project = projectService.findProject(projectId);
        if (project == null) {
            return;
        }
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getAppliedProjects().add(project);
        saveViewHistory(viewHistory);
    }

    public void addContributedProjects(long projectId) {
        Project project = projectService.findProject(projectId);
        if (project == null) {
            return;
        }
        addContributedProjects(project);
    }

    public void addContributedProjects(Project project) {
        User user = authService.getLoggedUser();
        if (user == null) {
            return;
        }
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getContributedProjects().add(project);
        saveViewHistory(viewHistory);
    }

    private ViewHistory getViewHistory(User user) {
        ViewHistory viewHistory = viewHistoryRepository.findByUser(user);
        if (viewHistory == null) {
            viewHistory = createNewHistory(user);
        }
        return viewHistory;
    }

    private ViewHistory createNewHistory(User user) {
        ViewHistory viewHistory = new ViewHistory();
        viewHistory.setUser(user);
        return saveViewHistory(viewHistory);
    }

    private ViewHistory saveViewHistory(ViewHistory viewHistory) {
        return viewHistoryRepository.save(viewHistory);
    }
}
