package com.example.creamwallet.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@RequiredArgsConstructor
// 이전에는 GenericFilterBean 을 상속받아 doFilter를 오버라이드 하였으나 해당 필터는 서블렛이 작동전 과 작동 후 사이에
// 다른 서블릿의 같은 필터 요청에 대해 필터가 다시 작동하는 현상이 생긴다.
// 그러면 두번째 서블릿의 결과를 첫번째 서블릿도 받게 되는 현상으로 모든 서블릿의 요청당 한번만 수행하게 되는 OncePerRequestFilter를 사용하자.
public class JwtFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private TokenProvider tokenProvider;
    public JwtFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // 실제 필터링 로직은 doFilterInternal 에 들어감
    // JWT 토큰의 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
    // doFilter를 사용하게 되면 필터에 의한 서블렛이 실행되는 동안 다른 서플렛이 같은 필터에 접근하면 필터가 다시 실행된다.
    // 모든 서블렛 접근에 대해 한번만 필터의 역할을 수행하도록 OncePerRequestFilter를 상속받아 doFilterUnternal을 구현
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws IOException, ServletException {

        // 1. Request Header 에서 토큰을 꺼냄
        String jwt = resolveToken(httpServletRequest);

        // 2. URI 정보를 저장하기 위해 uri를 얻음
        String requestURI = httpServletRequest.getRequestURI();

        // 3. validateToken 으로 유효성을 검사
        // 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // 로그에 토큰과 uri 정보를 저장
            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            // 로그에 오류 저장
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    // Request Header 에서 토큰 정보를 꺼냄
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
