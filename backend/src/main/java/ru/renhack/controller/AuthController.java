package ru.renhack.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.renhack.dto.JwtRequest;
import ru.renhack.dto.JwtResponse;
import ru.renhack.dto.RefreshJwtRequest;
import ru.renhack.dto.RegisterRequest;
import ru.renhack.entity.MyUser;
import ru.renhack.security.AuthService;
import ru.renhack.service.impl.UserServiceImpl;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserServiceImpl userService;

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500"})
    @PostMapping(ControllerURLs.REGISTER)
    public ResponseEntity<JwtResponse> register(@RequestBody RegisterRequest registerRequest) {
        MyUser myUser = userService.createUser(registerRequest);
        final JwtResponse tokens = authService.register(myUser);
        return ResponseEntity.ok(tokens);
    }

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500"})
    @PostMapping(ControllerURLs.REFRESH_ACCESS)
    public ResponseEntity<JwtResponse> getNewRefreshToken(@RequestBody RefreshJwtRequest request) {
        final JwtResponse tokens = authService.getAccessToken(request.getRefreshToken());
        return ResponseEntity.ok(tokens);
    }

    @CrossOrigin(origins = {"http://172.18.75.96:3500", "http://localhost:3500"})
    @PostMapping(ControllerURLs.LOGIN)
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest authRequest) {
        final JwtResponse token = authService.login(authRequest);
        return ResponseEntity.ok(token);
    }

}