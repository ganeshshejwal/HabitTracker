package com.application.habittracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.application.habittracker.entity.HabitDetails;

import jakarta.transaction.Transactional;

@Repository
public interface HabitDetailsRepository extends JpaRepository<HabitDetails, Integer> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE habit_details SET is_deleted = true WHERE habit_id = :habitId", nativeQuery = true)
    void softDeleteById(Integer habitId);
}
