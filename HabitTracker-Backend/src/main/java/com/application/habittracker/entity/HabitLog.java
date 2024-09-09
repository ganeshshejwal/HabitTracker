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
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "log_date")
    private Date logDate;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "target_in_measure")
    private Integer targetMeasure;

    @Column(name = "description")
    private String targetMeasureDescription;

    @Column(name = "no_of_times")
    private Integer noOfTimes = 0;

    @ManyToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
