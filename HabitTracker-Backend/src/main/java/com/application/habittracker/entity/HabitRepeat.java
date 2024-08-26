package com.application.habittracker.entity;

import jakarta.persistence.*;
import java.sql.Date;
import lombok.*;

@Entity
@Table(name = "habit_repeat")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitRepeat {

    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "habit_start_date", nullable = false)
    private Date habitStartDate;

    @Column(name = "habit_end_date", nullable = false)
    private Date habitEndDate;

    @Column(name = "every_month", nullable = false)
    private boolean everyMonth;

    @Column(name = "january", nullable = false)
    private Boolean january = false;

    @Column(name = "february", nullable = false)
    private Boolean february = false;

    @Column(name = "march", nullable = false)
    private Boolean march = false;

    @Column(name = "april", nullable = false)
    private Boolean april = false;

    @Column(name = "may", nullable = false)
    private Boolean may = false;

    @Column(name = "june", nullable = false)
    private Boolean june = false;

    @Column(name = "july", nullable = false)
    private Boolean july = false;

    @Column(name = "august", nullable = false)
    private Boolean august = false;

    @Column(name = "september", nullable = false)
    private Boolean september = false;

    @Column(name = "october", nullable = false)
    private Boolean october = false;

    @Column(name = "november", nullable = false)
    private Boolean november = false;

    @Column(name = "december", nullable = false)
    private Boolean december = false;

    @Column(name = "every_week", nullable = false)
    private Boolean everyWeek = false;

    @Column(name = "week1", nullable = false)
    private Boolean week1 = false;

    @Column(name = "week2", nullable = false)
    private Boolean week2 = false;

    @Column(name = "week3", nullable = false)
    private Boolean week3 = false;

    @Column(name = "week4", nullable = false)
    private Boolean week4 = false;

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

    @Column(name = "no_of_times_in_year", nullable = false)
    private Integer noOfTimesInYear = 0;

    @Column(name = "no_of_times_in_month", nullable = false)
    private Integer noOfTimesInMonth = 0;

    @Column(name = "no_of_times_in_week", nullable = false)
    private Integer noOfTimesInWeek = 0;

    @Column(name = "no_of_times_in_day", nullable = false)
    private Integer noOfTimesInDay = 0;

    @OneToOne
    @MapsId
    @JoinColumn(name = "habit_id")
    private HabitDetails habitDetails;
}
