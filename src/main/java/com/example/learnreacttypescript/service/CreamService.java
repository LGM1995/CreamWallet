package com.example.learnreacttypescript.service;

import com.example.learnreacttypescript.entity.Cream;
import com.example.learnreacttypescript.entity.User;
import com.example.learnreacttypescript.dto.CreamDto;
import com.example.learnreacttypescript.exception.DuplicateMemberException;
import com.example.learnreacttypescript.repository.CreamRepository;
import com.example.learnreacttypescript.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreamService {
    private final CreamRepository creamRepository;
    private final UserRepository userRepository;

    public CreamService(CreamRepository creamRepository, UserRepository userRepository) {
        this.creamRepository = creamRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<CreamDto> creamList(String username) {
        return creamRepository.findByUsername(username).stream()
                .map(cream -> CreamDto.fromEntity(cream))
                .collect(Collectors.toList());
    }

    @Transactional
    public CreamDto create(String username, CreamDto creamDto) {
        User user = userRepository.findOneWithAuthoritiesByUsername(username).orElse(null);
        CreamDto cream;
        if (user != null) {
            Cream newCream = Cream.builder()
                    .menu(creamDto.getMenu())
                    .date(creamDto.getDate())
                    .state(creamDto.getState())
                    .user(user)
                    .build();
            creamRepository.save(newCream);
            cream = CreamDto.fromEntity(newCream);
        } else {
            throw new DuplicateMemberException("없는 회원 입니다.");
        }
        return cream;
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