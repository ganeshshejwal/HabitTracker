package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitRepeat;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepeatRepository extends JpaRepository<HabitRepeat, Integer> {
    @Query(value = "SELECT h.habit_id FROM habit_repeat h " +
    "WHERE (" +
        // Daily habits condition
        "(:date BETWEEN h.habit_start_date AND h.habit_end_date AND h.daily = TRUE) " +
        "OR (h.habit_start_date IS NULL AND h.habit_end_date IS NULL AND h.daily = TRUE) " +
        "OR (:date >= h.habit_start_date AND h.habit_end_date IS NULL AND h.daily = TRUE) " +
        // Weekly habits condition
        "OR (CASE " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 0 THEN h.sunday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 1 THEN h.monday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 2 THEN h.tuesday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 3 THEN h.wednesday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 4 THEN h.thursday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 5 THEN h.friday " +
        "   WHEN EXTRACT(DOW FROM CAST(:date AS DATE)) = 6 THEN h.saturday " +
        "END = TRUE) " +
        // Monthly habits condition
        "OR (EXTRACT(MONTH FROM CAST(:date AS DATE)) = EXTRACT(MONTH FROM h.habit_start_date) AND h.monthly = TRUE) " +
        // Specific month-based conditions (January to December)
        "OR (h.january = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 1) " +
        "OR (h.february = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 2) " +
        "OR (h.march = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 3) " +
        "OR (h.april = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 4) " +
        "OR (h.may = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 5) " +
        "OR (h.june = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 6) " +
        "OR (h.july = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 7) " +
        "OR (h.august = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 8) " +
        "OR (h.september = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 9) " +
        "OR (h.october = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 10) " +
        "OR (h.november = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 11) " +
        "OR (h.december = TRUE AND EXTRACT(MONTH FROM CAST(:date AS DATE)) = 12) " +
        // Weekly occurrence in specific weeks (1st week, 2nd week, etc.)
        "OR (h.weekly = TRUE OR (" +
        "   (CASE " +
        "       WHEN EXTRACT(DAY FROM CAST(:date AS DATE)) BETWEEN 1 AND 7 THEN h.week1 " +
        "       WHEN EXTRACT(DAY FROM CAST(:date AS DATE)) BETWEEN 8 AND 14 THEN h.week2 " +
        "       WHEN EXTRACT(DAY FROM CAST(:date AS DATE)) BETWEEN 15 AND 21 THEN h.week3 " +
        "       WHEN EXTRACT(DAY FROM CAST(:date AS DATE)) > 21 THEN h.week4 " +
        "   END = TRUE)))" +
    ")", nativeQuery = true)
    List<Integer> findTodaysHabitIds(@Param("date") Date date);
}