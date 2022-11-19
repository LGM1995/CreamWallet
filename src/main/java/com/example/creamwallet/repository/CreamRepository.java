package com.example.creamwallet.repository;

import com.example.creamwallet.entity.Cream;
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
    List<Cream> findByUsername(@Param("username") String username);

    @Query(value =
            "SELECT * FROM cream c join user u on c.user_id = u.user_id WHERE u.username = :username AND DATE_FORMAT(c.date,'%Y') = :year",
            nativeQuery = true)
    List<Cream> findByUsernameWithYear(@Param("username") String username, @Param("year") Long year);


}
