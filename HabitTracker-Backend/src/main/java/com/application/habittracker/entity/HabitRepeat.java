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

    @Column(name = "habit_start_date")
    private Date habitStartDate;

    @Column(name = "habit_end_date")
    private Date habitEndDate;

    @Column(name = "monthly")
    private Boolean monthly;

    @Column(name = "january")
    private Boolean january = false;

    @Column(name = "february")
    private Boolean february = false;

    @Column(name = "march")
    private Boolean march = false;

    @Column(name = "april")
    private Boolean april = false;

    @Column(name = "may")
    private Boolean may = false;

    @Column(name = "june")
    private Boolean june = false;

    @Column(name = "july")
    private Boolean july = false;

    @Column(name = "august")
    private Boolean august = false;

    @Column(name = "september")
    private Boolean september = false;

    @Column(name = "october")
    private Boolean october = false;

    @Column(name = "november")
    private Boolean november = false;

    @Column(name = "december")
    private Boolean december = false;

    @Column(name = "weekly")
    private Boolean weekly = false;

    @Column(name = "week1")
    private Boolean week1 = false;

    @Column(name = "week2")
    private Boolean week2 = false;

    @Column(name = "week3")
    private Boolean week3 = false;

    @Column(name = "week4")
    private Boolean week4 = false;

    @Column(name = "daily")
    private Boolean daily = false;

    @Column(name = "sunday")
    private Boolean sunday = false;

    @Column(name = "monday")
    private Boolean monday = false;

    @Column(name = "tuesday")
    private Boolean tuesday = false;

    @Column(name = "wednesday")
    private Boolean wednesday = false;

    @Column(name = "thursday")
    private Boolean thursday = false;

    @Column(name = "friday")
    private Boolean friday = false;

    @Column(name = "saturday")
    private Boolean saturday = false;

    @Column(name = "no_of_times_in_month")
    private Integer noOfTimesInMonth = 0;

    @Column(name = "no_of_times_in_week")
    private Integer noOfTimesInWeek = 0;

    @Column(name = "no_of_times_in_day")
    private Integer noOfTimesInDay = 0;

    @OneToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;
}
