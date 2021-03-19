package com.experis.lagalt.controllers;

import com.experis.lagalt.models.User;
import com.experis.lagalt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = ControllerHelpers.API_V1 + "/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(users, status);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userRepository.save(user);
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(newUser, status);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        User user = new User();
        HttpStatus status;
        if (userRepository.existsById(id)) {
            user = userRepository.findById(id).get();
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(user, status);
    }
}
