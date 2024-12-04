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
    cTarget = cumulativeTarget;  // Total target sum
    cMeasure = cumulativeMeasure;
    des = description;
}

});


let cTarget;  // Total target sum
let cMeasure ;
let des;

function downloadTableAsPDF() {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the table element and habit name
    const table = document.querySelector('table');
    const habitName = document.getElementById('habitName').value;

    // Set initial y position
    let y = 20;

    // Add title and habit name
    doc.setFontSize(16);
    doc.text('Habit Statistics', 14, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Habit: ${habitName}`, 14, y);
    y += 10;

    // Set font size for table content
    doc.setFontSize(10);

    // Get table headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);

    // Get table rows
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(row => 
        Array.from(row.querySelectorAll('td')).map(td => td.textContent)
    );

    // Add headers
    doc.setTextColor(100);
    headers.forEach((header, i) => {
        doc.text(header, 14 + i * 45, y);
    });
    y += 7;

    // Add rows
    doc.setTextColor(0);
    let cumulativeTarget = cTarget;
    let cumulativeMeasure = cMeasure;
    let description = des;
    let suggestion = ''; // Initialize the suggestion

    rows.forEach((row, index) => {
        if (row.length === 4) { // Ensure it's a data row, not the summary row
            row.forEach((cell, i) => {
                doc.text(cell, 14 + i * 45, y);
            });
            y += 7;

            // Extract cumulative data from the last row
            if (index === rows.length - 1) {
                [, cumulativeTarget, cumulativeMeasure] = row; // Ignore the suggestion from the row

                // Parse cumulative target and measure values
                const match = cumulativeTarget.match(/(\d+(\.\d+)?)\s*(.*)/);
                if (match) {
                    cumulativeTarget = parseFloat(match[1]);
                    description = match[3]; // Save the description (e.g., Hrs, Steps)
                }
                cumulativeMeasure = parseFloat(cumulativeMeasure);
            }

            // Add a new page if we're near the bottom
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        }
    });

    // Logic to calculate the suggestion
    if (cumulativeMeasure === 0 && cumulativeTarget === 0) {
        suggestion = "No Data Available";
        doc.setTextColor(255, 0, 0); // Red
    } else if (cumulativeMeasure >= cumulativeTarget) {
        suggestion = "Good, all targets met";
        doc.setTextColor(0, 255, 0); // Green
    } else {
        suggestion = "Need to Work";
        doc.setTextColor(255, 0, 0); // Red
    }

    // Add cumulative totals to the PDF
    y += 10;
    doc.setTextColor(0); // Reset text color to black
    doc.setFontSize(12);
    doc.text(`Target: ${cumulativeTarget} ${description}`, 14, y);
    y += 7;
    doc.text(`Target Completion: ${cumulativeMeasure} ${description}`, 14, y);
    y += 10;
    doc.text(`Suggestion: ${suggestion}`, 14, y);

    // Save the PDF
    doc.save('habit_statistics.pdf');
}

document.addEventListener("DOMContentLoaded", function() {
    const downloadButton = document.getElementById("downloadButton");
    const habitNameInput = document.getElementById("habitName");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    if (downloadButton) {
        downloadButton.addEventListener("click", function() {
            // Validate Habit Name
            const habitName = habitNameInput.value.trim(); // Use trim() to remove any surrounding whitespace
            if (!habitName) { // Check if the habit name is empty or null
                Swal.fire({
                    icon: 'warning',
                    title: 'Input Required',
                    text: 'Please Enter a Habit Name',
                    confirmButtonText: 'OK'
                });
                return; // Stop if validation fails
            }

            // Validate Start and End Dates
            const startDate = startDateInput.value;
            const endDate = endDateInput.value;

            if (!startDate || !endDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Dates',
                    text: 'Please Select Both Start and End Dates',
                    confirmButtonText: 'OK'
                });
                return; // Stop if validation fails
            }

            // If validations pass, proceed with downloading the PDF
            downloadTableAsPDF();
        });
    }
});