package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public void register(User user) {
        repo.save(user);
    }

    public Optional<User> login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }
    public boolean existsByEmail(String email) {
    return repo.existsByEmail(email);
    }
}

