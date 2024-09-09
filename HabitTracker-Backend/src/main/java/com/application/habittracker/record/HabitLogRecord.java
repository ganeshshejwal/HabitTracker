package com.application.habittracker.record;

public record HabitLogRecord (
    Integer habitId,
    Integer measure,
    String description,
    String beginTime,
    String endTime  
) 
{}
    

