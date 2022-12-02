package com.example.creamwallet.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    // 토큰의 타입을 정의
    private String grantType;
    // Authorization 토큰으로 header에 담겨 실제로 사용할 토큰
    private String accessToken;
    // Refresh 토큰으로 Cookie에 담아 asccesToken 만료시 인증을 위한 토큰
    private String refreshToken;
    // 토큰의 유효기간
    private Long accessTokenExpiresIn;
}
