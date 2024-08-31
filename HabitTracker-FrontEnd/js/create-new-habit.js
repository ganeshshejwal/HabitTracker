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

document.body.addEventListener('click', function(event) {
  var radioList = document.getElementById("radioList");
  if (!radioList.contains(event.target) && !event.target.closest('[onclick*="toggleRadioList"]')) {
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
document.getElementById('habitName').addEventListener('input', function() {
  var icon = document.getElementById('habitIcon');
  if (this.value.trim() !== '') {
    icon.style.display = 'inline';
    this.classList.remove('is-invalid'); 
  } 
});

document.getElementById('habitName').addEventListener('click', function() {
  var icon = document.getElementById('habitIcon');
  icon.style.display = 'inline';
  this.classList.remove('is-invalid'); 
});


// Date Validation 
const today = new Date().toISOString().split('T')[0];
document.getElementById('startDate').setAttribute('min', today);
document.getElementById('endDate').setAttribute('min', today);

// Start Date Input 
document.getElementById('startDate').addEventListener('click', function() {
  this.classList.remove('is-invalid')
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
    days: daysOptions
  };

  if (currentOption === option) {
    Object.values(optionElements).forEach(el => el.classList.add("d-none"));
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
    days: daysOptions
  };

  Object.values(optionElements).forEach(el => el.classList.add("d-none"));
  repeatOptions.classList.add("d-none");
  currentOption = null;
}

document.body.addEventListener('click', function(event) {
  if (!repeatOptions.contains(event.target) && !event.target.closest('[onclick*="toggleOptions"]')) {
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


document.getElementById('monthly-checkbox').addEventListener('change', function() {
  var otherDays = document.getElementById('other-months');
  if (this.checked) {
      otherDays.style.opacity = '0.3'; 
      otherDays.style.pointerEvents = 'none'; 
  } else {
      otherDays.style.opacity = '1'; 
      otherDays.style.pointerEvents = 'auto'; 
  }
});

document.getElementById('weekly-checkbox').addEventListener('change', function() {
  var otherDays = document.getElementById('other-weeks');
  if (this.checked) {
      otherDays.style.opacity = '0.3'; 
      otherDays.style.pointerEvents = 'none'; 
  } else {
      otherDays.style.opacity = '1'; 
      otherDays.style.pointerEvents = 'auto'; 
  }
});

document.getElementById('daily-checkbox').addEventListener('change', function() {
  var otherDays = document.getElementById('other-days');
  if (this.checked) {
      otherDays.style.opacity = '0.3'; 
      otherDays.style.pointerEvents = 'none'; 
  } else {
      otherDays.style.opacity = '1'; 
      otherDays.style.pointerEvents = 'auto'; 
  }
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
document.querySelectorAll('input[name="target"]').forEach(radio => {
  radio.addEventListener('change', function() {
      document.getElementById('target-time').classList.remove('enabled-section', 'disabled-section');
      document.getElementById('target-number').classList.remove('enabled-section', 'disabled-section');
      
      document.querySelectorAll('#target-time input, #target-number input').forEach(input => {
          input.disabled = true;
      });
      
      if (this.value === 'time') {
          document.getElementById('target-time').classList.add('enabled-section');
          document.getElementById('target-number').classList.add('disabled-section');
          
          document.querySelectorAll('#target-time input').forEach(input => {
              input.disabled = false;
          });
      } else if (this.value === 'number') {
          document.getElementById('target-time').classList.add('disabled-section');
          document.getElementById('target-number').classList.add('enabled-section');
          
          document.querySelectorAll('#target-number input').forEach(input => {
              input.disabled = false;
          });
      }
  });
});



//Submit
document.getElementById('habitForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var habitNameInput = document.getElementById('habitName');
  var icon = document.getElementById('habitIcon');
  var startDateInput = document.getElementById('startDate');
  var endDateInput = document.getElementById('endDate');
  
  if (habitNameInput.value.trim() === '') {
    icon.style.display = 'none';
    habitNameInput.classList.add('is-invalid'); 
  } else {
    icon.style.display = 'inline'; 
    habitNameInput.classList.remove('is-invalid');
  }

  if (startDateInput.value === '' && endDateInput.value !== '') {
    startDateInput.classList.add('is-invalid');
  }
});
