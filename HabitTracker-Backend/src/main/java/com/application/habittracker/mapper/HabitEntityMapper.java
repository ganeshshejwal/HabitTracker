package com.application.habittracker.mapper;

import java.util.ArrayList;
import java.util.List;

import com.application.habittracker.entity.*;
import com.application.habittracker.record.*;
import com.application.habittracker.record.Number;

public class HabitEntityMapper {

    public static HabitData toHabit(HabitDetails habitDetails, HabitRepeat habitRepeat, HabitTarget habitTarget,
            HabitTimesOfDay habitTimesOfDay) {
        return new HabitData(
                habitDetails.getHabitId(),
                habitDetails.getHabitName(),
                habitRepeat.getHabitStartDate() != null ? habitRepeat.getHabitStartDate().toLocalDate() : null,
                habitRepeat.getHabitEndDate() != null ? habitRepeat.getHabitEndDate().toLocalDate() : null,
                mapRepeatOptions(habitRepeat),
                mapTimeOfDay(habitTimesOfDay),
                mapTarget(habitTarget),
                habitDetails.getIsDeleted());
    }

    private static RepeatOptions mapRepeatOptions(HabitRepeat habitRepeat) {
        return new RepeatOptions(
                mapMonths(habitRepeat),
                mapWeeks(habitRepeat),
                mapDays(habitRepeat),
                habitRepeat.getNoOfTimesInMonth().toString(),
                habitRepeat.getNoOfTimesInWeek().toString(),
                habitRepeat.getNoOfTimesInDay().toString());
    }

    private static List<String> mapMonths(HabitRepeat habitRepeat) {
        List<String> months = new ArrayList<>();
        if (Boolean.TRUE.equals(habitRepeat.getMonthly()))
            months.add("Monthly");
        if (Boolean.TRUE.equals(habitRepeat.getJanuary()))
            months.add("January");
        if (Boolean.TRUE.equals(habitRepeat.getFebruary()))
            months.add("February");
        if (Boolean.TRUE.equals(habitRepeat.getMarch()))
            months.add("March");
        if (Boolean.TRUE.equals(habitRepeat.getApril()))
            months.add("April");
        if (Boolean.TRUE.equals(habitRepeat.getMay()))
            months.add("May");
        if (Boolean.TRUE.equals(habitRepeat.getJune()))
            months.add("June");
        if (Boolean.TRUE.equals(habitRepeat.getJuly()))
            months.add("July");
        if (Boolean.TRUE.equals(habitRepeat.getAugust()))
            months.add("August");
        if (Boolean.TRUE.equals(habitRepeat.getSeptember()))
            months.add("September");
        if (Boolean.TRUE.equals(habitRepeat.getOctober()))
            months.add("October");
        if (Boolean.TRUE.equals(habitRepeat.getNovember()))
            months.add("November");
        if (Boolean.TRUE.equals(habitRepeat.getDecember()))
            months.add("December");
        return months;
    }

    private static List<String> mapWeeks(HabitRepeat habitRepeat) {
        List<String> weeks = new ArrayList<>();
        if (Boolean.TRUE.equals(habitRepeat.getWeekly()))
            weeks.add("Weekly");
        if (Boolean.TRUE.equals(habitRepeat.getWeek1()))
            weeks.add("1");
        if (Boolean.TRUE.equals(habitRepeat.getWeek2()))
            weeks.add("2");
        if (Boolean.TRUE.equals(habitRepeat.getWeek3()))
            weeks.add("3");
        if (Boolean.TRUE.equals(habitRepeat.getWeek4()))
            weeks.add("4");
        return weeks;
    }

    private static List<String> mapDays(HabitRepeat habitRepeat) {
        List<String> days = new ArrayList<>();
        if (Boolean.TRUE.equals(habitRepeat.getDaily()))
            days.add("Daily");
        if (Boolean.TRUE.equals(habitRepeat.getSunday()))
            days.add("Sunday");
        if (Boolean.TRUE.equals(habitRepeat.getMonday()))
            days.add("Monday");
        if (Boolean.TRUE.equals(habitRepeat.getTuesday()))
            days.add("Tuesday");
        if (Boolean.TRUE.equals(habitRepeat.getWednesday()))
            days.add("Wednesday");
        if (Boolean.TRUE.equals(habitRepeat.getThursday()))
            days.add("Thursday");
        if (Boolean.TRUE.equals(habitRepeat.getFriday()))
            days.add("Friday");
        if (Boolean.TRUE.equals(habitRepeat.getSaturday()))
            days.add("Saturday");
        return days;
    }

    private static List<String> mapTimeOfDay(HabitTimesOfDay habitTimesOfDay) {
        List<String> timesOfDay = new ArrayList<>();
        if (Boolean.TRUE.equals(habitTimesOfDay.getMorning()))
            timesOfDay.add("Morning");
        if (Boolean.TRUE.equals(habitTimesOfDay.getAfternoon()))
            timesOfDay.add("Afternoon");
        if (Boolean.TRUE.equals(habitTimesOfDay.getEvening()))
            timesOfDay.add("Evening");
        if (Boolean.TRUE.equals(habitTimesOfDay.getNight()))
            timesOfDay.add("Night");
        return timesOfDay;
    }

    private static Target mapTarget(HabitTarget habitTarget) {
        String timeSpent = habitTarget.getTimeSpent();
        String selectTime = habitTarget.getSelectTime();

        String targetTime = (timeSpent != null && !timeSpent.isEmpty())
        ? timeSpent
        : (selectTime != null && !selectTime.isEmpty())
        ? selectTime
        : "00:00";

        String[] timeParts = targetTime.split(":");
        String hours = timeParts.length > 0 ? timeParts[0] : "00";
        String minutes = timeParts.length > 1 ? timeParts[1] : "00";
    
        TimeSpent timeSpentObj = new TimeSpent(hours, minutes);
        Number numberObj = new Number(
            habitTarget.getTargetMeasure() != null ? habitTarget.getTargetMeasure().toString() : "0",
            habitTarget.getTargetMeasureDescription()
        );
    
        return new Target(
            timeSpentObj,  
            selectTime,
            numberObj
        );
    }
}
