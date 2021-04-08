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

    public void addViewedFromMain(User user, Collection<Project> projects) {
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getProjectSeenFromMain().addAll(projects);
        saveViewHistory(viewHistory);
    }

    public void addClickedProject(User user, Project project) {
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getClickedProjects().add(project);
        saveViewHistory(viewHistory);
    }

    public void addAppliedProject(User user, Project project) {
        ViewHistory viewHistory = getViewHistory(user);
        viewHistory.getAppliedProjects().add(project);
        saveViewHistory(viewHistory);
    }

    public void addContributedProjects(User user, Project project) {
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
