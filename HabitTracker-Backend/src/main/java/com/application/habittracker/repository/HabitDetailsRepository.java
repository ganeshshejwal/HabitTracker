package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitDetails;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitDetailsRepository extends JpaRepository<HabitDetails, Integer> {
    
    @Modifying
    @Transactional
    @Query("UPDATE HabitDetails h SET h.isDeleted = true WHERE h.habitId = :habitId")
    void softDeleteById(@Param("habitId") Integer habitId);

    @Query("SELECT h FROM HabitDetails h WHERE LOWER(h.habitName) LIKE LOWER(CONCAT( :habitName, '%'))")
    List<HabitDetails> findByHabitName(@Param("habitName") String habitName);

}
