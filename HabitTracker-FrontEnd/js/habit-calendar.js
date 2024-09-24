let countOfHabits = 0;

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
            const { events, habitCounts } = generateCalendarEvents(habits);
            countOfHabits = habitCounts;
            initializeCalendar(events);
        })
        .catch((error) => console.error("Error:", error.message));
}

function generateCalendarEvents(habits) {
    const events = [];
    const habitCounts = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    const currentYear = today.getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);

    habits.forEach((habit) => {
        if (habit.isDeleted) return;

        let startDate = new Date(habit.startDate);
        let endDate = habit.endDate ? new Date(habit.endDate) : yearEnd;

        // Adjust start date if it's before the current year
        if (startDate < yearStart) {
            startDate = new Date(yearStart);
        }

        // Iterate through dates
        let currentDate = new Date(startDate);
        while (currentDate <= endDate && currentDate <= yearEnd) {
            if (shouldAddEvent(currentDate, habit.repeatOptions, startDate, endDate)) {
                const dateKey = currentDate.toISOString().slice(0, 10);
                habitCounts[dateKey] = (habitCounts[dateKey] || 0) + 1;

                events.push({
                    start: new Date(currentDate),
                    title: habit.habitName,
                    color: getRandomColor(),
                    id: habit.id,
                    isPast: currentDate < today
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
    });

    return { events, habitCounts };
}

function shouldAddEvent(date, repeatOptions, startDate, endDate) {
    // Check if the date is within the start and end date range
    if (date < startDate || (endDate && date > endDate)) {
        return false;
    }

    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.ceil(dayOfMonth / 7);
    const month = date.getMonth();

    console.log(repeatOptions);

    // 1. Monthly
    if (repeatOptions.months.includes("Monthly")) {
        return true;
    }

    // 2. Specific months
    if (repeatOptions.months.length > 0 && !repeatOptions.months.includes("Monthly")) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return repeatOptions.months.includes(monthNames[month]);
    }

    // 3. Weekly
    if (repeatOptions.weeks.includes("Weekly")) {
        return true;
    }

    // 4. Specific weeks
    if (repeatOptions.weeks.length > 0 && !repeatOptions.weeks.includes("Weekly")) {
        return repeatOptions.weeks.includes(`${weekOfMonth}`);
    }

    // 5. Daily
    if (repeatOptions.days.includes("Daily")) {
        return true;
    }

    // 6. Specific days
    if (repeatOptions.days.length > 0 && !repeatOptions.days.includes("Daily")) {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return repeatOptions.days.includes(dayNames[dayOfWeek]);
    }

    // 7 & 8 & 9. Start date, end date, and other options are already handled by the date range check at the beginning

    return false;
}

// ... (rest of the code remains the same)

function initializeCalendar(events) {
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
        data: events,
        renderEvent: function (data) {
            let event = data.original;
            let color = getRandomColor();
            return '<div class="md-custom-event" style="color:' + color + '">' + event.title + '</div>';
        }
    });
}

function getRandomColor() {
    const colors = ["#e74c3c", "#9b59b6", "#2980b9", "#16a085", "#34495e"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getDayName(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}

function getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

let habitLogsList;

function fetchHabitLogs() {
    const url = 'http://localhost:8080/api/habit-tracker/habit-details/habit-log';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((habitLogs) => {
        habitLogsList = habitLogs;
    })
    .catch((error) => {
        console.error('Error fetching habit logs:', error);
    });
}

function getHabitCounts(habitCounts) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (const [date, count] of Object.entries(habitCounts)) {
        for (const element of habitLogsList) {
            if (element[0] === date) {
                const habitDate = new Date(date);
                if (element[1] < count) {
                    showCustomAlert("Habit Pending", `You have incomplete habits for ${formatDate(date)}`);
                    const formattedDate = formatDate(date);
                    const targetElement = document.querySelector(`div[aria-label="${formattedDate}"]`) || document.querySelector(`div[aria-label="Today, ${formattedDate}"]`);
                    console.log("Target",targetElement);
                    if (targetElement) {
                        targetElement.classList.add('incomplete-habit-text');
                    } else {
                        console.log(`Element not found for date: ${formattedDate}`);
                    }
                }
            }
        }
    }
}

function applyCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .incomplete-habit-text {
            background-color: red !important;
            color: white !important;
            border-color: red !important;
        }
    `;
    document.head.appendChild(style);
}

function showCustomAlert(title, message) {
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-danger d-flex align-items-center';
    alertElement.setAttribute('role', 'alert');

    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('class', 'bi flex-shrink-0 me-2');
    svgElement.setAttribute('width', '24');
    svgElement.setAttribute('height', '24');
    svgElement.setAttribute('role', 'img');
    svgElement.setAttribute('aria-label', 'Danger:');

    const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#exclamation-triangle-fill');
    svgElement.appendChild(useElement);

    const textElement = document.createElement('div');
    textElement.textContent = `${title}: ${message}`;

    alertElement.appendChild(svgElement);
    alertElement.appendChild(textElement);

    let alertContainer = document.getElementById('custom-alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '10px';
        alertContainer.style.right = '20px';
        alertContainer.style.zIndex = '9999';
        document.body.appendChild(alertContainer);
    }

    alertContainer.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
        if (alertContainer.children.length === 0) {
            alertContainer.remove();
        }
    }, 5000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
    populateHabitCalendar();
    fetchHabitLogs();
    setTimeout(() => {
        getHabitCounts(countOfHabits);
       applyCustomStyles();
    }, 500);
});