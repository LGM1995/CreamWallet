package com.example.creamwallet.api;

import com.example.creamwallet.dto.LoginDto;
import com.example.creamwallet.dto.TokenDto;
import com.example.creamwallet.dto.UserDto;
import com.example.creamwallet.jwt.JwtFilter;
import com.example.creamwallet.jwt.TokenProvider;
import com.example.creamwallet.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> authorize(HttpServletResponse response, @Valid @RequestBody LoginDto loginDto) {
        HttpHeaders httpHeaders = new HttpHeaders();
        TokenDto tokenDto = userService.login(loginDto);
        httpHeaders.add("Authorization", tokenDto.getAccessToken());

        Cookie cookie = new Cookie("refreshToken", tokenDto.getRefreshToken());
        cookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        String username = loginDto.getUsername();

        UserDto userDto = userService.getUserWithAuthorities(username);
        System.out.println(loginDto.getUsername() + " 님이 로그인 했습니다.");

        return new ResponseEntity<>(userDto, httpHeaders, HttpStatus.OK);
    }


    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

}
