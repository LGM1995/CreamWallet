package com.example.learnreacttypescript.entity;

import com.example.learnreacttypescript.dto.CreamDto;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "cream")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Cream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (nullable = false, length = 20)
    private String menu;
    @Column (nullable = false)
    private Timestamp date;
    @Column (nullable = false, length = 2)
    private Long state;
    @Column (nullable = false)
    private Long temperature;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void update(CreamDto creamDto) {
        this.date = creamDto.getDate();
        this.menu = creamDto.getMenu();
        this.state = creamDto.getState();
        this.temperature = creamDto.getTemperature();
    }
}
