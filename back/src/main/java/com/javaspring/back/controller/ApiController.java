package com.javaspring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class ApiController {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ApiController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/ping")
    public String ping() {
        return "Pong";
    }

    @GetMapping("/status")
    public String status() {
        boolean isConnected = isConnected(mongoTemplate);

        return isConnected ? "Connected to MongoDB" : "Failed to connect to MongoDB";
    }

    private boolean isConnected(MongoTemplate mongoTemplate) {
        try {
            mongoTemplate.getCollectionNames();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
