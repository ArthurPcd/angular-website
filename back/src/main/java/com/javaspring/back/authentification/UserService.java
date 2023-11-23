package com.javaspring.back.authentification;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User retrieveUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.orElseThrow(() -> new RuntimeException("Unable to find user with this email"));
    }


    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
