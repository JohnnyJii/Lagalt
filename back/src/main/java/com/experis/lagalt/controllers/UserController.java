package com.experis.lagalt.controllers;

import com.experis.lagalt.models.Project;
import com.experis.lagalt.models.User;
import com.experis.lagalt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = ControllerHelpers.API_V1 + "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(users, status);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(newUser, status);
    }

    @GetMapping(value = "/{googleid}")
    public ResponseEntity<User> getUser(@PathVariable String googleid) {
        User user = userService.findUser(googleid);
        HttpStatus status;
        if (userService.userExists(googleid)) {
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(user, status);
    }

    @PutMapping(value = "/{googleid}")
    public ResponseEntity<User> updateUser(@PathVariable String googleid, @RequestBody User newUser) {
        User returnUser = new User();
        HttpStatus status;
        if (googleid != newUser.getId()) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(returnUser, status);
        }
        if (userService.userExists(googleid)) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.CREATED;
        }
        returnUser = userService.saveUser(newUser);
        return new ResponseEntity<>(returnUser, status);
    }

    @DeleteMapping(value = "/{googleid}")
    public ResponseEntity<User> deleteUser(@PathVariable String googleid) {
        HttpStatus status;
        boolean userDeleted = userService.deleteUser(googleid);
        if (userDeleted) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(null, status);
    }

    @GetMapping(value = "/{googleid}/projects")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable String googleid) {
        List<Project> projects = userService.getUserProjects(googleid);
        HttpStatus status;
        if (userService.userExists(googleid)) {
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(projects, status);
    }
}
