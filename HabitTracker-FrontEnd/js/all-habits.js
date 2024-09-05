const searchInput = document.getElementById('search-button');
searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    getAllHabitsByName(searchValue);
  } else {
    getAllHabits();
  }
});
