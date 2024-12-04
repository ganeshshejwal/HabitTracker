const date = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
document.getElementById("date").textContent = date.toLocaleDateString(
  undefined,
  options
);

const dateInput = document.getElementById("search-date");

dateInput.addEventListener("change", function () {
  const selectedDate = dateInput.value;
  const textDate = new Date(dateInput.value); // Convert the input value to a Date object
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Specify the format
  const formattedDate = textDate.toLocaleDateString('en-US', options); // Format the date
  
  document.getElementById("date").textContent = formattedDate;
  getTodaysHabit(selectedDate);
});



