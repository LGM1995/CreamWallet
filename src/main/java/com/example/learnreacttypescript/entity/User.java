package com.example.learnreacttypescript.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@Table(name = "\"user\"")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "user_id") // 회원 고유번호 INDEX
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "username", length = 50, unique = true) // 실제 회원 아이디
    private String username;

    @Column(name = "password", length = 100) // 비밀번호
    private String password;

    @Column(name = "name", length = 50) // 회원 실명
    private String name;

    @Column(name = "activated")
    private boolean activated;

    @Column(name = "email", length = 100, unique = true)
    private String email;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;
}