package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.entity.WashRequest;
import com.example.demo.service.WashService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/wash")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")
public class WashController {

    private final WashService service;

    public WashController(WashService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createWash(@RequestBody WashRequest request, HttpSession session) {
        User user = (User) session.getAttribute("user");
        System.out.println("📩 Wash create request received: " + request);
        System.out.println("🔑 Session user: " + user);

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized — please login again");
        }

        request.setUser(user);
        service.createWashRequest(request);
        System.out.println("✅ Wash request created successfully for " + user.getEmail());
        return ResponseEntity.ok("Wash request submitted successfully!");
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<WashRequest>> getMyRequests(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null)
            return ResponseEntity.status(401).build();

        List<WashRequest> list = service.getUserRequests(user);
        return ResponseEntity.ok(list);
    }
}
