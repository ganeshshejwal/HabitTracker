package com.application.habittracker.service.impl;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.habittracker.entity.HabitDetails;
import com.application.habittracker.entity.HabitRepeat;
import com.application.habittracker.entity.HabitTarget;
import com.application.habittracker.entity.HabitTimesOfDay;
import com.application.habittracker.mapper.HabitEntityMapper;
import com.application.habittracker.mapper.HabitMapper;
import com.application.habittracker.record.HabitData;
import com.application.habittracker.repository.HabitDetailsRepository;
import com.application.habittracker.repository.HabitRepeatRepository;
import com.application.habittracker.repository.HabitTargetRepository;
import com.application.habittracker.repository.HabitTimesOfDayRepository;
import com.application.habittracker.service.HabitTrackerService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class HabitTrackerServiceImpl implements HabitTrackerService {

    @Autowired
    private HabitDetailsRepository habitDetailsRepository;

    @Autowired
    private HabitRepeatRepository habitRepeatRepository;

    @Autowired
    private HabitTargetRepository habitTargetRepository;

    @Autowired
    private HabitTimesOfDayRepository habitTimesOfDayRepository;

    @Transactional
    public HabitData createHabit(HabitData habit) {
        HabitDetails habitDetails = HabitMapper.toHabitDetails(habit);
        HabitRepeat habitRepeat = HabitMapper.toHabitRepeat(habit);
        HabitTarget habitTarget = HabitMapper.toHabitTarget(habit);
        HabitTimesOfDay habitTimesOfDay = HabitMapper.toHabitTimesOfDay(habit);

        habitDetails = habitDetailsRepository.save(habitDetails);

        habitRepeat.setHabitId(habitDetails.getHabitId());
        habitTarget.setHabitId(habitDetails.getHabitId());
        habitTimesOfDay.setHabitId(habitDetails.getHabitId());

        habitRepeatRepository.save(habitRepeat);
        habitTargetRepository.save(habitTarget);
        habitTimesOfDayRepository.save(habitTimesOfDay);

        return habit;
    }

    public List<HabitData> getAllHabits() {
        List<HabitDetails> habitDetailsList = habitDetailsRepository.findAll();

        return habitDetailsList.stream().map(habitDetails -> {
            HabitRepeat habitRepeat = habitRepeatRepository.findById(habitDetails.getHabitId()).orElse(new HabitRepeat());
            HabitTarget habitTarget = habitTargetRepository.findById(habitDetails.getHabitId()).orElse(new HabitTarget());
            HabitTimesOfDay habitTimesOfDay = habitTimesOfDayRepository.findById(habitDetails.getHabitId()).orElse(new HabitTimesOfDay());

            return HabitEntityMapper.toHabit(habitDetails, habitRepeat, habitTarget, habitTimesOfDay);
        }).collect(Collectors.toList());
    }

    
    public Optional<HabitData> getHabitById(Integer habitId) {
        return habitDetailsRepository.findById(habitId).map(habitDetails -> {
            HabitRepeat habitRepeat = habitRepeatRepository.findById(habitId).orElse(new HabitRepeat());
            HabitTarget habitTarget = habitTargetRepository.findById(habitId).orElse(new HabitTarget());
            HabitTimesOfDay habitTimesOfDay = habitTimesOfDayRepository.findById(habitId).orElse(new HabitTimesOfDay());
    
            return HabitEntityMapper.toHabit(habitDetails, habitRepeat, habitTarget, habitTimesOfDay);
        });
    }
    

    public List<HabitData> getHabitsByName(String habitName) {
        List<HabitDetails> habitDetailsList = habitDetailsRepository.findByHabitName(habitName);

        List<Integer> habitIds = habitDetailsList.stream()
        .map(HabitDetails::getHabitId)  
        .collect(Collectors.toList());
        
        List<HabitData> habitDataList = new ArrayList<>();
        for(int i = 0 ; i< habitIds.size() ; i++) {
            HabitRepeat habitRepeat = habitRepeatRepository.findById(habitIds.get(i)).orElse(new HabitRepeat());
            HabitTarget habitTarget = habitTargetRepository.findById(habitIds.get(i)).orElse(new HabitTarget());
            HabitTimesOfDay habitTimesOfDay = habitTimesOfDayRepository.findById(habitIds.get(i)).orElse(new HabitTimesOfDay());

            HabitData  habitData = HabitEntityMapper.toHabit(habitDetailsList.get(i), habitRepeat, habitTarget, habitTimesOfDay);
            habitDataList.add(habitData);
        }

        log.info("Habits Details : {}" , habitDataList);
        return habitDataList;
    }

    public void deleteHabit(Integer habitId) {
        habitDetailsRepository.softDeleteByName(habitId);  
    }
     
}
