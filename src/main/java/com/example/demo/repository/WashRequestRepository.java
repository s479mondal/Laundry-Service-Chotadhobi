package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.User;
import com.example.demo.entity.WashRequest;
import com.example.demo.entity.WashRequest.Status;

public interface WashRequestRepository extends JpaRepository<WashRequest, Long> {
    List<WashRequest> findByUser(User user);
    List<WashRequest> findByStatus(Status status);
}
