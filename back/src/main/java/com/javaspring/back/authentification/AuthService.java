package com.javaspring.back.authentification;


import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService implements UserDetailsService {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    private final String EMAIL_REGEX = "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$";

    public AuthService(UserService userService, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.retrieveUser(email);
        return new AuthUserDetails(user);
    }

    public void register(RegisterData credentials) {
        if (userService.userExists(credentials.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        if (!isValidCredentials(credentials)) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = new User();
        user.setEmail(credentials.getEmail());
        user.setPassword(hashPassword(credentials.getPassword()));
        user.setBirthdate(credentials.getBirthdate());
        userService.saveUser(user);
    }

    public String login(Credentials credentials) {
        User user = userService.retrieveUser(credentials.getEmail());
        if (!isPasswordValid(credentials.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(credentials.getEmail());
    }

    private boolean isValidCredentials(RegisterData credentials) {
        String email = credentials.getEmail().trim();
        String password = credentials.getPassword().trim();

        boolean validEmail = email.matches(EMAIL_REGEX);
        boolean validPasswordLength = password.length() >= 8;
        long specialCharactersCount = password.chars().filter(ch -> "@?:-_~&=+/*%*^\\!.,;<>\'\"()[]{}$".indexOf(ch) >= 0).count();

        return validEmail && validPasswordLength && specialCharactersCount > 0;
    }

    private boolean isPasswordValid(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
