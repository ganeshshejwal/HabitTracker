package com.application.habittracker.service;

import com.application.habittracker.record.HabitData;
import java.util.*;

public interface HabitTrackerService {
    
    HabitData createHabit(HabitData habit);

    List<HabitData> getAllHabits();

    Optional<HabitData> getHabitById(Integer habitId);
    
    List<HabitData> getHabitsByName(String habitName);
    
    void deleteHabit(Integer habitId);
}
