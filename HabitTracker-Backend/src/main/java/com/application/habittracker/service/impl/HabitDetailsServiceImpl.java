package com.application.habittracker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import com.application.habittracker.entity.HabitDetails;
import com.application.habittracker.repository.HabitDetailsRepository;
import com.application.habittracker.service.HabitDetailsService;

@Service
public class HabitDetailsServiceImpl implements HabitDetailsService{

    @Autowired
    private HabitDetailsRepository habitDetailsRepository;

    public HabitDetails createHabit(HabitDetails habitDetails) {
        return habitDetailsRepository.save(habitDetails);
    }

    public Optional<HabitDetails> getHabitById(Integer habitId) {
        return habitDetailsRepository.findById(habitId);
    }

    public List<HabitDetails> getAllHabits() {
        return habitDetailsRepository.findAll();
    }

    public void updateHabit(Integer habitId, HabitDetails updatedHabitDetails) {
        Optional<HabitDetails> optionalHabit = habitDetailsRepository.findById(habitId);
        
        HabitDetails existingHabit = optionalHabit.get();
        existingHabit.setHabitName(updatedHabitDetails.getHabitName());
        habitDetailsRepository.save(existingHabit);
    
    }

    public void deleteHabit(Integer habitId) {
        habitDetailsRepository.softDeleteById(habitId);
    }
}
