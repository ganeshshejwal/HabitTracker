package com.application.habittracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.application.habittracker.entity.HabitDetails;
import com.application.habittracker.service.HabitDetailsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/habit-tracker/habit-details")
public class HabitDetailsController {
    
    @Autowired
    private HabitDetailsService habitDetailsService;

    @PostMapping
    public ResponseEntity<HabitDetails> createHabit(@RequestBody HabitDetails habitDetails) {
        HabitDetails createdHabit = habitDetailsService.createHabit(habitDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHabit);
    }

    @GetMapping("/{habitId}")
    public ResponseEntity<HabitDetails> getHabitById(@PathVariable Integer habitId) {
        Optional<HabitDetails> habit = habitDetailsService.getHabitById(habitId);
        return ResponseEntity.status(HttpStatus.FOUND).body(habit.get());
    }

    @GetMapping
    public ResponseEntity<List<HabitDetails>> getAllHabits() {
        List<HabitDetails> habits = habitDetailsService.getAllHabits();
        return ResponseEntity.status(HttpStatus.FOUND).body(habits);
    }

    @PutMapping("/{habitId}")
    public ResponseEntity<String> updateHabit(@PathVariable Integer habitId, @RequestBody HabitDetails updatedHabitDetails) {
        habitDetailsService.updateHabit(habitId, updatedHabitDetails);
        return ResponseEntity.status(HttpStatus.OK).body("Habit Updated Successfully");
    }

    @DeleteMapping("/{habitId}")
    public ResponseEntity<String> deleteHabit(@PathVariable Integer habitId) {
        habitDetailsService.deleteHabit(habitId);
        return ResponseEntity.status(HttpStatus.OK).body("Habit Deleted Successfully");
    }
}
