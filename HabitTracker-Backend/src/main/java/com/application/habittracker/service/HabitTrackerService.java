package com.application.habittracker.service;

import com.application.habittracker.record.HabitData;
import com.application.habittracker.record.HabitLogRecord;

import java.util.*;

public interface HabitTrackerService {
    
    HabitData createHabit(HabitData habit);

    List<HabitData> getAllHabits();

    Optional<HabitData> getHabitById(Integer habitId);
    
    List<HabitData> getHabitsByName(String habitName);

    List<HabitData> getAllHabitsOfToday();

    HabitData updateHabit(Integer habitId, HabitData habit);
    
    void deleteHabit(Integer habitId);

    void saveHabitLog(HabitLogRecord habitLog);
}
