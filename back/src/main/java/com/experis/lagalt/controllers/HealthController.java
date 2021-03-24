package com.experis.lagalt.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping(value = ControllerHelpers.API_V1 + "/health")
    public ResponseEntity<String> healthCheck() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }
}
