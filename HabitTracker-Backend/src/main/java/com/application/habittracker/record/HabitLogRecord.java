package com.application.habittracker.record;
import java.time.LocalDate;

public record HabitLogRecord (
    Integer habitId,
    LocalDate logDate,   
    String targetName,   
    String targetMeasure   
) 
{}
    

