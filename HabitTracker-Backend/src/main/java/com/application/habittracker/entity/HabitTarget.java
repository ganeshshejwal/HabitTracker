package com.application.habittracker.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "habit_target")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitTarget {
    
    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Column (name = "habit_target_in_times")
    private String targetTime;

    @Column (name = "habit_target_in_measure")
    private List<Integer> targetMeasure;

    @Column (name = "habit_target_in_measure_description")
    private List<Integer> targetMeasureDescription;

    @OneToOne
    @MapsId
    @JoinColumn(name = "habit_id")
    private HabitDetails habitDetails;

}
