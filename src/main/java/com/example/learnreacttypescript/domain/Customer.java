package com.example.learnreacttypescript.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (unique = true, nullable = false, length = 30)
    private String customerId;
    @Column (nullable = false, length = 100)
    private String pw;
    @Column (nullable = false, length = 10)
    private String name;
    @Column (nullable = false, length = 100)
    private String email;
    @Column (nullable = false, length = 50)
    private Long phone;
    @CreationTimestamp
    @Column (nullable = false)
    private Timestamp createDate;
}
