package com.application.habittracker.entity;

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
    private Integer targetMeasure;

    @Column (name = "habit_target_in_measure_description")
    private String targetMeasureDescription;

    @OneToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;

}
