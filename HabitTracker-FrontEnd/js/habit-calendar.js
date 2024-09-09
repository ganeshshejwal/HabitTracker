function populateHabitCalendar() {
    const url = `http://localhost:8080/api/habit-tracker/habit-details`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status !== 302) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((habits) => {
            console.log("Fetched habits:", habits);
            const events = generateCalendarEvents(habits);
            console.log("Generated events:", events);
            initializeCalendar(events);
        })
        .catch((error) => console.error("Error:", error.message));
}

function generateCalendarEvents(habits) {
    const events = [];

    habits.forEach((habit) => {
        if (habit.isDeleted) return;

        const startDate = habit.startDate ? new Date(habit.startDate) : new Date();
        const endDate = habit.endDate ? new Date(habit.endDate) : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            if (shouldAddEvent(currentDate, habit.repeatOptions)) {
                events.push({
                    start: new Date(currentDate),
                    title: habit.habitName,
                    color: getRandomColor()
                });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });

    return events;
}

function shouldAddEvent(date, repeatOptions) {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    if (repeatOptions.days.includes("Daily")) return true;
    if (repeatOptions.weeks.includes("Weekly") && dayOfWeek === 0) return true;
    if (repeatOptions.months.length > 0 && dayOfMonth === date.getDaysInMonth()) return true;

    return repeatOptions.days.includes(getDayName(dayOfWeek));
}

function getDayName(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}

function getRandomColor() {
    const colors = ["#85c1e9", "#76d7c4", "#f9e79f", "#f5b7b1", "#d6dbdf"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function initializeCalendar(events) {
    console.log("Initializing calendar with events:", events);
    mobiscroll.eventcalendar('#eventcalendar', {
        theme: 'ios',
        themeVariant: 'light',
        clickToCreate: false,
        dragToCreate: false,
        dragToMove: false,
        dragToResize: false,
        view: {
            calendar: { type: 'month' }
        },
        data: events
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, populating calendar");
    populateHabitCalendar();
});

Date.prototype.getDaysInMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
};