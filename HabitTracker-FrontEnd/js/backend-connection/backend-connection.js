//GetAll
function getAllHabits() {
  const url = `http://localhost:8080/api/habit-tracker/habit-details`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status != 302) {
        return response.text().then((text) => {
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${text}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("all-habits-list");
      const colors = ["#85c1e9", "#76d7c4", "#f9e79f", "#f5b7b1", "#d6dbdf"];
      container.innerHTML = "";

      data.forEach((habit, index) => {
        if (!habit.isDeleted) {
          const habitElement = document.createElement("div");
          habitElement.classList.add("container", "mb-4", "head");
          habitElement.style.backgroundColor = colors[index % colors.length];

          let habitTarget = targetUtils(habit);

          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(habit)}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${habitTarget}</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit" data-habit-id="${
                              habit.habitId
                            }"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-id="${
                              habit.habitId
                            }"></i>
                        </span>
                    </div>
                </div>
            `;
          container.appendChild(habitElement);
        }
      });
    })
    .catch((error) => console.error("Error:", error.message));
}

function getHabitRepeatText(habit) {
  let repeatText = "";

  let daysText = "Days : " + habit.repeatOptions.days.join(", ");
  if (habit.repeatOptions.days.length > 0) {
    repeatText = repeatText ? repeatText + " | " + daysText : daysText;
  }
  if (habit.repeatOptions.customDays > "0") {
    daysText += ` (${habit.repeatOptions.customDays} times in Day)`;
    repeatText = repeatText ? repeatText + " | " + daysText : daysText;
  }

  let weeksText = "Weeks: " + habit.repeatOptions.weeks.join(", ");
  if (habit.repeatOptions.weeks.length > 0) {
    repeatText = repeatText ? repeatText + " | " + weeksText : weeksText;
  }
  if (habit.repeatOptions.customWeeks > "0") {
    weeksText += ` (${habit.repeatOptions.customWeeks} times in Week)`;
    repeatText = repeatText ? repeatText + " | " + weeksText : weeksText;
  }

  let monthsText = "Months: " + habit.repeatOptions.months.join(", ");
  if (habit.repeatOptions.months.length > 0) {
    repeatText = repeatText ? repeatText + " | " + monthsText : monthsText;
  }
  if (habit.repeatOptions.customMonths > "0") {
    monthsText += ` (${habit.repeatOptions.customMonths} times in Month)`;
    repeatText = repeatText ? repeatText + " | " + monthsText : monthsText;
  }

  return repeatText || "-";
}

// Post
function saveHabit(habitData) {
  fetch("http://localhost:8080/api/habit-tracker/habit-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habitData),
  })
    .then((response) => {
      {
        const url = `http://localhost:8080/api/habit-tracker/habit-details/habit-data/${encodeURIComponent(
          habitData.habitName
        )}`;

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status !== 302) {
              return response.text().then((text) => {
                throw new Error(
                  `HTTP error! status: ${response.status}, body: ${text}`
                );
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Saved Successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fadeOutAndRemove(element) {
  element.classList.add("fade-out");
  element.addEventListener("transitionend", () => {
    element.remove();
  });
}

//Delete
function deleteHabit(habitId, target) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this habit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `http://localhost:8080/api/habit-tracker/habit-details/${habitId}`;

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Habit has been deleted successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 750,
            });

            const habitElement = target.closest(".container");
            fadeOutAndRemove(habitElement);
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  });
}

// Get Habits By Name
function getAllHabitsByName(habitName) {
  const url = `http://localhost:8080/api/habit-tracker/habit-details/habit-data/${encodeURIComponent(
    habitName
  )}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status !== 302) {
        return response.text().then((text) => {
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${text}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("all-habits-list");
      const colors = ["#85c1e9", "#76d7c4", "#f9e79f", "#f5b7b1", "#d6dbdf"];

      container.innerHTML = "";

      data.forEach((habit, index) => {
        if (!habit.isDeleted) {
          const habitElement = document.createElement("div");
          habitElement.classList.add("container", "mb-4", "head");
          habitElement.style.backgroundColor = colors[index % colors.length];

          let habitTarget = targetUtils(habit);

          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(habit)}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${habitTarget}</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit" data-habit-id="${
                              habit.habitId
                            }"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-id="${
                              habit.habitId
                            }"></i>
                        </span>
                    </div>
                </div>
            `;
          container.appendChild(habitElement);
        }
      });
    })
    .catch((error) => console.error("Error:", error.message));
}

