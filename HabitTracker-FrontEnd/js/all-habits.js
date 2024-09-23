const searchInput = document.getElementById("search-button");
searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    getAllHabitsByName(searchValue);
  } else {
    getAllHabits();
    const deleteButton = document.getElementById("delete-button");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash-alt")) {
    const habitId = event.target.getAttribute("data-habit-id");
    if (habitId) {
      deleteHabit(habitId, event.target);
    }
  }
});

let habitId;
document.addEventListener("click", (event) => {
  const target = event.target;
  const updateContainer = document.getElementById("update-container");
  const backgroundBlur = document.createElement("div");
  
  
  if (target.classList.contains("fa-edit")) {
    habitId = target.getAttribute("data-habit-id");
    if (habitId) {
      updateContainer.classList.remove("hide");
      updateContainer.classList.add("show");

      backgroundBlur.classList.add("background-blur");
      document.body.appendChild(backgroundBlur);

      setTimeout(() => {
        backgroundBlur.classList.add("show");
      }, 0.1);

      getHabitById(habitId);
    }
  }
});

function updateHabitForm(habitData) {
  console.log(habitData);
  // Set habit name
  document.getElementById("habitName").value = habitData.habitName;

  // Set start and end dates
  document.getElementById("startDate").value = habitData.startDate || "";
  document.getElementById("endDate").value = habitData.endDate || "";

  // Set repeat options
  const repeatOptions = habitData.repeatOptions;

  // Months
  if (repeatOptions.months && repeatOptions.months.length > 0) {
    repeatOptions.months.forEach((month) => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${month}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }

  // Weeks
  if (repeatOptions.weeks && repeatOptions.weeks.length > 0) {
    repeatOptions.weeks.forEach((week) => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${week}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }

  // Days
  if (repeatOptions.days && repeatOptions.days.length > 0) {
    repeatOptions.days.forEach((day) => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${day}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }

  // Custom inputs for repeat options
  document.getElementById("custom-input").value = repeatOptions.customMonths || "0";
  document.getElementById("custom-weekly-input").value = repeatOptions.customWeeks || "0";
  document.getElementById("custom-daily-input").value = repeatOptions.customDays || "0";

  // Set time of day
  if (habitData.timeOfDay && habitData.timeOfDay.length > 0) {
    habitData.timeOfDay.forEach((time) => {
      const button = document.getElementById(`${time.toLowerCase()}-btn`);
      if (button) button.checked = true;
    });
  }

  // Handle target options
  const target = habitData.target;

  // Reset all target-related inputs
  document.getElementById("target-time-radio").checked = false;
  document.getElementById("select-time-input-radio").checked = false;
  document.getElementById("target-number-radio").checked = false;
  document.getElementById("hours").value = "00";
  document.getElementById("minutes").value = "00";
  document.getElementById("time-input").value = "";
  document.getElementById("target-number-input").value = "";
  document.getElementById("target-description").value = "";

  if (target.timeSpent && (target.timeSpent.hours !== "00" || target.timeSpent.minutes !== "00")) {
    // For "Select Time Spent"
    document.getElementById("target-time-radio").checked = true;
    document.getElementById("hours").value = target.timeSpent.hours.toString().padStart(2, "0");
    document.getElementById("minutes").value = target.timeSpent.minutes.toString().padStart(2, "0");
    document.getElementById("target-time").classList.remove("disabled-section");
    //disabled
    document.getElementById("select-time-input-radio").disabled = true;
    document.getElementById("target-number-radio").disabled = true;

    document.getElementById("time-input").disabled = true;
    document.getElementById("target-number-input").disabled = true;
    document.getElementById("target-description").disabled = true;

  } else if (target.selectTime) {
    // For "Select Time"
    document.getElementById("select-time-input-radio").checked = true;
    document.getElementById("time-input").value = formatTimeTo24Hour(target.selectTime);
    document.getElementById("time").classList.remove("disabled-section");
    //disabled
    document.getElementById("target-time-radio").disabled = true;  
    document.getElementById("target-number-radio").disabled = true;

    document.getElementById("hours").disabled = true;
    document.getElementById("minutes").disabled = true;
    document.getElementById("target-number-input").disabled = true;
    document.getElementById("target-description").disabled = true;

  } else if (target.number && target.number.measure !== "0" && target.number.description !== "") {
    // For "Number"
    document.getElementById("target-number-radio").checked = true;
    document.getElementById("target-number-input").value = target.number.measure;
    document.getElementById("target-description").value = target.number.description;
    document.getElementById("target-number").classList.remove("disabled-section");
    //disabled
    document.getElementById("target-time-radio").disabled = true;  
    document.getElementById("select-time-input-radio").disabled = true;

    document.getElementById("hours").disabled = true;
    document.getElementById("minutes").disabled = true;
    document.getElementById("time-input").disabled = true;
  }
}

function formatTimeTo24Hour(time) {
  if (!time) return "";
  const [timePart, ampm] = time.split(' ');
  let [hours, minutes] = timePart.split(':');
  
  let hour = parseInt(hours, 10);

  if (ampm === 'PM' && hour < 12) {
    hour += 12;
  } else if (ampm === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minutes}`;
}

// Update
document.getElementById("update-btn").addEventListener("click", () => {
  event.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to update this item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      const habitData = {
        habitName: document.getElementById("habitName").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        repeatOptions: {
          months: Array.from(
            document.querySelectorAll(
              '#months-options input[type="checkbox"]:checked'
            )
          ).map((el) => el.value),
          weeks: Array.from(
            document.querySelectorAll(
              '#weeks-options input[type="checkbox"]:checked'
            )
          ).map((el) => el.value),
          days: Array.from(
            document.querySelectorAll(
              '#days-options input[type="checkbox"]:checked'
            )
          ).map((el) => el.value),
          customMonths: document.querySelector(
            '#months-options input[type="number"]'
          ).value,
          customWeeks: document.querySelector(
            '#weeks-options input[type="number"]'
          ).value,
          customDays: document.querySelector('#days-options input[type="number"]')
            .value,
        },
        timeOfDay: Array.from(
          document.querySelectorAll(".btn-check:checked")
        ).map((el) => el.nextElementSibling.textContent.trim()),
        target: {
          timeSpent: {
            hours: document.getElementById("hours").value,
            minutes: document.getElementById("minutes").value,
          },
          selectTime: document.getElementById("time-input").value
            ? formatTimeWithAMPM(document.getElementById("time-input").value)
            : null,
          number: {
            measure: document.getElementById("target-number-input").value,
            description: document.getElementById("target-description").value,
          },
        },
      };
      console.log(habitData);
      if (
        habitData.startDate !== "" &&
        habitData.endDate !== "" &&
        habitData.repeatOptions.months.length === 0 &&
        habitData.repeatOptions.weeks.length === 0 &&
        habitData.repeatOptions.days.length === 0 &&
        habitData.repeatOptions.customMonths === "0" &&
        habitData.repeatOptions.customWeeks === "0" &&
        habitData.repeatOptions.customDays === "0"
      ) {
        habitData.repeatOptions.days[0] = "Daily";
      }
  
      if (
        habitData.startDate === "" &&
        habitData.endDate === "" &&
        habitData.repeatOptions.months.length === 0 &&
        habitData.repeatOptions.weeks.length === 0 &&
        habitData.repeatOptions.days.length === 0 &&
        habitData.repeatOptions.customMonths === "0" &&
        habitData.repeatOptions.customWeeks === "0" &&
        habitData.repeatOptions.customDays === "0"
      ) {
        Swal.fire({
          title: "Error!",
          text: "Please Provide At Least One, Date OR Repeat Option",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
  
      // Only Select End Date Not Start Date
      else if (
        habitData.startDate === "" &&
        habitData.endDate !== ""
      ) {
        Swal.fire({
          title: "Error!",
          text: "Please Select Start Date",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
      // Only Select Start Date Not End Date
      else if (
        habitData.startDate !== "" &&
        habitData.endDate !== "" && 
        habitData.startDate > habitData.endDate
      ) {
        Swal.fire({
          title: "Error!",
          text: "End Date Not Less Than Start Date",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        updateHabit(habitId, habitData);
      }
    } else {
      console.log("Update cancelled");
    }
  });
});

//Cancel

function cancelPopUp() {
  const backgroundBlur = document.querySelector('.background-blur');
  const updateContainer = document.getElementById("update-container");

  updateContainer.classList.add("hide");
  updateContainer.classList.remove("show");

  if (backgroundBlur && backgroundBlur.parentNode) {
    backgroundBlur.parentNode.removeChild(backgroundBlur);
 }
 setTimeout(() => {
   backgroundBlur.classList.remove("show");
}, 0.1);
  
}
document.getElementById("cancel-btn").addEventListener("click", cancelPopUp);
