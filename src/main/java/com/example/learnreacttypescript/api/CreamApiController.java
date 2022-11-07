package com.example.learnreacttypescript.api;

import com.example.learnreacttypescript.dto.CreamDto;
import com.example.learnreacttypescript.service.CreamService;
import com.example.learnreacttypescript.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CreamApiController {
    private final CreamService creamService;
    private final UserService userService;

    public CreamApiController(CreamService creamService, UserService userService) {
        this.creamService = creamService;
        this.userService = userService;
    }

    @GetMapping("/api/{username}")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<CreamDto>> read(@PathVariable String username) {
        List<CreamDto> creamDtos = creamService.creamList(username);
        return ResponseEntity.status(HttpStatus.OK).body(creamDtos);
    }

}
