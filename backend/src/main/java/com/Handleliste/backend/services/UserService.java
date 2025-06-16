package com.Handleliste.backend.services;

import com.Handleliste.backend.models.User;
import com.Handleliste.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findById(username);
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }
}
