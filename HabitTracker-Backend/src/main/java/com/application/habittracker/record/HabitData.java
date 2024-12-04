package com.application.habittracker.record;

import java.time.LocalDate;
import java.util.List;

public record HabitData(
    Integer habitId,
    String habitName,
    LocalDate startDate,
    LocalDate endDate,
    RepeatOptions repeatOptions,
    List<String> timeOfDay,
    Target target,
    Boolean isDeleted
) {}

