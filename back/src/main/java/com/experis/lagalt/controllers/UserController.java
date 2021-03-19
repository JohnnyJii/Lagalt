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
        HttpStatus status = HttpStatus.OK;
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, status);
    }
}
