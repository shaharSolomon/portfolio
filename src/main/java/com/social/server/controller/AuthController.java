package com.social.server.controller;

import com.social.server.AuthService.AuthService;
import com.social.server.dto.LoginRequest;
import com.social.server.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        authService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("Logged in");
    }
}
