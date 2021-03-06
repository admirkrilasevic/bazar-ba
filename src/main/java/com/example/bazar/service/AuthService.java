package com.example.bazar.service;

import com.example.bazar.model.User;
import com.example.bazar.payload.AuthRequest;
import com.example.bazar.payload.AuthResponse;
import com.example.bazar.payload.ChangePasswordRequest;
import com.example.bazar.payload.RegisterRequest;
import com.example.bazar.repository.UserRepository;
import com.example.bazar.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
@AllArgsConstructor
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    public AuthResponse login(AuthRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();
        AuthResponse response = new AuthResponse(jwtToken,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getPhoto(),
                user.getDeactivated(),
                user.getAddress());
        return response;
    }

    public ResponseEntity<?> register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        User user = new User(registerRequest.getName(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()),
                registerRequest.getPhoneNumber(),
                registerRequest.getDateOfBirth(),
                registerRequest.getGender(),
                null,
                false,
                null);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    public ResponseEntity<?> changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.getById(changePasswordRequest.getId());
        user.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok().body("Password changed successfully");
    }
}
