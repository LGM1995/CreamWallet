package com.example.learnreacttypescript.repository;

import com.example.learnreacttypescript.entity.Cream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface CreamRepository extends JpaRepository<Cream, Long> {
    public Cream findByDate(Timestamp date);

    @Query(value =
    "SELECT * FROM cream c join user u on c.user_id = u.user_id WHERE u.username = :username",
            nativeQuery = true)
    List<Cream> findByCustomerId(@Param("username") String username);
}
