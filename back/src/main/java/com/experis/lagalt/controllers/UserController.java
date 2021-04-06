package com.experis.lagalt.controllers;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.services.AuthService;
import com.experis.lagalt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = ControllerHelpers.API_V1 + "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        if (!authService.isAdmin()) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        List<User> users = userService.getAllUsers();
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(users, status);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        if (!authService.isLoggedUser(user)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        User newUser = userService.saveUser(user);
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(newUser, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        if (!userService.userExists(id)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.isLoggedUser(id)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        User user = userService.findUser(id);
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(user, status);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @Valid @RequestBody User newUser) {
        if (!authService.isLoggedUser(newUser)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        User returnUser = new User();
        HttpStatus status;
        if (id != newUser.getId()) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(returnUser, status);
        }
        if (userService.userExists(id)) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.CREATED;
        }
        returnUser = userService.saveUser(newUser);
        return new ResponseEntity<>(returnUser, status);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id) {
        if (!userService.userExists(id)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.isLoggedUser(id)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        userService.deleteUser(id);
        HttpStatus status = HttpStatus.NO_CONTENT;
        return new ResponseEntity<>(null, status);
    }

    @GetMapping(value = "/{id}/projects")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable long id) {
        if (!userService.userExists(id)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.isLoggedUser(id)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        List<Project> projects = userService.getUserProjects(id);
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(projects, status);
    }

    @GetMapping(value = "/googleid/{googleId}")
    public ResponseEntity<User> getUser(@PathVariable String googleId) {
        if (!userService.userExists(googleId)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.isLoggedUser(googleId)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        User user = userService.findUser(googleId);
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(user, status);
    }

    @GetMapping(value = "/{userId}/projects/participant")
    public ResponseEntity<List<Project>> getProjectsUserPartOf(@PathVariable long userId) {
        if (!userService.userExists(userId)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (!authService.isLoggedUser(userId)) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        List<Project> projects = userService.getUserProjectsPartOf(userId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
}
