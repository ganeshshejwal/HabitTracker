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

import java.time.LocalDate;
import java.util.*;
import com.application.habittracker.record.HabitData;
import com.application.habittracker.record.HabitDisplayReport;
import com.application.habittracker.record.HabitLogRecord;
import com.application.habittracker.record.HabitReport;
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
    public ResponseEntity<HabitData> getHabitById(@PathVariable("habitId") Integer habitId) {    
        Optional<HabitData> habitData = habitTrackerService.getHabitById(habitId);
        return ResponseEntity.status(HttpStatus.FOUND).body(habitData.get());
    }
   
    @GetMapping("/habit-data/{habitName}")
    public ResponseEntity<List<HabitData>> getHabitsByName(@PathVariable("habitName") String habitName) {
        List<HabitData> habitDataList = habitTrackerService.getHabitsByName(habitName);
        return ResponseEntity.status(HttpStatus.FOUND).body(habitDataList);
    }

    @GetMapping("/habit-data-today/{date}")
    public ResponseEntity<List<HabitData>> getAllHabitsOfToday(@PathVariable("date") LocalDate date) {
        List<HabitData> habits = habitTrackerService.getAllHabitsOfToday(date);
        return ResponseEntity.status(HttpStatus.FOUND).body(habits);
    }

    @PutMapping("/{habitId}")
    public ResponseEntity<HabitData> updateHabit(@PathVariable("habitId") Integer habitId, @RequestBody HabitData habit) {    
        HabitData habitData = habitTrackerService.updateHabit(habitId, habit);
        return ResponseEntity.status(HttpStatus.OK).body(habitData);
    }
    
    @DeleteMapping("/{habitId}")
    public ResponseEntity<String> deleteHabit(@PathVariable("habitId") Integer habitId) {
        habitTrackerService.deleteHabit(habitId);
        return ResponseEntity.status(HttpStatus.OK).body("HabitData Deleted Successfully");
    }

    @PostMapping("/habit-log")
    public ResponseEntity<String> saveHabitLog(@RequestBody HabitLogRecord habitLog) {
        habitTrackerService.saveHabitLog(habitLog);
        return ResponseEntity.status(HttpStatus.OK).body("HabitLog Saved Successfully");
    }

    @GetMapping("/habit-log")
    public ResponseEntity<List<Object[]>> habitLogByDate() {
        List<Object[]> habitLogsList = habitTrackerService.habitLogByDate();
        return ResponseEntity.status(HttpStatus.OK).body(habitLogsList);
    }

    @GetMapping("/summary")
    public ResponseEntity<List<Object[]>> getHabitLogsSummary() {
        List<Object[]> summary = habitTrackerService.getHabitLogsSummary();
        return ResponseEntity.status(HttpStatus.OK).body(summary);
    }

    @PostMapping("/statistics")
    public ResponseEntity<List<List<HabitDisplayReport>>> getHabitReport(@RequestBody HabitReport habitReport) {
        List<List<HabitDisplayReport>> statistics = habitTrackerService.getHabitReport(habitReport);
        return ResponseEntity.ok(statistics);
    }
    
}