// Get By Id
function getHabitById(habitId) {
  const url = `http://localhost:8080/api/habit-tracker/habit-details/${habitId}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status !== 302) {
        return response.text().then((text) => {
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${text}`
          );
        });
      }
      return response.json();
    })
    .then((habit) => {
      updateHabitForm(habit);
    })
    .catch((error) => console.error("Error:", error.message));
}

//Update Habit
function updateHabit(habitId, habitData) {
  fetch(`http://localhost:8080/api/habit-tracker/habit-details/${habitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habitData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Swal.fire({
        title: "Success!",
        text: "Habit Updated Successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          cancelPopUp();
        }
      });
      const parent = document
        .querySelector(`[data-habit-id="${habitId}"]`)
        .closest(".row");

      parent.children[0].textContent = data.habitName;
      parent.children[1].textContent = data.startDate ? data.startDate : "-";
      parent.children[2].textContent = data.endDate ? data.endDate : "-";
      parent.children[3].textContent = getHabitRepeatText(data);
      parent.children[4].textContent = data.timeOfDay.join(", ");

      let habitTarget = targetUtils(data);
      parent.children[5].textContent = habitTarget;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fadeOutAndRemove(element) {
  element.classList.add("fade-out");
  element.addEventListener("transitionend", () => {
    element.remove();
  });
}

let habitLogsSummaryList;
function fetchHabitSummary() {
  const url = "http://localhost:8080/api/habit-tracker/habit-details/summary";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((habitLogs) => {
      habitLogsSummaryList = habitLogs;
    })
    .catch((error) => {
      console.error("Error fetching habit logs:", error);
    });
}

// Get Todays Habit
function getTodaysHabit(date) {
  const url = `http://localhost:8080/api/habit-tracker/habit-details/habit-data-today/${date}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status != 302) {
        return response.text().then((text) => {
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${text}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("habitContainer");
      if (!container) {
        console.error("Container element not found");
        return;
      }
      container.innerHTML = ""; // Clear existing content

      let rowElement;

      const allTrackedHabitIds = getAllTrackedHabitIds();

      data.forEach((habit, index) => {
        if (!habit.isDeleted) {
          if (index % 2 === 0) {
            // Create a new row for every two habits
            rowElement = document.createElement("div");
            rowElement.classList.add("row", "mb-4", "main-row");
            container.appendChild(rowElement);
          }

          const habitElement = document.createElement("div");
          habitElement.classList.add("col-md-6", "card");

          let habitTarget = targetUtils(habit);

          let timeOfDay = "DayOrNight";
          let timeOfDayText = "AnyTime";
          if (habit.timeOfDay && habit.timeOfDay.length > 0) {
            timeOfDay = habit.timeOfDay[0].toLowerCase();
            timeOfDayText = habit.timeOfDay[0];
          }

          habitElement.innerHTML = `
            <div class="row">
              <div class="col-md-9" id="habitName">${habit.habitName}</div>
              <div class="col" style="display: flex; flex-direction: column; align-items: center; margin-right:-25px">
                <img src="images/time-of-day/${timeOfDay}.png" alt="" id="time_of_days">
                <span id="time_of_day">${timeOfDayText}</span>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-12" style="display: flex;">
                <img src="images/direct-hit.svg" alt="" id="target_img">
                <div class="ms-3" id="target-name">${habitTarget}</div>
              </div>
            </div>

            <!-- Display the target section based on habit.target -->
            ${
              habit.target.timeSpent.hours !== "00" ||
              habit.target.timeSpent.minutes !== "00"
                ? `
          <!-- Time Spent Section -->
          <div class="row mb-5">
            <div class="col-md-4">
              <label for="hours-${habit.habitId}">Hours</label>
              <input type="number" class="form-control" id="hours-${habit.habitId}" value="${habit.target.timeSpent.hours}"
                max="12" min="00">
            </div>
            <div class="col-md-4">
              <label for="minutes-${habit.habitId}">Minutes</label>
              <input type="number" class="form-control" id="minutes-${habit.habitId}" value="${habit.target.timeSpent.minutes}"
                max="60" min="00">
            </div>
          </div>
          `
                : ``
            }
          
          ${
            habit.target.selectTime
              ? `
          <!-- Select Time Section -->
          <div class="row mb-5">
            <div class="col-md-6">
              <label for="time-input-${habit.habitId}">Select Time</label>
              <input type="time" class="form-control" id="time-input-${habit.habitId}" value="${habit.target.selectTime}">
            </div>
          </div>
          `
              : ``
          }
          
          ${
            habit.target.number.measure !== "0" &&
            habit.target.number.description !== ""
              ? `
          <!-- Others (Measure + Description) Section -->
          <div class="row mb-5">
            <div class="col-md-3">
              <label for="target-number-input-${habit.habitId}">Measure</label>
              <input type="number" id="target-number-input-${habit.habitId}" value="${habit.target.number.measure}" min="0"
                class="form-control">
            </div>
            <div class="col-md-8">
              <label for="target-description-${habit.habitId}">Description</label>
              <input type="text" id="target-description-${habit.habitId}" value="${habit.target.number.description}"
                class="form-control" maxlength="50">
            </div>
          </div>
          `
              : ``
          }        
   
            <div class="mb-3">
              <button type="button" class="btn btn-primary" id="add-button-${
                habit.habitId
              }" data-habit-id="${habit.habitId}">Add</button>
            </div>
          `;

          rowElement.appendChild(habitElement);

          // Add event listener for the "Add" button
          const addButton = habitElement.querySelector(
            `#add-button-${habit.habitId}`
          );

          addButton.addEventListener("click", function () {
            let timeSpentHours =
              document.getElementById(`hours-${habit.habitId}`)?.value || "00";
            let timeSpentMinutes =
              document.getElementById(`minutes-${habit.habitId}`)?.value || "00";
            let selectTime =
              document.getElementById(`time-input-${habit.habitId}`)?.value || null;
            let measure =
              document.getElementById(`target-number-input-${habit.habitId}`)
                ?.value || "0";
            let description =
              document.getElementById(`target-description-${habit.habitId}`)?.value ||
              "";

              let target = "";
              if (timeSpentHours && timeSpentHours !== "00" || timeSpentMinutes && timeSpentMinutes !== "00") {
                target = `${timeSpentHours}:${timeSpentMinutes} Hrs`;
              }
              
              else if (selectTime) {
                target += `${formatTimeWithAMPM(selectTime)}`;
              }
  
              else if (measure && measure !== 0 || description && description.trim() !== "") {
                target += `${measure || 0} ${description || ""}`;
              }
              
            const habitLog = {
              habitId: habit.habitId,
              logDate : date,
              targetName : habitTarget,
              targetMeasure : target,
            };

            saveHabitLog(habitLog, this);
          });
        }
      });
    })
    .catch((error) => console.error("Error:", error.message));
}

function formatTimeWithAMPM(time) {
  if (!time || time.trim() === "") {
    return "00:00 AM"; // Return "00:00 AM" when no time is selected
  }

  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  let mins = parseInt(minutes, 10);

  if (isNaN(hour)) {
    hour = 0; // Default to 0 if hours is invalid
  }

  if (isNaN(mins)) {
    mins = 0; // Default to 0 if minutes is invalid
  }

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert hour to 12-hour format

  return `${hour.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

function getAllTrackedHabitIds() {
  console.log(habitLogsSummaryList);
  if (!habitLogsSummaryList) return [];
  const allHabitIds = new Set();
  habitLogsSummaryList.forEach((summary) => {
    summary[1].forEach((id) => allHabitIds.add(id));
  });
  return Array.from(allHabitIds);
}

// Save Habit Log

function saveHabitLog(habitLog, target) {
  fetch("http://localhost:8080/api/habit-tracker/habit-details/habit-log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habitLog),
  })
    .then((response) => {
      if (response.ok) {
        const card = target.closest(".card");
        card.style.border = "2px solid #229954";
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// On DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
  getAllHabits();
  fetchHabitSummary();
  getTodaysHabit(new Date().toISOString().split("T")[0]);
});

function formatTimeWithAMPM(time) {
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
}

function targetUtils(habit) {
  let habitTarget;
  if (
    habit.target.timeSpent.hours != "00" ||
    habit.target.timeSpent.minutes != "00"
  ) {
    habitTarget = `${habit.target.timeSpent.hours}:${habit.target.timeSpent.minutes} Hrs`;
  } else if (habit.target.selectTime != null) {
    habitTarget = habit.target.selectTime;
  } else if (
    habit.target.number.measure != "0" &&
    habit.target.number.description !== ""
  ) {
    habitTarget = `${habit.target.number.measure} ${habit.target.number.description}`;
  } else {
    habitTarget = "-";
  }
  return habitTarget;
}
