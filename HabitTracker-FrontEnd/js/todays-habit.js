const date = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
document.getElementById("date").textContent = date.toLocaleDateString(
  undefined,
  options
);

document.addEventListener("click", function (event) {
  if (event.target.id === "add-button") {
    const progressNumber = document.getElementById("progess-number").value;
    const description = document.getElementById("description").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    const habitLog = {
      habitId: event.target.getAttribute("data-habit-id"),
      measure: progressNumber,
      description: description,
      beginTime: startTime,
      endTime: endTime,
    };

    saveHabitLog(habitLog, event.target);
  }
});
