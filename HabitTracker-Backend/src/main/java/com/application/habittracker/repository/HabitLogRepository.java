package com.application.habittracker.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.application.habittracker.entity.HabitLog;
import com.application.habittracker.record.HabitDisplayReport;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, Integer> {
    @Query("SELECT h.logDate, COUNT(h) FROM HabitLog h GROUP BY h.logDate")
    List<Object[]> habitLogsByDate();

    @Query(value = "SELECT log_date, ARRAY_AGG(DISTINCT habit_id) as habit_ids " +
            "FROM habit_log " +
            "GROUP BY log_date " +
            "ORDER BY log_date", nativeQuery = true)
    List<Object[]> getHabitLogsSummary();

    @Query("SELECT new com.application.habittracker.record.HabitDisplayReport(h.logDate, h.targetName, h.targetMeasure) " +
           "FROM HabitLog h " +
           "WHERE h.habitId = :id " +
           "AND h.logDate BETWEEN :sDate AND :eDate")
    List<HabitDisplayReport> findHabitReport(@Param("id") Integer id, 
                                             @Param("sDate") Date sDate, 
                                             @Param("eDate") Date eDate);

        Optional<HabitLog> findByHabitIdAndLogDate(Integer habitId, LocalDate logDate);
}
