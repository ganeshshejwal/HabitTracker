package com.application.habittracker.service;

import com.application.habittracker.entity.HabitDetails;
import java.util.*;

public interface HabitDetailsService {
    
    HabitDetails createHabit(HabitDetails habitDetails);

    Optional<HabitDetails> getHabitById(Integer habitId);

    List<HabitDetails> getAllHabits();

    void updateHabit(Integer habitId, HabitDetails updatedHabitDetails);
    
    void deleteHabit(Integer habitId);
}
