package com.application.habittracker.record;
import java.time.LocalDate;

public record HabitReport (
    String habitName,
    LocalDate startDate,
    LocalDate endDate
) {}