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

    @GetMapping(value = "/{googleid}")
    public ResponseEntity<Project> getProject(@PathVariable String googleid) {
        Project project = new Project();
        HttpStatus status;
        if (projectRepository.existsByGoogleid(googleid)) {
            project = projectRepository.findByGoogleid(googleid).get();
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(project, status);
    }

    @PutMapping(value = "/{googleid}")
    public ResponseEntity<Project> updateProject(@PathVariable String googleid, @RequestBody Project newProject) {
        Project returnProject = new Project();
        HttpStatus status;
        if (googleid != newProject.getId()) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(returnProject, status);
        }
        boolean projectFound = projectRepository.existsByGoogleid(googleid);
        returnProject = projectRepository.save(newProject);
        if (projectFound) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.CREATED;
        }
        return new ResponseEntity<>(returnProject, status);
    }

    @DeleteMapping(value = "/{googleid}")
    public ResponseEntity<Project> deleteProject(@PathVariable String googleid) {
        HttpStatus status;
        if (projectRepository.existsByGoogleid(googleid)) {
            projectRepository.deleteByGoogleid(googleid);
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(null, status);
    }
}
