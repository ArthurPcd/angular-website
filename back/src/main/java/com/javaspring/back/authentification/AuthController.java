package com.javaspring.back.authentification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Credentials credentials) {
        try {
            String token = authService.login(credentials);
            return ResponseEntity.ok("Login réussi. Token : " + token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Credentials credentials) {
        try {
            authService.register(credentials);
            return ResponseEntity.ok("Inscription réussie");
        } catch (Exception e) {
            return ResponseEntity.status(403).body("Email is already used");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out!");
    }
}
