function getHabit(habitId) {
    const url = `http://localhost:8080/api/habit-tracker/habit-details/${habitId}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (response.status != 302) {
            return response.text().then(text => {
                throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => console.log('Habit details:', data))
    .catch(error => console.error('Error:', error.message));
}

// Post

function saveHabit() {
    const habitData = {
        habitName: document.getElementById('habitName').value,
        startDate: document.getElementById('datePicker').value,
        endDate: document.querySelectorAll('input[type="date"]')[1].value,
        repeat: {
            months: Array.from(document.querySelectorAll('#months-options input:checked')).map(el => el.value),
            weeks: Array.from(document.querySelectorAll('#weeks-options input:checked')).map(el => el.value),
            days: Array.from(document.querySelectorAll('#days-options input:checked')).map(el => el.value),
            custom: {
                timesInYear: document.querySelector('#times_in_year').value,
                timesInMonth: document.querySelector('#times_in_month').value,
                timesInWeek: document.querySelector('#times_in_week').value,
                timesInDay: document.querySelector('#times_in_day').value
            }
        },
        timeOfDay: {
            morning: document.getElementById('morning-btn').checked ? {
                start: document.querySelector('#morning-time-input input:nth-child(1)').value,
                end: document.querySelector('#morning-time-input input:nth-child(2)').value
            } : null,
            afternoon: document.getElementById('afternoon-btn').checked ? {
                start: document.querySelector('#afternoon-time-input input:nth-child(1)').value,
                end: document.querySelector('#afternoon-time-input input:nth-child(2)').value
            } : null,
            evening: document.getElementById('evening-btn').checked ? {
                start: document.querySelector('#evening-time-input input:nth-child(1)').value,
                end: document.querySelector('#evening-time-input input:nth-child(2)').value
            } : null,
            night: document.getElementById('night-btn').checked ? {
                start: document.querySelector('#night-time-input input:nth-child(1)').value,
                end: document.querySelector('#night-time-input input:nth-child(2)').value
            } : null
        },
        target: {
            type: document.getElementById('target-select').value,
            time: document.getElementById('start-time').value,
            number: document.getElementById('target-number-input').value,
            description: document.getElementById('targer-description').value
        }
    };

    console.log(JSON.stringify(habitData))

    fetch('http://localhost:8080/api/habit-tracker/habit-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        
    })
    .catch((error) => {
        console.error('Error:', error);
       
    });
}

