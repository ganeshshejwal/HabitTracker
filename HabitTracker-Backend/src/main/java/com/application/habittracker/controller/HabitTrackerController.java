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
import com.application.habittracker.record.HabitData;
import com.application.habittracker.record.HabitLogRecord;
import com.application.habittracker.service.HabitTrackerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/habit-tracker/habit-details")
public class HabitTrackerController {
    
    @Autowired
    private HabitTrackerService habitTrackerService;

    @PostMapping
    public ResponseEntity<HabitData> createHabit(@RequestBody HabitData habit) {
        HabitData createdHabit = habitTrackerService.createHabit(habit);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHabit);
    }

    @GetMapping
    public ResponseEntity<List<HabitData>> getAllHabits() {
        List<HabitData> habits = habitTrackerService.getAllHabits();
        return ResponseEntity.status(HttpStatus.FOUND).body(habits);
    }

    @GetMapping("/{habitId}")
    public ResponseEntity<HabitData> getHabitById(@PathVariable Integer habitId) {    
        Optional<HabitData> habitData = habitTrackerService.getHabitById(habitId);
        return ResponseEntity.status(HttpStatus.FOUND).body(habitData.get());
    }
   
    @GetMapping("/habit-data/{habitName}")
    public ResponseEntity<List<HabitData>> getHabitsByName(@PathVariable String habitName) {
        List<HabitData> habitDataList = habitTrackerService.getHabitsByName(habitName);
        return ResponseEntity.status(HttpStatus.FOUND).body(habitDataList);
    }

    @GetMapping("/habit-data-today")
    public ResponseEntity<List<HabitData>> getAllHabitsOfToday() {
        List<HabitData> habits = habitTrackerService.getAllHabitsOfToday();
        return ResponseEntity.status(HttpStatus.FOUND).body(habits);
    }

    @PutMapping("/{habitId}")
    public ResponseEntity<HabitData> updateHabit(@PathVariable Integer habitId, @RequestBody HabitData habit) {    
        HabitData habitData = habitTrackerService.updateHabit(habitId, habit);
        return ResponseEntity.status(HttpStatus.OK).body(habitData);
    }
    
    @DeleteMapping("/{habitId}")
    public ResponseEntity<String> deleteHabit(@PathVariable Integer habitId) {
        habitTrackerService.deleteHabit(habitId);
        return ResponseEntity.status(HttpStatus.OK).body("HabitData Deleted Successfully");
    }

    @PostMapping("/habit-log")
    public ResponseEntity<String> saveHabitLog(@RequestBody HabitLogRecord habitLog) {
        habitTrackerService.saveHabitLog(habitLog);
        return ResponseEntity.status(HttpStatus.OK).body("HabitLog Saved Successfully");
    }
}
