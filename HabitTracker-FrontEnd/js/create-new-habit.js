// Sidebar
/*const toggleSidebar = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const sidebarIcon = document.getElementById("sidebar-icon");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("small");
  mainContent.classList.toggle("small-sidebar");
});*/

//Radio List of Habits
function toggleRadioList() {
  var radioList = document.getElementById("radioList");
  if (radioList.style.display === "none" || radioList.style.display === "") {
    radioList.style.display = "block";
  } else {
    radioList.style.display = "none";
  }
}

document.body.addEventListener("click", function (event) {
  var radioList = document.getElementById("radioList");
  if (
    !radioList.contains(event.target) &&
    !event.target.closest('[onclick*="toggleRadioList"]')
  ) {
    radioList.style.display = "none";
  }
});

// Radio Value to Input
function setInputValue(value) {
  var inputField = document.getElementById("habitName");
  inputField.value = value;
  toggleRadioList();
}

// Toggle For Validation HabitName
document.getElementById("habitName").addEventListener("input", function () {
  var icon = document.getElementById("habitIcon");
  if (this.value.trim() !== "") {
    icon.style.display = "inline";
    this.classList.remove("is-invalid");
  }
});

document.getElementById("habitName").addEventListener("click", function () {
  var icon = document.getElementById("habitIcon");
  icon.style.display = "inline";
  this.classList.remove("is-invalid");
});

// Habit Input Validation
function validateInput(input) {
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
}

// Date Validation
const today = new Date().toISOString().split("T")[0];
document.getElementById("startDate").setAttribute("min", today);
document.getElementById("endDate").setAttribute("min", today);

// Start Date Input
document.getElementById("startDate").addEventListener("click", function () {
  this.classList.remove("is-invalid");
});

// Repeat Habit
const monthsBtn = document.getElementById("months-btn");
const weeksBtn = document.getElementById("weeks-btn");
const daysBtn = document.getElementById("days-btn");

const repeatOptions = document.getElementById("repeat-options");
const monthsOptions = document.getElementById("months-options");
const weeksOptions = document.getElementById("weeks-options");
const daysOptions = document.getElementById("days-options");

let currentOption = null;

function toggleOptions(option) {
  const optionElements = {
    months: monthsOptions,
    weeks: weeksOptions,
    days: daysOptions,
  };

  if (currentOption === option) {
    Object.values(optionElements).forEach((el) => el.classList.add("d-none"));
    repeatOptions.classList.add("d-none");
    currentOption = null;
  } else {
    repeatOptions.classList.remove("d-none");

    Object.entries(optionElements).forEach(([key, el]) => {
      el.classList.toggle("d-none", key !== option);
    });
    currentOption = option;
  }
}

function hideAllOptions() {
  const optionElements = {
    months: monthsOptions,
    weeks: weeksOptions,
    days: daysOptions,
  };

  Object.values(optionElements).forEach((el) => el.classList.add("d-none"));
  repeatOptions.classList.add("d-none");
  currentOption = null;
}

document.body.addEventListener("click", function (event) {
  if (
    !repeatOptions.contains(event.target) &&
    !event.target.closest('[onclick*="toggleOptions"]')
  ) {
    hideAllOptions();
  }
});

monthsBtn.addEventListener("click", () => {
  event.stopPropagation();
  toggleOptions("months");
});

weeksBtn.addEventListener("click", () => {
  event.stopPropagation();
  toggleOptions("weeks");
});

daysBtn.addEventListener("click", () => {
  event.stopPropagation();
  toggleOptions("days");
});

// Montly Checkbox
const monthlyCheckbox = document.getElementById("monthly-checkbox");
const otherMonths = document.getElementById("other-months");
const customInput = document.getElementById("custom-input");
const otherMonthsCheckboxes = otherMonths.querySelectorAll( 'input[type="checkbox"]');

function disableSection(section) {
  section.classList.add("disabled");
  const inputs = section.querySelectorAll("input");
  inputs.forEach((input) => (input.disabled = true));
}

function enableSection(section) {
  section.classList.remove("disabled");
  const inputs = section.querySelectorAll("input");
  inputs.forEach((input) => (input.disabled = false));
}

function handleMonthlyChange() {
  if (monthlyCheckbox.checked) {
    disableSection(otherMonths);
    disableSection(customInput.parentNode);
  } else {
    enableSection(otherMonths);
    enableSection(customInput.parentNode);
  }
}

