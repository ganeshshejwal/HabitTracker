package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitTimesOfDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitTimesOfDayRepository extends JpaRepository<HabitTimesOfDay, Integer> {
}

