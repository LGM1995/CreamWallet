package com.example.creamwallet.service;

import com.example.creamwallet.dto.CostDto;
import com.example.creamwallet.entity.Cream;
import com.example.creamwallet.entity.User;
import com.example.creamwallet.dto.CreamDto;
import com.example.creamwallet.exception.DuplicateMemberException;
import com.example.creamwallet.repository.CreamRepository;
import com.example.creamwallet.repository.UserRepository;
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
    public List<Integer> readYearList(String username) {
         List<Integer> yearList = creamRepository.findByUsername(username).stream()
                .map(year -> year.getDate().toLocalDateTime().getYear())
                .distinct()
                .collect(Collectors.toList());
        return yearList;
    }

    @Transactional
    public List<CreamDto> creamListWithYear(String username, Long year) {
        return creamRepository.findByUsernameWithYear(username, year).stream()
                .map(cream -> CreamDto.fromEntity(cream))
                .collect(Collectors.toList());
    }

    @Transactional
    public CostDto readCost(String username, Long year) {
        Long ice = creamRepository.findByUsernameWithYear(username, year).stream()
                .filter(cream -> cream.getState() == 0)
                .mapToLong(i -> i.getTemperature())
                .sum();
                // 수입(0) 상태의 비용을 더함

        Long hot = creamRepository.findByUsernameWithYear(username, year).stream()
                .filter(cream -> cream.getState() == 1)
                .mapToLong(i -> i.getTemperature())
                .sum();
                // 지출(1) 상태의 비용을 더함

        return new CostDto(ice, hot, ice-hot);
    }

    @Transactional
    public CreamDto create(String username, CreamDto creamDto) {
        User user = userRepository.findOneWithAuthoritiesByUsername(username).orElse(null);
        CreamDto cream;
        if (user != null) {
            Cream newCream = Cream.builder()
                    .menu(creamDto.getMenu())
                    .date(creamDto.getDate())
                    .temperature(creamDto.getTemperature())
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