function handleOtherMonthsChange() {
  const anyOtherMonthChecked = Array.from(otherMonthsCheckboxes).some(
    (cb) => cb.checked
  );
  if (anyOtherMonthChecked) {
    disableSection(monthlyCheckbox.parentNode);
    disableSection(customInput.parentNode);
  } else {
    enableSection(monthlyCheckbox.parentNode);
    enableSection(customInput.parentNode);
  }
}

function handleCustomChange() {
  if (customInput.value !== "0") {
    disableSection(monthlyCheckbox.parentNode);
    disableSection(otherMonths);
  } else {
    enableSection(monthlyCheckbox.parentNode);
    enableSection(otherMonths);
  }
}

monthlyCheckbox.addEventListener("change", handleMonthlyChange);
otherMonthsCheckboxes.forEach((cb) =>
  cb.addEventListener("change", handleOtherMonthsChange)
);
customInput.addEventListener("input", handleCustomChange);

//Weekly & Daily

function setupRepeatSection(mainCheckboxId, otherOptionsId, customInputId) {
  const mainCheckbox = document.getElementById(mainCheckboxId);
  const otherOptions = document.getElementById(otherOptionsId);
  const customInput = document.getElementById(customInputId);

  function disableRepeatSection(section) {
      section.classList.add('disabled');
      const inputs = section.querySelectorAll('input');
      inputs.forEach(input => input.disabled = true);
  }

  function enableRepeatSection(section) {
      section.classList.remove('disabled');
      const inputs = section.querySelectorAll('input');
      inputs.forEach(input => input.disabled = false);
  }

  function handleMainRepeatChange() {
      if (mainCheckbox.checked) {
          disableRepeatSection(otherOptions);
          disableRepeatSection(customInput.parentNode);
      } else {
          enableRepeatSection(otherOptions);
          enableRepeatSection(customInput.parentNode);
      }
  }

  function handleOtherRepeatOptionsChange() {
      const anyOtherOptionChecked = Array.from(otherOptions.querySelectorAll('input[type="checkbox"]')).some(cb => cb.checked);
      if (anyOtherOptionChecked) {
          disableRepeatSection(mainCheckbox.parentNode);
          disableRepeatSection(customInput.parentNode);
      } else {
          enableRepeatSection(mainCheckbox.parentNode);
          enableRepeatSection(customInput.parentNode);
      }
  }

  function handleCustomRepeatChange() {
      if (customInput.value !== '0') {
          disableRepeatSection(mainCheckbox.parentNode);
          disableRepeatSection(otherOptions);
      } else {
          enableRepeatSection(mainCheckbox.parentNode);
          enableRepeatSection(otherOptions);
      }
  }

  mainCheckbox.addEventListener('change', handleMainRepeatChange);
  otherOptions.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', handleOtherRepeatOptionsChange));
  customInput.addEventListener('input', handleCustomRepeatChange);
}

// Set up Weekly section
setupRepeatSection(
  'weekly-checkbox',
  'other-weeks',
  'custom-weekly-input'
);

// Set up Daily section
setupRepeatSection(
  'daily-checkbox',
  'other-days',
  'custom-daily-input'
);

// Select Target
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("#target-time input, #target-number input")
    .forEach((input) => {
      input.disabled = true;
    });

  document.querySelectorAll('input[name="target"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      document
        .getElementById("target-time")
        .classList.remove("enabled-section", "disabled-section");
      document
        .getElementById("target-number")
        .classList.remove("enabled-section", "disabled-section");

      document
        .querySelectorAll("#target-time input, #target-number input")
        .forEach((input) => {
          input.disabled = true;
        });

      if (this.value === "time") {
        document.getElementById("target-time").classList.add("enabled-section");
        document
          .getElementById("target-number")
          .classList.add("disabled-section");

        document.querySelectorAll("#target-time input").forEach((input) => {
          input.disabled = false;
        });
      } else if (this.value === "number") {
        document
          .getElementById("target-time")
          .classList.add("disabled-section");
        document
          .getElementById("target-number")
          .classList.add("enabled-section");

        document.querySelectorAll("#target-number input").forEach((input) => {
          input.disabled = false;
        });
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
        title: 'Error!',
        text: 'Please Provide At Least One, Date OR Repeat Option',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }

    else if (habitNameInput.value.trim() === "") {
      icon.style.display = "none";
      habitNameInput.classList.add("is-invalid");
    } else {
      saveHabit();
      icon.style.display = "inline";
      habitNameInput.classList.remove("is-invalid");
    }
  });

