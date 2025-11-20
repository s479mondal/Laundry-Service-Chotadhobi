package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.WashRequest;
import com.example.demo.service.WashService;

@RestController
@RequestMapping("/api/admin/requests")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")
public class AdminController {
    private final WashService service;

    public AdminController(WashService service) {
        this.service = service;
    }

    @GetMapping("/pending")
    public List<WashRequest> getPending() {
        return service.getPendingRequests();
    }

    @GetMapping("/in-progress")
    public List<WashRequest> getInProgress() {
        return service.getInProgressRequests();
    }

    @GetMapping("/history")
    public List<WashRequest> getCompletedAndRejected() {
        List<WashRequest> all = service.getAllRequests();
        return all.stream()
                .filter(r -> r.getStatus() == WashRequest.Status.COMPLETED || r.getStatus() == WashRequest.Status.REJECTED)
                .toList();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam("value") String value) {
        WashRequest.Status newStatus = WashRequest.Status.valueOf(value);
        service.updateStatus(id, newStatus);
        return ResponseEntity.ok("Updated to " + value);
    }
}
