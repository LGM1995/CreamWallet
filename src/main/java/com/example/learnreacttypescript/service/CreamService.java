package com.example.learnreacttypescript.service;

import com.example.learnreacttypescript.domain.Cream;
import com.example.learnreacttypescript.domain.Customer;
import com.example.learnreacttypescript.dto.CreamDto;
import com.example.learnreacttypescript.repository.CreamRepository;
import com.example.learnreacttypescript.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreamService {
    private final CreamRepository creamRepository;
    private final CustomerRepository customerRepository;

    public CreamService(CreamRepository creamRepository, CustomerRepository customerRepository) {
        this.creamRepository = creamRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public List<CreamDto> creamList(String customerId) {
        return creamRepository.findByCustomerId(customerId).stream()
                .map(cream -> CreamDto.fromEntity(cream))
                .collect(Collectors.toList());
    }

    @Transactional
    public CreamDto create(Long customerId, CreamDto creamDto) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer != null) {
            Cream newCream = Cream.builder()
                    .menu(creamDto.getMenu())
                    .date(creamDto.getDate())
                    .state(creamDto.getState())
                    .customer(customer)
                    .build();
            creamRepository.save(newCream);
        }
        return null;
    }

    @Transactional
    public CreamDto update(Long id, CreamDto creamDto) {
        Cream oldCream = (creamRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("update fail!")));
        oldCream.update(creamDto);
        return CreamDto.fromEntity(creamRepository.save(oldCream));
    }

    @Transactional
    public CreamDto delete(Long id) {
        Cream cream = creamRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("delete fail!"));
        creamRepository.delete(cream);
        return CreamDto.fromEntity(cream);
    }

}