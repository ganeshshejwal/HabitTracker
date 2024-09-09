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
          let habitTarget = "-";
          if (habit.target.number.measure == "0") {
            habitTarget = `${habit.target.time.hours} : ${habit.target.time.minutes} Hrs`;
          } else
            habitTarget = `${habit.target.number.measure} ${habit.target.number.description}`;

          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(habit.repeatOptions)}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${habitTarget}</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit" data-habit-id="${habit.habitId}"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-id="${habit.habitId}"></i>
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

function getHabitRepeatText(repeatOptions) {
  const { months, weeks, days } = repeatOptions;
  let repeatText = "";

  if (months.length) repeatText += " "+`${months.join(", ")}`;
  if (weeks.length) repeatText += " "+`${weeks.join(", ")}`;
  if (days.length) repeatText += " "+`${days.join(", ")}`;

  return repeatText || "No Repeat";
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

          if (habit.target.number.measure == "0") {
            habitTarget = `${habit.target.time.hours} : ${habit.target.time.minutes} Hrs`;
          } else
            habitTarget = `${habit.target.number.measure} ${habit.target.number.description}`;

          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(habit.repeatOptions)}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${habitTarget}</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit" data-habit-id="${habit.habitId}"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-id="${habit.habitId}"></i>
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
function updateHabit(habitId) {
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
      customWeeks: document.querySelector('#weeks-options input[type="number"]')
        .value,
      customDays: document.querySelector('#days-options input[type="number"]')
        .value,
    },
    timeOfDay: Array.from(document.querySelectorAll(".btn-check:checked")).map(
      (el) => el.nextElementSibling.textContent.trim()
    ),
    target: {
      time: {
        hours: document.getElementById("hours").value,
        minutes: document.getElementById("minutes").value,
      },
      number: {
        measure: document.getElementById("target-number-input").value,
        description: document.getElementById("target-description").value,
      },
    },
  };

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

      const parent = document.querySelector(`[data-habit-id="${habitId}"]`).closest(".row");
      parent.children[0].textContent = habitData.habitName;
      parent.children[1].textContent = habitData.startDate;
      parent.children[2].textContent = habitData.endDate;
      parent.children[3].textContent = habitData.repeatOptions.days.join(", ");
      parent.children[4].textContent = habitData.timeOfDay.join(", ");

      let hours = habitData.target.time.hours;
      if(habitData.target.number.measure == '' || habitData.target.number.measure == '0') {
        parent.children[5].textContent = `${hours} : ${habitData.target.time.minutes} Hrs`;
      }
      else {
        parent.children[5].textContent = `${habitData.target.number.measure}  ${habitData.target.number.description}`;
      }
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

// Get Todays Habit
function getTodaysHabit() {
  const url = `http://localhost:8080/api/habit-tracker/habit-details/habit-data-today`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status !=302) {
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
      container.innerHTML = ''; // Clear existing content

      let rowElement;

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

          let habitTarget = "-";
          if (habit.target && habit.target.number && habit.target.number.measure == '0') {
            habitTarget = `${habit.target.time.hours} : ${habit.target.time.minutes} Hrs`;
          } else if (habit.target && habit.target.number) {
            habitTarget = `${habit.target.number.measure} ${habit.target.number.description}`;
          }

          let timeOfDay = "DayOrNight";
          let timeOfDayText = "";
          if (habit.timeOfDay && habit.timeOfDay.length > 0) {
            timeOfDay = habit.timeOfDay[0].toLowerCase();
            timeOfDayText = habit.timeOfDay[0];
          }

          habitElement.innerHTML = `
            <div class="row">
              <div class="col-md-9" id="habitName">${habit.habitName || 'Unnamed Habit'}</div>
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

            <div class="row mb-2">
              <div class="mb-2" id="target-complete-name">Progress</div>
              <div class="row mb-2">
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <input type="text" class="form-control" id="progess-number" value="00" max="500" min="00">
                  </div>
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="Enter The Description" id="description">
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-5">
                <div class="d-flex">
                  <span id="begin">Begin</span>
                  <input type="time" id="start-time" class="form-control ms-2" value="00:00">
                </div>
              </div>
              <div class="col-md-4">
                <div class="d-flex">
                  <span id="finish">Finish</span>
                  <input type="time" id="end-time" class="form-control ms-2" value="00:00">
                </div>
              </div>
            </div>

            <div>
              <button type="button" class="btn btn-primary" id="add-button" data-habit-id="${habit.habitId}">Add</button>
            </div>
          `;

          rowElement.appendChild(habitElement);
        }
      });

    })
    .catch((error) => console.error("Error:", error.message));
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
        const card = target.closest('.card');
        card.style.border = '2px solid #229954';
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
  getTodaysHabit();
});
