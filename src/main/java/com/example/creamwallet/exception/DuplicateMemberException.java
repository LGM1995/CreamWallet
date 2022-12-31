package com.example.creamwallet.exception;

// 실행중에 발생한 시스템 오류에 대해 모든 오류 처리를 프레임워크에 맡긴다.
public class DuplicateMemberException extends RuntimeException {

    public DuplicateMemberException() {
        super();
    }
    public DuplicateMemberException(String message, Throwable cause) {
        super(message, cause);
    }
    public DuplicateMemberException(String message) {
        super(message);
    }
    public DuplicateMemberException(Throwable cause) {
        super(cause);
    }
}
