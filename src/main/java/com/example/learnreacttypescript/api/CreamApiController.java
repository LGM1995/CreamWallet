package com.example.learnreacttypescript.api;

import com.example.learnreacttypescript.dto.CostDto;
import com.example.learnreacttypescript.dto.CreamDto;
import com.example.learnreacttypescript.service.CreamService;
import com.example.learnreacttypescript.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{username}/{year}")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<CreamDto>> readCreamList(@PathVariable String username, @PathVariable Long year) {
        List<CreamDto> costDto = creamService.creamListWithYear(username, year);
        return ResponseEntity.status(HttpStatus.OK).body(costDto);
    }

    @GetMapping("/{username}/yearlist")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<Integer>> readYearList(@PathVariable String username) {
        List<Integer> yearList = creamService.readYearList(username);
        return ResponseEntity.status(HttpStatus.OK).body(yearList);
    }

    @GetMapping("/{username}/cost/{year}")
//    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<CostDto> readCost(@PathVariable String username, @PathVariable Long year) {
        CostDto costDto = creamService.readCost(username, year);
        return ResponseEntity.status(HttpStatus.OK).body(costDto);
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
