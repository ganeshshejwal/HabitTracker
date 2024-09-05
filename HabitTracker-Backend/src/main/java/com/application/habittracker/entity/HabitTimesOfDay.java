package com.application.habittracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "habit_time_of_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitTimesOfDay {

    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "morning")
    private Boolean morning = false;

    @Column(name = "afternoon")
    private Boolean afternoon = false;

    @Column(name = "evening")
    private Boolean evening = false;

    @Column(name = "night")
    private Boolean night = false;

    @OneToOne
    @JoinColumn(name = "habit_id", insertable = false, updatable = false)
    private HabitDetails habitDetails;

}