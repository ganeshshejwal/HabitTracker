package com.application.habittracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_information")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_basic_info")
    private String userBasicInfo;
}

