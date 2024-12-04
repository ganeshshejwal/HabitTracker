package com.application.habittracker.entity;

import java.sql.Date;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "habit_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "log_date")
    private Date logDate;

    @Column(name = "target_name")
    private String targetName;

    @Column(name = "target_measure")
    private String targetMeasure;

    @ManyToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
