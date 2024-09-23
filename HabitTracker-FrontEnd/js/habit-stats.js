document.addEventListener("DOMContentLoaded", function () {
const filterButton = document.getElementById("filterButton");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const habitNameInput = document.getElementById("habitName");
const habitStatsBody = document.getElementById("habitStatsBody");

filterButton.addEventListener("click", fetchHabitStatistics);

function fetchHabitStatistics() {
    const habitName = habitNameInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    const habitReport = {
        habitName : habitName,
        startDate : startDate,
        endDate : endDate
    }

    const habitNameAlert = habitNameInput.value.trim(); // Use trim() to remove any surrounding whitespace

    if (!habitNameAlert) { // Check if the habitName is empty or null
    Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please Enter a Habit Name',
        confirmButtonText: 'OK'
    });
    return;
}

    if (!startDate || !endDate) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Dates',
            text: 'Please Select Both Start and End Dates',
            confirmButtonText: 'OK'
        });
        return;
    }

    const url = `http://localhost:8080/api/habit-tracker/habit-details/statistics`;

    fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habitReport),
  })
   .then((response) => response.json())
   .then((data) => displayHabitStatistics(data))
   .catch((error) =>
        console.error("Error fetching habit statistics:", error)
   );
  }

  function displayHabitStatistics(statistics) {
    habitStatsBody.innerHTML = "";

    let cumulativeTarget = 0;  // Total target sum
    let cumulativeMeasure = 0; // Total measure sum

    let description = "";
    statistics.forEach((statArray, index) => {
        statArray.forEach((stat) => {
            let remark = "";  // Initialize remark
            let remarkColor = "";  // Initialize color for remark
            let isCumulative = false;  // To track if it's a cumulative target

            // Logic for remarks
            if (stat.targetName.includes("AM") || stat.targetName.includes("PM")) {
                // Time-based target (e.g., 6:30 AM/PM)
                if (stat.targetMeasure > stat.targetName) {
                    remark = "Not Completed";
                    remarkColor = "red";
                } else {
                    remark = "Completed";
                    remarkColor = "green";
                }
            } else if (stat.targetName.includes("Hrs")) {
                // Time duration target (e.g., 2:00 Hrs)
                const targetHours = parseFloat(stat.targetName);
                const measureHours = parseFloat(stat.targetMeasure);
                description = "Hrs";

                // Add to cumulative totals
                if (!isNaN(targetHours) && !isNaN(measureHours)) {
                    cumulativeTarget += targetHours;
                    cumulativeMeasure += measureHours;
                    isCumulative = true;
                }

                if (measureHours < targetHours) {
                    remark = "Not Completed";
                    remarkColor = "red";
                } else {
                    remark = "Completed";
                    remarkColor = "green";
                }
            } else {
                // Generic numeric target (e.g., Glasses of Water, Steps, etc.)
                const targetValue = parseFloat(stat.targetName); // Extract numeric part from the target
                const measureValue = parseFloat(stat.targetMeasure); // Extract numeric part from the measure

                description = stat.targetName.replace(/^\d+\s*/, '');

                // Add to cumulative totals
                if (!isNaN(targetValue) && !isNaN(measureValue)) {
                    cumulativeTarget += targetValue;
                    cumulativeMeasure += measureValue;
                    isCumulative = true;
                }

                if (measureValue < targetValue) {
                    remark = "Not Completed";
                    remarkColor = "red";
                } else {
                    remark = "Completed";
                    remarkColor = "green";
                }
            }

            const row = `
                <tr>
                    <td>${stat.logDate}</td>
                    <td>${stat.targetName}</td>
                    <td>${stat.targetMeasure}</td>
                    <td style="color:${remarkColor};">${remark}</td>
                </tr>
            `;
            habitStatsBody.innerHTML += row;
        });
    });

    const suggestion = (cumulativeMeasure === 0 && cumulativeTarget === 0) 
    ? `<span style="color: red;">No Data Available</span>` 
    : (cumulativeMeasure >= cumulativeTarget 
        ? `<span style="color: green;">Good, all targets met</span>` 
        : `<span style="color: red;">Need to Work</span>`);

    const cumulativeRow = `
    <tr>
       <td colspan="4" style="padding-top: 25px;"></td>
    </tr>
        <tr>
            <th scope="row"><h5>Total</h5></th>
            <td><h5>${cumulativeTarget} ${description}</h5></td>
            <td><h5>${cumulativeMeasure} ${description}</h5></td>
            <td><h5>${suggestion}</h5></td>
        </tr>
    `;
    habitStatsBody.innerHTML += cumulativeRow;
}



});
