package ru.renhack.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.renhack.dto.VerifyResponse;
import ru.renhack.entity.MyUser;
import ru.renhack.repository.UserRepository;
import ru.renhack.security.JwtAuthentication;

import java.util.Random;

@RestController
@RequiredArgsConstructor
@Slf4j
public class VerifyController {

    private final UserRepository userRepository;

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500"})
    @GetMapping(ControllerURLs.VERIFY)
    public ResponseEntity<VerifyResponse> verify() {
        Random random = new Random();
        int verificationCode = random.nextInt(900000) + 100000;
        String verificationCodeStr = Integer.toString(verificationCode);
        VerifyResponse verifyResponse = new VerifyResponse(verificationCodeStr);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;
        if (authentication instanceof JwtAuthentication) {
            JwtAuthentication jwtAuthentication = (JwtAuthentication) authentication;
            username = jwtAuthentication.getUsername();
        }
        log.info("Authenticated user with username: " + username);
        MyUser myUser = userRepository.findByUsername(username);
        myUser.setVerifyCode(verificationCodeStr);
        userRepository.save(myUser);
        return ResponseEntity.ok(verifyResponse);
    }

}
