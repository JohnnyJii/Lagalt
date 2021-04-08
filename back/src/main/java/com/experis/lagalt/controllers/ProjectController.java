package com.experis.lagalt.controllers;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.services.ProjectService;
import com.experis.lagalt.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = ControllerHelpers.API_V1 + "/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectService.getAllProjects();

        if(!authService.isLoggedUser(authService.getLoggedGoogleId())){
            for(Project proj: projects){
                proj.setGitlink("");
            }
        }

        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(projects, status);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        if (!authService.isLoggedUsersProject(project)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        Project newProject = projectService.saveProject(project);
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(newProject, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Project> getProject(@PathVariable long id) {
        Project project = new Project();
        HttpStatus status;
        if (projectService.projectExists(id)) {
            project = projectService.findProject(id);
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(project, status);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable long id, @Valid @RequestBody Project newProject
    ) {
        if (!authService.isLoggedUsersProject(newProject)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        if (id != newProject.getId()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        boolean projectFound = projectService.projectExists(id);
        Project returnProject = projectService.saveProject(newProject);
        HttpStatus status;
        if (projectFound) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.CREATED;
        }
        return new ResponseEntity<>(returnProject, status);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable long id) {
        if (!projectService.projectExists(id)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.canDeleteProject(id)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        HttpStatus status = HttpStatus.NO_CONTENT;
        projectService.deleteProject(id);
        return new ResponseEntity<>(null, status);
    }
}
