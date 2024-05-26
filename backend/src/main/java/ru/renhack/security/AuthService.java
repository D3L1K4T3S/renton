package ru.renhack.security;

import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.renhack.dto.JwtRequest;
import ru.renhack.dto.JwtResponse;
import ru.renhack.entity.MyUser;
import ru.renhack.exception.AuthException;
import ru.renhack.service.impl.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserServiceImpl userService;
    private final Map<String, String> refreshStorage = new HashMap<>();
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public JwtResponse register(MyUser myUser) {
        final String accessToken = jwtProvider.generateAccessToken(myUser);
        final String refreshToken = jwtProvider.generateRefreshToken(myUser);
        refreshStorage.put(myUser.getUsername(), refreshToken);
        return new JwtResponse(accessToken, refreshToken);
    }

    public JwtResponse login(@NonNull JwtRequest authRequest) {
        final MyUser user = userService.getUser(authRequest.getUsername());
        if (user == null) {
            throw new AuthException("Пользователь не найден");
        }
        var encodedPassword = passwordEncoder.encode(authRequest.getPassword());
        log.info("login user with pass encoded: " + encodedPassword + " password: " + user.getPassword());
        if (user.getPassword().equals(encodedPassword)) {
            final String accessToken = jwtProvider.generateAccessToken(user);
            final String refreshToken = jwtProvider.generateRefreshToken(user);
            refreshStorage.put(user.getUsername(), refreshToken);
            return new JwtResponse(accessToken, refreshToken);
        } else {
            throw new AuthException("Неправильный пароль");
        }
    }

    public JwtResponse getAccessToken(@NonNull String refreshToken) {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String login = claims.getSubject();
            final String saveRefreshToken = refreshStorage.get(login);
            if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
                final MyUser user = userService.getUser(login);
                if (user == null) {
                    throw new AuthException("Пользователь не найден");
                }
                final String accessToken = jwtProvider.generateAccessToken(user);
                return new JwtResponse(accessToken, refreshToken);
            }
        }
        return new JwtResponse(null, null);
    }

    public JwtAuthentication getAuthInfo() {
        return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
    }

}
