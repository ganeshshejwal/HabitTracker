// Sidebar
const toggleSidebar = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const sidebarIcon = document.getElementById("sidebar-icon");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("small");
  mainContent.classList.toggle("small-sidebar");
  sidebarIcon.classList.toggle("fa-bars");
  sidebarIcon.classList.toggle("fa-times");
});

//Radio List of Habits
function toggleRadioList() {
  var radioList = document.getElementById("radioList");
  if (radioList.style.display === "none" || radioList.style.display === "") {
      radioList.style.display = "block";
  } else {
      radioList.style.display = "none";
  }
}

// Radio Value to Input
function setInputValue(value) {
  var inputField = document.getElementById("habitName");
  inputField.value = value;
  toggleRadioList(); 
}

// Repeat Habit
const monthsBtn = document.getElementById("months-btn");
const weeksBtn = document.getElementById("weeks-btn");
const daysBtn = document.getElementById("days-btn");
const repeatBtn = document.getElementById("repeat-btn");

const repeatOptions = document.getElementById("repeat-options");
const monthsOptions = document.getElementById("months-options");
const weeksOptions = document.getElementById("weeks-options");
const daysOptions = document.getElementById("days-options");
const repeatOptionsForAll = document.getElementById("repeat-options-for-all");

let currentOption = null;

function toggleOptions(option) {
  if (currentOption === option) {
    repeatOptions.classList.add("d-none");
    monthsOptions.classList.add("d-none");
    weeksOptions.classList.add("d-none");
    daysOptions.classList.add("d-none");
    repeatOptionsForAll.add("d-none");
    currentOption = null;
  } else {
    repeatOptions.classList.remove("d-none");
    monthsOptions.classList.toggle("d-none", option !== "months");
    weeksOptions.classList.toggle("d-none", option !== "weeks");
    daysOptions.classList.toggle("d-none", option !== "days");
    repeatOptionsForAll.classList.toggle("d-none", option != "repeat");
    currentOption = option;
  }
}

monthsBtn.addEventListener("click", () => {
  toggleOptions("months");
});

weeksBtn.addEventListener("click", () => {
  toggleOptions("weeks");
});

daysBtn.addEventListener("click", () => {
  toggleOptions("days");
});

repeatBtn.addEventListener("click", () => {
  toggleOptions("repeat");
});

// Habit Input Validation
function validateInput(input) {
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
}

// DropDown
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdownMenuButton1");
  const dropdownItems = document.querySelectorAll(".di1");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedText = this.textContent;
      dropdownButton.textContent = selectedText;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdownMenuButton2");
  const dropdownItems = document.querySelectorAll(".di2");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedText = this.textContent;
      dropdownButton.textContent = selectedText;
    });
  });
});

// Input Time
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-check");

  buttons.forEach((button) => {
    button.addEventListener("change", function () {
      const timeInputId = this.id.replace("-btn", "-time-input");
      const timeInputContainer = document.getElementById(timeInputId);

      if (this.checked) {
        timeInputContainer.style.display = "block";
      } else {
        timeInputContainer.style.display = "none";
      }
    });
  });
});

// Select Target
document
  .getElementById("target-select")
  .addEventListener("change", function () {
    var value = this.value;
    document.getElementById("target-time").classList.add("hidden");
    document.getElementById("target-number").classList.add("hidden");
    document.getElementById("custom-field-container").classList.add("hidden");

    if (value === "time") {
      document.getElementById("target-time").classList.remove("hidden");
    } else if (value === "number") {
      document.getElementById("target-number").classList.remove("hidden");
    } else if (value === "custom") {
      document
        .getElementById("custom-field-container")
        .classList.remove("hidden");
    }
  });

// Target Create Field Below
document.getElementById("create-field-button").addEventListener("click", function () {
    var fieldName = document.getElementById("custom-field-name").value;
    if (fieldName.trim()) {
      var targetSelect = document.getElementById("target-select");
      var newOption = document.createElement("option");
      newOption.value = fieldName;
      newOption.textContent = `Custom: ${fieldName}`;
      targetSelect.appendChild(newOption);
      document.getElementById("custom-field-container").classList.add("hidden");
    }
  });

// Create New Option   
document.querySelector('.create-new-desc').addEventListener('click', function() {
  var select = document.getElementById('target-select');
  var newOption = document.createElement('option');
  newOption.value = 'Enter Number'; 
  newOption.textContent = 'Custom Number'; 
  select.appendChild(newOption);
});


