package com.javaspring.back.authentification;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "TaegT2cHcxbl0XLlyV3DQUiyJfpbeM3FBHbrGUJwC6FGjWXFti1fywYZ4Tsdss8r";

    public static String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .signWith(HS256, SECRET_KEY)
                .compact();
    }

}
