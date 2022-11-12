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
@RequestMapping("/api")
public class CreamApiController {
    private final CreamService creamService;
    private final UserService userService;

    public CreamApiController(CreamService creamService, UserService userService) {
        this.creamService = creamService;
        this.userService = userService;
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<CreamDto>> read(@PathVariable String username) {
        List<CreamDto> creamDtos = creamService.creamList(username);
        return ResponseEntity.status(HttpStatus.OK).body(creamDtos);
    }

    @PostMapping("/{username}/scoop")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<CreamDto> scoop(@PathVariable String username, @RequestBody CreamDto creamDto) {
        CreamDto cream = creamService.create(username, creamDto);
        return ResponseEntity.status(HttpStatus.OK).body(cream);
    }

    @DeleteMapping("/{username}/delete/{id}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<CreamDto> delete(@PathVariable String username, @PathVariable Long id) {
        CreamDto cream = creamService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(cream);
    }

    @PatchMapping("/{username}/update/{id}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<CreamDto> update(@PathVariable String username,
                                           @PathVariable Long id,
                                           @RequestBody CreamDto creamDto) {
        CreamDto cream = creamService.update(id, creamDto);
        return ResponseEntity.status(HttpStatus.OK).body(cream);
    }
}
