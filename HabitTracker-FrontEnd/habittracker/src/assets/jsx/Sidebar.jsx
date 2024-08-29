import "../css/sidebar.css"

function Sidebar() {
  return (
    <>
      <button className="toggle-sidebar" id="toggle-sidebar">
        <img src="/daily-tasks.png" alt="" srcSet="" />{" "}
        <span>Habit Tracker</span>
      </button>
      <div className="sidebar" id="sidebar">
        <ul>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-calendar-week" />
              </div>
              <span>Todays Habit</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-plus" />
              </div>
              <span>Create New Habit</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-pencil-alt" />
              </div>
              <span>Edit Habit</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-clipboard-list" />
              </div>
              <span>All Habits</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-calendar-alt" />
              </div>
              <span>Habit Calendar</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon-container">
                <i className="fas fa-chart-line" />
              </div>
              <span>Statatics</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
