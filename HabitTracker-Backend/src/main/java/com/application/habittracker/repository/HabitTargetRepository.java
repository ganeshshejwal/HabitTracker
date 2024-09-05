package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitTarget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitTargetRepository extends JpaRepository<HabitTarget, Integer> {
}

