package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

  
    @PostMapping("/register")
    public String register(@ModelAttribute User user) {
        System.out.println("REGISTER -> " + user);
        service.register(user);
        return "redirect:/login.html";
    }

    
    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session) {

        return service.login(email, password)
                .map(u -> {
                    session.setAttribute("user", u);
                    if (u.getRole().equalsIgnoreCase("admin")) {
                        return "redirect:/admin-dashboard.html";
                    } else {
                        return "redirect:/student-dashboard.html";
                    }
                })
                .orElse("redirect:/login.html?error=true");
    }

   
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login.html";
    }
}
