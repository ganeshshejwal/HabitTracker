package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitRepeat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepeatRepository extends JpaRepository<HabitRepeat, Integer> {
    @Query(value = "SELECT h.habit_id FROM habit_repeat h " +
    "WHERE h.daily = TRUE " +
    "OR (CURRENT_DATE BETWEEN h.habit_start_date AND h.habit_end_date) " +
    "OR (CASE " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Sunday' THEN h.sunday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Monday' THEN h.monday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Tuesday' THEN h.tuesday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Wednesday' THEN h.wednesday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Thursday' THEN h.thursday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Friday' THEN h.friday " +
    "       WHEN TO_CHAR(CURRENT_DATE, 'Day') = 'Saturday' THEN h.saturday " +
    "   END = TRUE)", nativeQuery = true)
    List<Integer> findTodaysHabitIds();
}