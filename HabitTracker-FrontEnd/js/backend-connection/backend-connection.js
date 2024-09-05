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
      data.forEach((habit, index) => {
        if (!habit.isDeleted) {
          const habitElement = document.createElement("div");
          habitElement.classList.add("container", "mb-4", "head");
          habitElement.style.backgroundColor = colors[index % colors.length];
          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(
                      habit.repeatOptions
                    )}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${
                      habit.target
                        ? habit.target.number.measure +
                          " " +
                          habit.target.number.description
                        : "-"
                    }</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-name="${
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

function getHabitRepeatText(repeatOptions) {
  const { months, weeks, days } = repeatOptions;
  let repeatText = "";

  if (months.length) repeatText += `${months.join(", ")}`;
  if (weeks.length) repeatText += `${weeks.join(", ")}`;
  if (days.length) repeatText += `${days.join(", ")}`;

  return repeatText || "No Repeat";
}

// Post

function saveHabit() {
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

  //If Start Date Is Added but Not Others
  if (
    habitData.endDate.value === "" &&
    habitData.repeatOptions.months.length === 0 &&
    habitData.repeatOptions.weeks.length === 0 &&
    habitData.repeatOptions.days.length === 0 &&
    habitData.repeatOptions.customMonths === "0" &&
    habitData.repeatOptions.customWeeks === "0" &&
    habitData.repeatOptions.customDays === "0"
  ) {
    habitData.repeatOptions.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  console.log(JSON.stringify(habitData));

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

//Delete
function deleteHabit(habitId) {
  const url = `http://localhost:8080/api/habit-tracker/${habitId}`;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Network response was not ok");
    })
    .then((text) => {
      console.log(text);
      Swal.fire({
        title: "Success!",
        text: "Habit Deleted Successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      const habitElement = event.target.closest(".container.mb-4.head");
      if (habitElement) {
        habitElement.remove();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the habit.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
}

// Get Habits By Name

function getAllHabitsByName(habitName) {
  // Update the URL to include the habit name as a path variable
  const url = `http://localhost:8080/api/habit-tracker/habit-details/habit-data/${encodeURIComponent(habitName)}`;

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
          habitElement.innerHTML = `
                <div class="row">
                    <div class="col">${habit.habitName}</div>
                    <div class="col">${habit.startDate || "-"}</div>
                    <div class="col">${habit.endDate || "-"}</div>
                    <div class="col">${getHabitRepeatText(
                      habit.repeatOptions
                    )}</div>
                    <div class="col">${habit.timeOfDay.join(", ") || "-"}</div>
                    <div class="col">${
                      habit.target
                        ? habit.target.number.measure +
                          " " +
                          habit.target.number.description
                        : "-"
                    }</div>
                    <div class="col">
                        <span class="action-icons">
                            <i class="far fa-edit"></i>
                            &nbsp;
                            &nbsp;
                            <i class="far fa-trash-alt" data-habit-name="${
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

// OnDOMLOAD
document.addEventListener("DOMContentLoaded", () => {
  getAllHabits();
});
