package com.sjc;

import com.sjc.common.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<List<String>> handleValidationException(ValidationException ex) {
        List<String> errors = ex.getErrors();
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
