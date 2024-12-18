package com.application.habittracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "habit_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "habit_name", nullable = false)
    private String habitName;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;
}

