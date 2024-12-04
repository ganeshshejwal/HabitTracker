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
const otherMonthsCheckboxes = otherMonths.querySelectorAll(
  'input[type="checkbox"]'
);

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
    section.classList.add("disabled");
    const inputs = section.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = true));
  }

  function enableRepeatSection(section) {
    section.classList.remove("disabled");
    const inputs = section.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = false));
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
    const anyOtherOptionChecked = Array.from(
      otherOptions.querySelectorAll('input[type="checkbox"]')
    ).some((cb) => cb.checked);
    if (anyOtherOptionChecked) {
      disableRepeatSection(mainCheckbox.parentNode);
      disableRepeatSection(customInput.parentNode);
    } else {
      enableRepeatSection(mainCheckbox.parentNode);
      enableRepeatSection(customInput.parentNode);
    }
  }

  function handleCustomRepeatChange() {
    if (customInput.value !== "0") {
      disableRepeatSection(mainCheckbox.parentNode);
      disableRepeatSection(otherOptions);
    } else {
      enableRepeatSection(mainCheckbox.parentNode);
      enableRepeatSection(otherOptions);
    }
  }

  mainCheckbox.addEventListener("change", handleMainRepeatChange);
  otherOptions
    .querySelectorAll('input[type="checkbox"]')
    .forEach((cb) =>
      cb.addEventListener("change", handleOtherRepeatOptionsChange)
    );
  customInput.addEventListener("input", handleCustomRepeatChange);
}

// Set up Weekly section
setupRepeatSection("weekly-checkbox", "other-weeks", "custom-weekly-input");

// Set up Daily section
setupRepeatSection("daily-checkbox", "other-days", "custom-daily-input");
