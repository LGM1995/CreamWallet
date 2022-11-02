package com.example.learnreacttypescript.repository;

import com.example.learnreacttypescript.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    public Customer findById(String c_id);
}
