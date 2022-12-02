package com.example.creamwallet.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authenticationException) throws IOException {
        // 유효한 자격증명을 제공하지 않고 접근하려 할때 401에러로 HttpServletResponse 인터페이스에 등록되어 있다.
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
