package ru.renhack.security;

import io.jsonwebtoken.*;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.renhack.entity.MyUser;
import ru.renhack.entity.Role;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class JwtProvider {

    private final Key jwtAccessSecret;
    private final Key jwtRefreshSecret;

    public JwtProvider(
            @Value("${jwt.secret.access}") String jwtAccessSecret,
            @Value("${jwt.secret.refresh}") String jwtRefreshSecret
    ) {
        this.jwtAccessSecret = new SecretKeySpec(Base64.getDecoder().decode(jwtAccessSecret),
                SignatureAlgorithm.HS256.getJcaName());
        this.jwtRefreshSecret = new SecretKeySpec(Base64.getDecoder().decode(jwtRefreshSecret),
                SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateAccessToken(@NonNull MyUser user) {
        System.out.println("jwtAccessSecret: " + jwtAccessSecret);
        final LocalDateTime now = LocalDateTime.now();
        final Instant accessExpirationInstant = now.plusMinutes(5).atZone(ZoneId.systemDefault()).toInstant();
        final Date accessExpiration = Date.from(accessExpirationInstant);

        List<String> roles = new ArrayList<>();
        for(Role role : user.getRoles()) {
            roles.add(role.getName());
        }

        return Jwts.builder()
                .claim("roles", roles)
                .claim("id", user.getId())
                .setSubject(user.getUsername())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(accessExpiration)
                .signWith(jwtAccessSecret)
                .compact();
    }

    public String generateRefreshToken(@NonNull MyUser user) {
        final LocalDateTime now = LocalDateTime.now();
        final Instant refreshExpirationInstant = now.plusDays(30).atZone(ZoneId.systemDefault()).toInstant();
        final Date refreshExpiration = Date.from(refreshExpirationInstant);

        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(refreshExpiration)
                .signWith(jwtRefreshSecret)
                .compact();
    }

    public boolean validateAccessToken(@NonNull String accessToken) {
        return validateToken(accessToken, jwtAccessSecret);
    }

    private boolean validateToken(@NonNull String token, @NonNull Key secret) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expEx) {
            log.error("Token expired", expEx);
        } catch (UnsupportedJwtException unsEx) {
            log.error("Unsupported jwt", unsEx);
        } catch (MalformedJwtException mjEx) {
            log.error("Malformed jwt", mjEx);
        } catch (SignatureException sEx) {
            log.error("Invalid signature", sEx);
        } catch (Exception e) {
            log.error("invalid token", e);
        }
        return false;
    }

    public boolean validateRefreshToken(@NonNull String refreshToken) {
        return validateToken(refreshToken, jwtRefreshSecret);
    }

    public Claims getAccessClaims(@NonNull String token) {
        return getClaims(token, jwtAccessSecret);
    }

    public Claims getRefreshClaims(@NonNull String token) {
        return getClaims(token, jwtRefreshSecret);
    }

    private Claims getClaims(@NonNull String token, @NonNull Key secret) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
