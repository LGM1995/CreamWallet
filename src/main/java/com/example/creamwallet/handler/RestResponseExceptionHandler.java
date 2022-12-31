package com.example.creamwallet.handler;

import com.example.creamwallet.dto.ErrorDto;
import com.example.creamwallet.exception.DuplicateMemberException;
import com.example.creamwallet.exception.NotFoundMemberException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;

// 모든 컨트롤러에 대한 예외를 잡아주는 어노테이션
@ControllerAdvice
public class RestResponseExceptionHandler extends ResponseEntityExceptionHandler {

    // ResponseStatus에 정의된 HttpStatus가 CONFLICT(충돌: 클라이언트의 요청이 서버의 상태와 맞지 않아 생김)인 경우
    @ResponseStatus(CONFLICT)
    // RuntimeException을 상속 받은 DuplicateMemberException을 예외 처리 핸들러로 사용
    @ExceptionHandler(value = { DuplicateMemberException.class })
    // 리턴 타입 ErrorDto를 HttpResponse의 responsBody로 매핑한다고 명시
    @ResponseBody
    protected ErrorDto badRequest(RuntimeException ex, WebRequest request) {
        return new ErrorDto(CONFLICT.value(), ex.getMessage());
    }

    // ResponseStatus에 정의된 HttpStatus가 FORBIDDEN(금지: 권한에 따른 접근이 허용되지 않은 경우)인 경우
    @ResponseStatus(FORBIDDEN)
    // RuntimeException을 상속 받은 NotFoundMemberException, AccessDeniedException을 예외 처리 핸들러로 사용
    // 같은 내용의 코드 작업을 하는 핸들러의 이름을 다르게 두는 이유는 어떤 에러인지 명확하게 확인하기 위함???
    @ExceptionHandler(value = { NotFoundMemberException.class, AccessDeniedException.class })
    // 리턴 타입 ErrorDto를 HttpResponse의 responsBody로 매핑한다고 명시
    @ResponseBody
    protected ErrorDto forbidden(RuntimeException ex, WebRequest request) {
        return new ErrorDto(FORBIDDEN.value(), ex.getMessage());
    }
}
