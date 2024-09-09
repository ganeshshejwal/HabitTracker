package com.application.habittracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.habittracker.entity.HabitLog;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, Integer> {
    
}
