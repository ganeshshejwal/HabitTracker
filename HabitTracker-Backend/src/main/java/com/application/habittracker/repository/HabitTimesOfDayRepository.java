package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitTimesOfDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitTimesOfDayRepository extends JpaRepository<HabitTimesOfDay, Integer> {
}

