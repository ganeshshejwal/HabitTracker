package com.application.habittracker.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import lombok.*;

@Entity
@Table(name = "habit_duration")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitDuration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "time_of_day")
    @Enumerated(EnumType.STRING)
    private TimeOfDay timeOfDay;

    @ManyToOne
    @JoinColumn(name = "habit_id")
    private HabitTimesOfDay habitTimesOfDay;
}

enum TimeOfDay {
    MORNING, AFTERNOON, EVENING, NIGHT
}