package com.experis.lagalt.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    // TODO log errors via logger

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        ObjectError e = ex.getBindingResult().getAllErrors().get(0);
        String name = ((FieldError) e).getField();
        String message = e.getDefaultMessage();
        return new ResponseEntity<>(name + ": " + message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleIntegrityViolations(DataIntegrityViolationException ex) {
        String detail = getDataIntegrityDetailMessage(ex);
        if (detail.contains("is not present in table")) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        if (detail.contains("already exists")) {
            return new ResponseEntity<>("Google id already in use", HttpStatus.BAD_REQUEST);
        }
        if (detail.contains("is still referenced from table")) {
            String message = "Could not delete entity. The entity is still referred somewhere...";
            return new ResponseEntity<>(message, HttpStatus.I_AM_A_TEAPOT);
        }
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    private String getDataIntegrityDetailMessage(DataIntegrityViolationException ex) {
        String errorMessage = ex.getMostSpecificCause().getMessage();
        int detailIndex = errorMessage.indexOf("Detail:");
        return errorMessage.substring(detailIndex);
    }
}
