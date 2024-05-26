package ru.renhack.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.renhack.dto.*;
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
    @PostMapping(ControllerURLs.VERIFY)
    public ResponseEntity<VerifyResponse> verify(@RequestBody VerifyRequest verifyRequest) {
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
        myUser.setTgName(verifyRequest.getTgName());
        userRepository.save(myUser);
        return ResponseEntity.ok(verifyResponse);
    }

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500"})
    @GetMapping(ControllerURLs.CHECK_ACTIVATED_TG)
    public ResponseEntity<CheckActivatedResponse> checkActivatedTg() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;
        if (authentication instanceof JwtAuthentication) {
            JwtAuthentication jwtAuthentication = (JwtAuthentication) authentication;
            username = jwtAuthentication.getUsername();
        }
        log.info("Authenticated user with username: " + username);
        MyUser myUser = userRepository.findByUsername(username);
        CheckActivatedResponse checkActivatedResponse = new CheckActivatedResponse(myUser.getActivated());
        return ResponseEntity.ok(checkActivatedResponse);
    }

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500", "http://localhost:8989", "http://0.0.0.0:8989"})
    @PostMapping(ControllerURLs.TG_COMPARE_CODE)
    public ResponseEntity<CompareResponse> compareVerifyCode(@RequestBody CompareRequest compareRequest) {
        MyUser myUser = userRepository.findByTgName(compareRequest.getTgName());
        CompareResponse compareResponse = new CompareResponse(Boolean.FALSE);
        if (myUser == null) {
            return ResponseEntity.ok(compareResponse);
        }
        if (!myUser.getVerifyCode().equals(compareRequest.getCode())) {
            return ResponseEntity.ok(compareResponse);
        }
        myUser.setTgName(compareRequest.getTgName());
        myUser.setTgId(compareRequest.getTgId());
        myUser.setActivated(Boolean.TRUE);
        userRepository.save(myUser);
        compareResponse.setActivated(Boolean.TRUE);
        return ResponseEntity.ok(compareResponse);
    }

}
