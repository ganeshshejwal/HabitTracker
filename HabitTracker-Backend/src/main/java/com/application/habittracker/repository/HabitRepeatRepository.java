package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitRepeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepeatRepository extends JpaRepository<HabitRepeat, Integer> {
}

