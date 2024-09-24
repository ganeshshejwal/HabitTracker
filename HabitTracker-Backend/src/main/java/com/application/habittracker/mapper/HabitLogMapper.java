package com.application.habittracker.mapper;

import java.sql.Date;
import java.time.LocalDate;

import com.application.habittracker.entity.HabitLog;
import com.application.habittracker.record.HabitLogRecord;

public class HabitLogMapper {

    public static HabitLog toEntity(HabitLogRecord habitLogRecord) {
        HabitLog habitLog = new HabitLog();

       habitLog.setHabitId(habitLogRecord.habitId());
       habitLog.setLogDate(Date.valueOf(habitLogRecord.logDate()));
       habitLog.setTargetName(habitLogRecord.targetName());
       habitLog.setTargetMeasure(habitLogRecord.targetMeasure());

        return habitLog;
    }
}

