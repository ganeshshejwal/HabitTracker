package com.application.habittracker.entity;

import jakarta.persistence.*;
import java.sql.Date;
import lombok.*;

@Entity
@Table(name = "habit_recurrence")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitRecurrence {

    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "everyday", nullable = false)
    private Boolean everyday = false;

    @Column(name = "sunday", nullable = false)
    private Boolean sunday = false;

    @Column(name = "monday", nullable = false)
    private Boolean monday = false;

    @Column(name = "tuesday", nullable = false)
    private Boolean tuesday = false;

    @Column(name = "wednesday", nullable = false)
    private Boolean wednesday = false;

    @Column(name = "thursday", nullable = false)
    private Boolean thursday = false;

    @Column(name = "friday", nullable = false)
    private Boolean friday = false;

    @Column(name = "saturday", nullable = false)
    private Boolean saturday = false;

    @Column(name = "habit_start_date", nullable = false)
    private Date habitStartDate;

    @Column(name = "habit_end_date", nullable = false)
    private Date habitEndDate;

    @Column(name = "no_of_times")
    private int noOfTimes;

    @Column(name ="per_day_or_other")
    private String perDayOrOther;

    @OneToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
