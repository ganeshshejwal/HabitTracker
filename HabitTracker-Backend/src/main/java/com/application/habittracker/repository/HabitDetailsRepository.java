package com.application.habittracker.repository;

import com.application.habittracker.entity.HabitDetails;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HabitDetailsRepository extends JpaRepository<HabitDetails, Integer> {
    
    @Modifying
    @Query("UPDATE HabitDetails h SET h.isDeleted = true WHERE h.habitId = :habitId")
    void softDeleteByName(@Param("habitId") Integer habitId);

    @Query("SELECT h FROM HabitDetails h WHERE LOWER(h.habitName) LIKE LOWER(CONCAT( :habitName, '%'))")
    List<HabitDetails> findByHabitName(@Param("habitName") String habitName);

}
