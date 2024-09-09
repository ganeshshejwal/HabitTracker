const searchInput = document.getElementById("search-button");
searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    getAllHabitsByName(searchValue);
  } else {
    getAllHabits();
    const deleteButton = document.getElementById("delete-button");
    console.log(deleteButton);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash-alt")) {
    console.log(event.target);
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
  // Set habit name
  document.getElementById("habitName").value = habitData.habitName;
  // Set start and end dates
  document.getElementById("startDate").value = habitData.startDate;
  document.getElementById("endDate").value = habitData.endDate;
  // Set repeat options
  const repeatOptions = habitData.repeatOptions;
  // Months
  if (repeatOptions.months.length > 0) {
    repeatOptions.months.forEach((month) => {
      document.querySelector(
        `input[type="checkbox"][value="${month}"]`
      ).checked = true;
    });
  }
  // Weeks
  if (repeatOptions.weeks.length > 0) {
    repeatOptions.weeks.forEach((week) => {
      document.querySelector(
        `input[type="checkbox"][value="${week}"]`
      ).checked = true;
    });
  }
  // Days
  if (repeatOptions.days.length > 0) {
    repeatOptions.days.forEach((day) => {
      document.querySelector(
        `input[type="checkbox"][value="${day}"]`
      ).checked = true;
    });
  }
  // Custom inputs
  document.getElementById("custom-input").value = repeatOptions.customMonths;
  document.getElementById("custom-weekly-input").value =
    repeatOptions.customWeeks;
  document.getElementById("custom-daily-input").value =
    repeatOptions.customDays;
  // Set time of day
  habitData.timeOfDay.forEach((time) => {
    document.getElementById(`${time.toLowerCase()}-btn`).checked = true;
  });
  // Set target
  if (habitData.target.time.hours !== undefined) {
    document.getElementById("target-time-radio").checked = true;
    document.getElementById("hours").value = habitData.target.time.hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").value = habitData.target.time.minutes
      .toString()
      .padStart(2, "0");
  } else if (habitData.target.number.measure !== undefined) {
    document.getElementById("target-number-radio").checked = true;
    document.getElementById("target-number-input").value =
      habitData.target.number.measure;
    document.getElementById("target-description").value =
      habitData.target.number.description;
  }
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
      updateHabit(habitId);
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