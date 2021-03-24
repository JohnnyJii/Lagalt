package com.experis.lagalt.controllers;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = ControllerHelpers.API_V1 + "/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectRepository.findAll();
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(projects, status);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project newProject = projectRepository.save(project);
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(newProject, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Project> getProject(@PathVariable long id) {
        Project project = new Project();
        HttpStatus status;
        if (projectRepository.existsById(id)) {
            project = projectRepository.findById(id).get();
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(project, status);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable long id, @RequestBody Project newProject) {
        Project returnProject = new Project();
        HttpStatus status;
        if (id != newProject.getId()) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(returnProject, status);
        }
        boolean projectFound = projectRepository.existsById(id);
        returnProject = projectRepository.save(newProject);
        if (projectFound) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.CREATED;
        }
        return new ResponseEntity<>(returnProject, status);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable long id) {
        HttpStatus status;
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(null, status);
    }
}
