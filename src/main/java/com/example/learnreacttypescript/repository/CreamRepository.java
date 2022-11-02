package com.example.learnreacttypescript.repository;

import com.example.learnreacttypescript.domain.Cream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface CreamRepository extends JpaRepository<Cream, Long> {
    public Cream findByDate(Timestamp date);

    @Query(value =
    "SELECT * FROM cream c join customer u on c.customer_id = u.id WHERE u.customer_id = :customerId",
            nativeQuery = true)
    List<Cream> findByCustomerId(@Param("customerId") String customerId);
}
