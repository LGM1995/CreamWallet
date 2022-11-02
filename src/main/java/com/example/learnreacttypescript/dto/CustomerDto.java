package com.example.learnreacttypescript.dto;

import com.example.learnreacttypescript.domain.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CustomerDto {
    private Long id;
    private String customerId;
    private String pw;
    private String name;
    private String email;
    private Long phone;
    private Timestamp createDate;

    public static CustomerDto fromEntity (Customer customer) {
        return new CustomerDto(
                customer.getId(),
                customer.getCustomerId(),
                customer.getPw(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getCreateDate());
    }
}
