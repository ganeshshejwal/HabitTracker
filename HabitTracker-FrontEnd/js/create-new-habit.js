//Radio List of Habits
function toggleRadioList() {
  const radioList = document.getElementById("radioList");
  if (radioList.style.display === "none" || radioList.style.display === "") {
    radioList.style.display = "block";
  } else {
    radioList.style.display = "none";
  }
}

document.body.addEventListener("click", function (event) {
  const radioList = document.getElementById("radioList");
  if (
    !radioList.contains(event.target) &&
    !event.target.closest('[onclick*="toggleRadioList"]')
  ) {
    radioList.style.display = "none";
  }
});

// Radio Value to Input
function setInputValue(value) {
  const inputField = document.getElementById("habitName");
  inputField.value = value;
  toggleRadioList();
}

// Toggle For Validation HabitName
document.getElementById("habitName").addEventListener("input", function () {
  const icon = document.getElementById("habitIcon");
  if (this.value.trim() !== "") {
    icon.style.display = "inline";
    this.classList.remove("is-invalid");
  }
});

document.getElementById("habitName").addEventListener("click", function () {
  const icon = document.getElementById("habitIcon");
  icon.style.display = "inline";
  this.classList.remove("is-invalid");
});

// Select Target
document.addEventListener("DOMContentLoaded", function () {
  const targetTimeSpend = document.getElementById("target-time");
  const targetTime = document.getElementById("time");
  const targetNumber = document.getElementById("target-number");
  const allInputs = document.querySelectorAll(
    "#target-time input, #time input, #target-number input"
  );

  function disableAllInputs() {
    allInputs.forEach((input) => {
      input.disabled = true;
      input.value = ""; // Clear the input value
    });
  }

  function enableInputs(section) {
    section.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });
  }

  function updateSectionVisibility(selectedSection) {
    [targetTimeSpend, targetTime, targetNumber].forEach((section) => {
      if (section === selectedSection) {
        section.classList.remove("disabled-section");
        section.classList.add("enabled-section");
      } else {
        section.classList.remove("enabled-section");
        section.classList.add("disabled-section");
      }
    });
  }

  disableAllInputs();

  document.querySelectorAll('input[name="target"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      disableAllInputs();

      let targetSection;
      switch (this.id) {
        case "target-time-radio":
          targetSection = targetTimeSpend;
          break;
        case "time-input-radio":
          targetSection = targetTime;
          break;
        case "target-number-radio":
          targetSection = targetNumber;
          break;
      }

      if (targetSection) {
        enableInputs(targetSection);
        updateSectionVisibility(targetSection);
      }
    });
  });
});

//Submit
document
  .getElementById("habitForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let habitNameInput = document.getElementById("habitName");
    let icon = document.getElementById("habitIcon");

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
    // Check if timeSpent has valid values
    const isTimeSpentSelected =
      (habitData.target.timeSpent.hours &&
        habitData.target.timeSpent.hours !== "00") ||
      (habitData.target.timeSpent.minutes &&
        habitData.target.timeSpent.minutes !== "00");

    // Check if selectTime has a valid value
    const isSelectTimeSelected =
      habitData.target.selectTime !== null &&
      habitData.target.selectTime !== "";

    // Check if number has valid measure and description
    const isNumberSelected =
      habitData.target.number.measure !== "" &&
      habitData.target.number.measure !== "0" &&
      habitData.target.number.description !== "";

    if (
      habitData.habitName !== "" &&
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
      habitData.habitName !== "" &&
      habitData.startDate !== "" &&
      habitData.endDate === "" &&
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
      habitData.habitName !== "" &&
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
      habitData.habitName !== "" &&
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
      habitData.habitName !== "" &&
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
    } else if (
      habitData.habitName !== "" &&
      !isTimeSpentSelected &&
      !isSelectTimeSelected &&
      !isNumberSelected
    ) {
      Swal.fire({
        icon: "warning",
        title: "No Target Selected",
        text: "Please Select Target",
      });
    } else if (habitNameInput.value.trim() === "") {
      icon.style.display = "none";
      habitNameInput.classList.add("is-invalid");
    } else {
      console.log(habitData);
      saveHabit(habitData);
      icon.style.display = "inline";
      habitNameInput.classList.remove("is-invalid");
    }
  });

function formatTimeWithAMPM(time) {
  if (!time || time.trim() === "") {
    return null; // Return null for empty or whitespace-only input
  }

  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  let mins = parseInt(minutes, 10);

  if (isNaN(hour) || isNaN(mins)) {
    return null; // Return null if either hours or minutes are not valid numbers
  }

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour.toString().padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )} ${ampm}`;
}
