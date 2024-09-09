package com.application.habittracker.mapper;

import java.sql.Date;
import java.time.LocalDate;

import com.application.habittracker.entity.HabitLog;
import com.application.habittracker.record.HabitLogRecord;

public class HabitLogMapper {

    public static HabitLog toEntity(HabitLogRecord habitLogRecord) {
        HabitLog habitLog = new HabitLog();

        habitLog.setHabitId(habitLogRecord.habitId());
        habitLog.setLogDate(Date.valueOf(LocalDate.now())); 
        habitLog.setStartTime(habitLogRecord.beginTime()); 
        habitLog.setEndTime(habitLogRecord.endTime());     
        habitLog.setTargetMeasure(habitLogRecord.measure()); 
        habitLog.setTargetMeasureDescription(habitLogRecord.description()); 

        return habitLog;
    }
}

