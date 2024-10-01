package com.application.habittracker.service.impl;

import java.util.List;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.habittracker.entity.HabitDetails;
import com.application.habittracker.entity.HabitLog;
import com.application.habittracker.entity.HabitRepeat;
import com.application.habittracker.entity.HabitTarget;
import com.application.habittracker.entity.HabitTimesOfDay;
import com.application.habittracker.mapper.HabitEntityMapper;
import com.application.habittracker.mapper.HabitLogMapper;
import com.application.habittracker.mapper.HabitMapper;
import com.application.habittracker.record.HabitData;
import com.application.habittracker.record.HabitDisplayReport;
import com.application.habittracker.record.HabitLogRecord;
import com.application.habittracker.record.HabitReport;
import com.application.habittracker.repository.HabitDetailsRepository;
import com.application.habittracker.repository.HabitLogRepository;
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

    @Autowired
    private HabitLogRepository habitLogRepository;

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
            HabitRepeat habitRepeat = habitRepeatRepository.findById(habitDetails.getHabitId())
                    .orElse(new HabitRepeat());
            HabitTarget habitTarget = habitTargetRepository.findById(habitDetails.getHabitId())
                    .orElse(new HabitTarget());
            HabitTimesOfDay habitTimesOfDay = habitTimesOfDayRepository.findById(habitDetails.getHabitId())
                    .orElse(new HabitTimesOfDay());

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
        for (int i = 0; i < habitIds.size(); i++) {
            HabitRepeat habitRepeat = habitRepeatRepository.findById(habitIds.get(i)).orElse(new HabitRepeat());
            HabitTarget habitTarget = habitTargetRepository.findById(habitIds.get(i)).orElse(new HabitTarget());
            HabitTimesOfDay habitTimesOfDay = habitTimesOfDayRepository.findById(habitIds.get(i))
                    .orElse(new HabitTimesOfDay());

            HabitData habitData = HabitEntityMapper.toHabit(habitDetailsList.get(i), habitRepeat, habitTarget,
                    habitTimesOfDay);
            habitDataList.add(habitData);
        }

        return habitDataList;
    }

    public List<HabitData> getAllHabitsOfToday(LocalDate date) {
        Date sqlDate = Date.valueOf(date);
        List<Integer> habitDetailsList = habitRepeatRepository.findTodaysHabitIds(sqlDate);

        List<HabitData> habitDataList2 = new ArrayList<>();

        for (Integer i : habitDetailsList) {
            Optional<HabitData> optionalHabitData = getHabitById(i);
            if (optionalHabitData.isPresent()) {
                HabitData habitData = optionalHabitData.get();
                if (!habitData.isDeleted()) {
                    habitDataList2.add(habitData);
                }
            }
        }

        // Define the order of time periods
        List<String> timePeriodOrder = Arrays.asList("Morning", "Afternoon", "Evening", "Night");

        // Custom Comparator
        Comparator<HabitData> habitComparator = (h1, h2) -> {
            List<String> times1 = h1.timeOfDay();
            List<String> times2 = h2.timeOfDay();

            // If both habits have no time of day, consider them equal
            if (times1.isEmpty() && times2.isEmpty()) {
                return 0;
            }

            // If one habit has no time of day, it comes after the other
            if (times1.isEmpty())
                return 1;
            if (times2.isEmpty())
                return -1;

            // Compare the earliest time of day for each habit
            String earliestTime1 = getEarliestTime(times1, timePeriodOrder);
            String earliestTime2 = getEarliestTime(times2, timePeriodOrder);

            int index1 = timePeriodOrder.indexOf(earliestTime1);
            int index2 = timePeriodOrder.indexOf(earliestTime2);

            // If both times are not in the list, compare them lexicographically
            if (index1 == -1 && index2 == -1) {
                return earliestTime1.compareTo(earliestTime2);
            }

            // If one time is not in the list, put it at the end
            if (index1 == -1)
                return 1;
            if (index2 == -1)
                return -1;

            // Compare based on the order in timePeriodOrder
            return Integer.compare(index1, index2);
        };

        // Sort the list
        habitDataList2.sort(habitComparator);

        return habitDataList2;
    }

    private String getEarliestTime(List<String> times, List<String> timePeriodOrder) {
        return times.stream()
                .min(Comparator.comparingInt(time -> {
                    int index = timePeriodOrder.indexOf(time);
                    return index == -1 ? Integer.MAX_VALUE : index;
                }))
                .orElse("");
    }

    public HabitData updateHabit(Integer habitId, HabitData habit) {
        HabitDetails habitDetails = HabitMapper.toHabitDetails(habit);
        habitDetails.setHabitId(habitId);
        HabitRepeat habitRepeat = HabitMapper.toHabitRepeat(habit);
        habitRepeat.setHabitId(habitId);
        HabitTarget habitTarget = HabitMapper.toHabitTarget(habit);
        habitTarget.setHabitId(habitId);
        HabitTimesOfDay habitTimesOfDay = HabitMapper.toHabitTimesOfDay(habit);
        habitTimesOfDay.setHabitId(habitId);
        
        habitDetailsRepository.save(habitDetails);
        habitRepeatRepository.save(habitRepeat);
        habitTargetRepository.save(habitTarget);
        habitTimesOfDayRepository.save(habitTimesOfDay);

        Optional<HabitData> updatedHabitData = getHabitById(habitId);
        return updatedHabitData.get();
    }

    public void deleteHabit(Integer habitId) {
        habitDetailsRepository.softDeleteById(habitId);
    }

    public void saveHabitLog(HabitLogRecord habitLog) {
        Optional<HabitLog> existingLog = habitLogRepository.findByHabitIdAndLogDate(
            habitLog.habitId(), 
            habitLog.logDate()
        );
    
        if (existingLog.isPresent()) {
            HabitLog logToUpdate = existingLog.get();
            logToUpdate.setTargetName(habitLog.targetName());
            logToUpdate.setTargetMeasure(habitLog.targetMeasure());
            habitLogRepository.save(logToUpdate);
        } else {
            HabitLog newHabitLog = HabitLogMapper.toEntity(habitLog);
            habitLogRepository.save(newHabitLog);
        }
    }

    public List<Object[]> habitLogByDate() {
        return habitLogRepository.habitLogsByDate();
    }

    public List<Object[]> getHabitLogsSummary() {
        return habitLogRepository.getHabitLogsSummary();
       
    }

    public List<List<HabitDisplayReport>> getHabitReport(HabitReport habitReport) {
        List<HabitDetails> habitDetailsList = habitDetailsRepository.findByHabitName(habitReport.habitName());

        List<Integer> habitIds = habitDetailsList.stream().map(HabitDetails::getHabitId).collect(Collectors.toList());
        
        List<List<HabitDisplayReport>> habitDisplayReports = new ArrayList<>();

        for(Integer ids : habitIds) {
            Date sDate = Date.valueOf(habitReport.startDate());
            Date eDate = Date.valueOf(habitReport.endDate());
            List<HabitDisplayReport> habitDisplayReport = habitLogRepository.findHabitReport(ids, sDate, eDate);
            habitDisplayReport.sort(Comparator.comparing(HabitDisplayReport::getLogDate));
            habitDisplayReports.add(habitDisplayReport);
        }

        return habitDisplayReports;
    }
}
