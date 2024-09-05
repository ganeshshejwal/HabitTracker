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

    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "log_date")
    private Date logDate;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "habit_target_in_hours")
    private String targetInHours;

    @Column(name = "habit_target_in_measure")
    private String targetMeasure;

    @Column(name = "habit_target_in_measure_description")
    private String targetMeasureDescription;

    @Column(name = "no_of_times")
    private Integer noOfTimes;

    @Column(name = "habit_description")
    private String habitDescription;

    @Column(name = "is_checked")
    private Boolean isChecked = false;

    @ManyToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
