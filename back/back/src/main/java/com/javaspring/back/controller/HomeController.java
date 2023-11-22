package com.javaspring.back.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Bienvenue sur l'application Spring Boot Java 1.8 !" + "\n" + "Pour accéder à l'API, rendez-vous sur /api" + "\n" + "Pour accéder à l'interface d'administration, rendez-vous sur /admin" + "\n" + "Réalisé par Joan Thomas et Arthur Pacaud.";
    }
}
