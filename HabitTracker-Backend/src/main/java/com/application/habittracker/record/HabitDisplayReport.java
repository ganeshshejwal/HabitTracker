package com.application.habittracker.record;

import java.sql.Date; // Use java.sql.Date to match the database field type

public class HabitDisplayReport {
    private Date logDate;
    private String targetName;
    private String targetMeasure;

    public HabitDisplayReport(Date logDate, String targetName, String targetMeasure) {
        this.logDate = logDate;
        this.targetName = targetName;
        this.targetMeasure = targetMeasure;
    }

    // Getters and setters
    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public String getTargetMeasure() {
        return targetMeasure;
    }

    public void setTargetMeasure(String targetMeasure) {
        this.targetMeasure = targetMeasure;
    }
}
