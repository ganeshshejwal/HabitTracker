package com.application.habittracker.mapper;

import java.sql.Date;

import com.application.habittracker.entity.*;
import com.application.habittracker.record.HabitData;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HabitMapper {

    public static HabitDetails toHabitDetails(HabitData habit) {
        HabitDetails details = new HabitDetails();
        details.setHabitName(habit.habitName());
        return details;
    }

    public static HabitRepeat toHabitRepeat(HabitData habit) {
        HabitRepeat repeat = new HabitRepeat();

        repeat.setHabitStartDate(habit.startDate() != null ? Date.valueOf(habit.startDate()) : null);
        repeat.setHabitEndDate(habit.endDate() != null ? Date.valueOf(habit.endDate()) : null);

        setMonthlyFlags(habit, repeat);
        setWeeklyFlags(habit, repeat);
        setDailyFlags(habit, repeat);

        log.info("Repeat Options = {}", habit.repeatOptions());
        repeat.setNoOfTimesInMonth(parseOrDefault(habit.repeatOptions().customMonths()));
        repeat.setNoOfTimesInWeek(parseOrDefault(habit.repeatOptions().customWeeks()));
        repeat.setNoOfTimesInDay(parseOrDefault(habit.repeatOptions().customDays()));

        return repeat;
    }

    private static void setMonthlyFlags(HabitData habit, HabitRepeat repeat) {
        repeat.setMonthly(habit.repeatOptions().months().contains("Monthly"));
        repeat.setJanuary(habit.repeatOptions().months().contains("January"));
        repeat.setFebruary(habit.repeatOptions().months().contains("February"));
        repeat.setMarch(habit.repeatOptions().months().contains("March"));
        repeat.setApril(habit.repeatOptions().months().contains("April"));
        repeat.setMay(habit.repeatOptions().months().contains("May"));
        repeat.setJune(habit.repeatOptions().months().contains("June"));
        repeat.setJuly(habit.repeatOptions().months().contains("July"));
        repeat.setAugust(habit.repeatOptions().months().contains("August"));
        repeat.setSeptember(habit.repeatOptions().months().contains("September"));
        repeat.setOctober(habit.repeatOptions().months().contains("October"));
        repeat.setNovember(habit.repeatOptions().months().contains("November"));
        repeat.setDecember(habit.repeatOptions().months().contains("December"));
    }

    private static void setWeeklyFlags(HabitData habit, HabitRepeat repeat) {
        repeat.setWeekly(habit.repeatOptions().weeks().contains("Weekly"));
        repeat.setWeek1(habit.repeatOptions().weeks().contains("Week 1"));
        repeat.setWeek2(habit.repeatOptions().weeks().contains("Week 2"));
        repeat.setWeek3(habit.repeatOptions().weeks().contains("Week 3"));
        repeat.setWeek4(habit.repeatOptions().weeks().contains("Week 4"));
        repeat.setWeek1(habit.repeatOptions().weeks().contains("1"));
        repeat.setWeek2(habit.repeatOptions().weeks().contains("2"));
        repeat.setWeek3(habit.repeatOptions().weeks().contains("3"));
        repeat.setWeek4(habit.repeatOptions().weeks().contains("4"));
    }

    private static void setDailyFlags(HabitData habit, HabitRepeat repeat) {
        repeat.setDaily(habit.repeatOptions().days().contains("Daily"));
        repeat.setSunday(habit.repeatOptions().days().contains("Sunday"));
        repeat.setMonday(habit.repeatOptions().days().contains("Monday"));
        repeat.setTuesday(habit.repeatOptions().days().contains("Tuesday"));
        repeat.setWednesday(habit.repeatOptions().days().contains("Wednesday"));
        repeat.setThursday(habit.repeatOptions().days().contains("Thursday"));
        repeat.setFriday(habit.repeatOptions().days().contains("Friday"));
        repeat.setSaturday(habit.repeatOptions().days().contains("Saturday"));
    }

    public static HabitTarget toHabitTarget(HabitData habit) {
        HabitTarget target = new HabitTarget();
        String timeSpent = habit.target().timeSpent() != null
                ? habit.target().timeSpent().hours() + ":" + habit.target().timeSpent().minutes()
                : null;
        String selectTime = habit.target().selectTime();
        
        target.setTimeSpent(timeSpent);
        target.setSelectTime(selectTime);
        target.setTargetMeasure(parseOrDefault(habit.target().number().measure()));
        target.setTargetMeasureDescription(habit.target().number().description());
        return target;
    }

    public static HabitTimesOfDay toHabitTimesOfDay(HabitData habit) {
        HabitTimesOfDay timesOfDay = new HabitTimesOfDay();
        timesOfDay.setMorning(habit.timeOfDay().contains("Morning"));
        timesOfDay.setAfternoon(habit.timeOfDay().contains("Afternoon"));
        timesOfDay.setEvening(habit.timeOfDay().contains("Evening"));
        timesOfDay.setNight(habit.timeOfDay().contains("Night"));
        return timesOfDay;
    }

    private static int parseOrDefault(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
