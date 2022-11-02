package com.example.learnreacttypescript.api;

import com.example.learnreacttypescript.dto.CreamDto;
import com.example.learnreacttypescript.service.CreamService;
import com.example.learnreacttypescript.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CreamApiController {
    private final CreamService creamService;
    private final CustomerService customerService;

    public CreamApiController(CreamService creamService, CustomerService customerService) {
        this.creamService = creamService;
        this.customerService = customerService;
    }

    @GetMapping("/api/{customerId}")
    public ResponseEntity<List<CreamDto>> read(@PathVariable String customerId) {
        List<CreamDto> creamDtos = creamService.creamList(customerId);
        return ResponseEntity.status(HttpStatus.OK).body(creamDtos);
    }

}
