package com.application.habittracker.record;
import java.util.List;

public record RepeatOptions(
    List<String> months,
    List<String> weeks,
    List<String> days,
    String customMonths,
    String customWeeks,
    String customDays
) {}

