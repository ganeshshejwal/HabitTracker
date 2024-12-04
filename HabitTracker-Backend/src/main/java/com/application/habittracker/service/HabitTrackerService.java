package com.application.habittracker.service;

import com.application.habittracker.record.HabitData;
import com.application.habittracker.record.HabitDisplayReport;
import com.application.habittracker.record.HabitLogRecord;
import com.application.habittracker.record.HabitReport;

import java.time.LocalDate;
import java.util.*;

public interface HabitTrackerService {
    
    HabitData createHabit(HabitData habit);

    List<HabitData> getAllHabits();

    Optional<HabitData> getHabitById(Integer habitId);
    
    List<HabitData> getHabitsByName(String habitName);

    List<HabitData> getAllHabitsOfToday(LocalDate date);

    HabitData updateHabit(Integer habitId, HabitData habit);
    
    void deleteHabit(Integer habitId);

    void saveHabitLog(HabitLogRecord habitLog);

    List<Object[]> habitLogByDate();

    List<Object[]> getHabitLogsSummary();

    List<List<HabitDisplayReport>> getHabitReport(HabitReport habitReport);
    
}
