package com.social.server.AuthService;

import com.social.server.model.User;
import com.social.server.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(String username, String password) {
        String cleanUsername = username == null ? "" : username.trim();
        if (cleanUsername.isEmpty()) throw new RuntimeException("Username is required");
        if (password == null || password.isEmpty()) throw new RuntimeException("Password is required");

        if (userRepository.existsByUsername(cleanUsername)) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(cleanUsername);
        user.setPassword(password); // כרגע בלי הצפנה
        userRepository.save(user);
    }

    public void login(String username, String password) {
        String cleanUsername = username == null ? "" : username.trim();

        User user = userRepository.findByUsername(cleanUsername)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
