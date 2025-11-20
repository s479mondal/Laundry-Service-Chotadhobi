package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.entity.WashRequest;
import com.example.demo.entity.WashRequest.Status;
import com.example.demo.repository.WashRequestRepository;

@Service
public class WashService {

    private final WashRequestRepository repo;

    public WashService(WashRequestRepository repo) {
        this.repo = repo;
    }

    public WashRequest createWashRequest(WashRequest req) {
        req.setStatus(Status.PENDING);
        return repo.save(req);
    }

    public List<WashRequest> getUserRequests(User user) {
        return repo.findByUser(user);
    }

    public List<WashRequest> getAllRequests() {
        return repo.findAll();
    }

    public List<WashRequest> getPendingRequests() {
        return repo.findByStatus(Status.PENDING);
    }

    public List<WashRequest> getInProgressRequests() {
        return repo.findByStatus(Status.IN_PROGRESS);
    }

    public List<WashRequest> getCompletedRequests() {
        return repo.findByStatus(Status.COMPLETED);
    }

    public void updateStatus(Long id, Status status) {
        WashRequest req = repo.findById(id).orElseThrow();
        req.setStatus(status);
        repo.save(req);
    }
}
