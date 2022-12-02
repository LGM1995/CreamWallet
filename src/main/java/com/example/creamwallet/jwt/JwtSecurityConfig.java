package com.example.creamwallet.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// 직접 만든 TokenProvider 와 JwtFilter 를 SecurityConfig 에 적용할 때 사용
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;

    //    @RequiredArgsConstructor(Lombok)의 사용으로 final 변수 생성자를 자동으로 만든다.
    //    public JwtSecurityConfig(TokenProvider tokenProvider) {
    //        this.tokenProvider = tokenProvider;
    //    }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(tokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
