package com.application.habittracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "habit_time_of_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitTimesOfDay {

    @Id
    @Column(name = "habit_id")
    private Integer habitId;

    @Column(name = "morning", nullable = false)
    private Boolean morning = false;

    @Column(name = "afternoon", nullable = false)
    private Boolean afternoon = false;

    @Column(name = "evening", nullable = false)
    private Boolean evening = false;

    @Column(name = "night", nullable = false)
    private Boolean night = false;

    @OneToOne
    @MapsId
    @JoinColumn(name = "habit_id")
    private HabitDetails habitDetails;

    @OneToMany(mappedBy = "habitTimesOfDay", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HabitDuration> habitDurations;
}