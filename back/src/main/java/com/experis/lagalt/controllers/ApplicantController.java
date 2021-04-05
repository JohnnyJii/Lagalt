package com.experis.lagalt.controllers;

import com.experis.lagalt.models.Applicant;
import com.experis.lagalt.services.ApplicantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = ControllerHelpers.API_V1 + "/projects/{projectId}/applications")
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;

    @GetMapping
    public ResponseEntity<List<Applicant>> getApplications(@PathVariable long projectId) {
        // TODO secure
        List<Applicant> applicants = applicantService.getApplicants(projectId);
        if (applicants == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(applicants, HttpStatus.OK);
    }

    @PostMapping(value = "/{userId}")
    public ResponseEntity<Applicant> createApplication(
            @PathVariable long projectId,
            @PathVariable long userId,
            @RequestBody Applicant applicant
    ) {
        // TODO secure
        if (!applicantService.projectAndUserExists(projectId, userId)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Applicant addedApplicant = applicantService.save(applicant, projectId, userId);
        if (addedApplicant == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(addedApplicant, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<Applicant> getApplication(
            @PathVariable long projectId,
            @PathVariable long userId
    ) {
        // TODO secure
        Applicant applicant = applicantService.findApplicant(projectId, userId);
        if (applicant == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(applicant, HttpStatus.OK);
    }

    @PostMapping(value = "/{userId}/{accepted}")
    public ResponseEntity<Boolean> acceptApplication(
            @PathVariable long projectId,
            @PathVariable long userId,
            @PathVariable boolean accepted
    ) {
        // TODO secure
        Boolean applicantAccepted =
                applicantService.acceptApplicant(projectId, userId, accepted);
        if (applicantAccepted == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(applicantAccepted, HttpStatus.OK);
    }
}
