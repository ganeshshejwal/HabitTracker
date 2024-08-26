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
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Id
    @Column(name = "log_date", nullable = false)
    private Date logDate;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "end_time", nullable = false)
    private String endTime;

    @Column(name = "target")
    private String target;

    @Column(name = "target_measure")
    private String targetMeasure;

    @Column(name = "no_of_times")
    private int noOfTimes;

    @Column(name ="per_day_or_other")
    private String perDayOrOther;

    @Column(name = "habit_description")
    private String habitDescription;

    @Column(name = "is_checked", nullable = false)
    private Boolean isChecked = false;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserInformation userInformation;

    @ManyToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
