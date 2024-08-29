import Sidebar from "./assets/jsx/Sidebar";
import "./assets/css/create-new-habit.css"

function CreateNewHabit() {
return (
<>
  <Sidebar />
  <div className="main-content" id="main-content">
    <div className="container">
      <h2 className="mb-4">Create New Habit</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">

            <label htmlFor="habitName" className="form-label">
              Habit Name
            </label>

            <div className="input-icon">
              <i className="fa fa-list" aria-hidden="true" onclick="toggleRadioList()" />
              <input type="text" className="form-control" id="habitName"
                placeholder="Enter Habit Name   or   Select From List" oninput="validateInput(this)" spellCheck="false"
                autoComplete="off" />
            </div>

            <div id="radioList" className="radio-list" style={{ display: "none" }}>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                  onclick="setInputValue('Wake Up Early')" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Wake Up Early
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                  onclick="setInputValue('Morning Meditation')" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Morning Meditation
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                  onclick="setInputValue('Exercise')" />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  Exercise
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                  onclick="setInputValue('Drink Water')" />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                  Drink Water
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5"
                  onclick="setInputValue('Healthy Breakfast')" />
                <label className="form-check-label" htmlFor="flexRadioDefault5">
                  Healthy Breakfast
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6"
                  onclick="setInputValue('Plan Your Day')" />
                <label className="form-check-label" htmlFor="flexRadioDefault6">
                  Plan Your Day
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault7"
                  onclick="setInputValue('Read')" />
                <label className="form-check-label" htmlFor="flexRadioDefault7">
                  Read
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault8"
                  onclick="setInputValue('Practice Gratitude')" />
                <label className="form-check-label" htmlFor="flexRadioDefault8">
                  Practice Gratitude
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault9"
                  onclick="setInputValue('Stretch')" />
                <label className="form-check-label" htmlFor="flexRadioDefault9">
                  Stretch
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault10"
                  onclick="setInputValue('Deep Work Session')" />
                <label className="form-check-label" htmlFor="flexRadioDefault10">
                  Deep Work Session
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault11"
                  onclick="setInputValue('Take Breaks')" />
                <label className="form-check-label" htmlFor="flexRadioDefault11">
                  Take Breaks
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault12"
                  onclick="setInputValue('Learn Something New')" />
                <label className="form-check-label" htmlFor="flexRadioDefault12">
                  Learn Something New
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault13"
                  onclick="setInputValue('Healthy Lunch')" />
                <label className="form-check-label" htmlFor="flexRadioDefault13">
                  Healthy Lunch
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault14"
                  onclick="setInputValue('Reflect on Progress')" />
                <label className="form-check-label" htmlFor="flexRadioDefault14">
                  Reflect on Progress
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault15"
                  onclick="setInputValue('Connect with Someone')" />
                <label className="form-check-label" htmlFor="flexRadioDefault15">
                  Connect with Someone
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault16"
                  onclick="setInputValue('Practice a Hobby')" />
                <label className="form-check-label" htmlFor="flexRadioDefault16">
                  Practice a Hobby
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault17"
                  onclick="setInputValue('Limit Screen Time')" />
                <label className="form-check-label" htmlFor="flexRadioDefault17">
                  Limit Screen Time
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault18"
                  onclick="setInputValue('Evening Walk')" />
                <label className="form-check-label" htmlFor="flexRadioDefault18">
                  Evening Walk
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault19"
                  onclick="setInputValue('Journal')" />
                <label className="form-check-label" htmlFor="flexRadioDefault19">
                  Journal
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault20"
                  onclick="setInputValue('Sleep Early')" />
                <label className="form-check-label" htmlFor="flexRadioDefault20">
                  Sleep Early
                </label>
              </div>

            </div>

          </div>
          <div className="col-md-3">
            <label htmlFor="datePicker" className="form-label">
              Select Start Date
            </label>
            <input type="date" id="datePicker" className="form-control" />
          </div>

          <div className="col-md-3">
            <label htmlFor="datePicker" className="form-label">
              Select End Date
            </label>
            <input type="date" id="datePicker" className="form-control" />
          </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div>
              <label htmlFor="repeat" className="form-label">
                Repeat
              </label>
            </div>

            <div className="btn-group" role="group" aria-label="Repeat">
              <button type="button" className="btn btn-secondary" id="months-btn">
                Months <i className="fas fa-chevron-down" />
              </button>
              <button type="button" className="btn btn-secondary" id="weeks-btn">
                Weeks <i className="fas fa-chevron-down" />
              </button>
              <button type="button" className="btn btn-secondary" id="days-btn">
                Days <i className="fas fa-chevron-down" />
              </button>
              <button type="button" className="btn btn-secondary" id="repeat-btn">
                Custom
                <i className="fas fa-chevron-down" />
              </button>
            </div>

            <div id="repeat-options" className="d-none col-md-6">
              <div id="months-options">
                <label>
                  <input type="checkbox" defaultValue="Every Month" />{" "}
                  Every Month
                </label>
                <label>
                  <input type="checkbox" defaultValue="January" /> January
                </label>
                <label>
                  <input type="checkbox" defaultValue="February" />{" "}
                  February
                </label>
                <label>
                  <input type="checkbox" defaultValue="March" /> March
                </label>
                <label>
                  <input type="checkbox" defaultValue="April" /> April
                </label>
                <label>
                  <input type="checkbox" defaultValue="May" /> May
                </label>
                <label>
                  <input type="checkbox" defaultValue="June" /> June
                </label>
                <label>
                  <input type="checkbox" defaultValue="July" /> July
                </label>
                <label>
                  <input type="checkbox" defaultValue="August" /> August
                </label>
                <label>
                  <input type="checkbox" defaultValue="September" />{" "}
                  September
                </label>
                <label>
                  <input type="checkbox" defaultValue="October" /> October
                </label>
                <label>
                  <input type="checkbox" defaultValue="November" />{" "}
                  November
                </label>
                <label>
                  <input type="checkbox" defaultValue="December" />{" "}
                  December
                </label>
              </div>
              <div id="weeks-options">
                <label>
                  <input type="checkbox" defaultValue="Every Week" />{" "}
                  Every Week
                </label>
                <label>
                  <input type="checkbox" defaultValue={1} /> 1 st Week
                </label>
                <label>
                  <input type="checkbox" defaultValue={2} /> 2 nd Week
                </label>
                <label>
                  <input type="checkbox" defaultValue={3} /> 3 rd Week
                </label>
                <label>
                  <input type="checkbox" defaultValue={4} /> 4 th Week
                </label>
              </div>
              <div id="days-options">
                <label>
                  <input type="checkbox" defaultValue="Monday" /> Every
                  Day
                </label>
                <label>
                  <input type="checkbox" defaultValue="Monday" /> Monday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Tuesday" /> Tuesday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Wednesday" />{" "}
                  Wednesday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Thursday" />{" "}
                  Thursday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Friday" /> Friday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Saturday" />{" "}
                  Saturday
                </label>
                <label>
                  <input type="checkbox" defaultValue="Sunday" /> Sunday
                </label>
              </div>
              <div id="repeat-options-for-all">
                <label>
                  <input type="number" min={0} defaultValue={0} id="times_in_year" />{" "}
                  Times In Year
                </label>
                <label>
                  <input type="number" min={0} defaultValue={0} id="times_in_month" />{" "}
                  Times In Month
                </label>
                <label>
                  <input type="number" min={0} defaultValue={0} id="times_in_week" />{" "}
                  Times In Week
                </label>
                <label>
                  <input type="number" min={0} max={10} defaultValue={0} id="times_in_day" />{" "}
                  Times In Day
                </label>
              </div>
            </div>

          </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-10">
            <div>
              <label className="form-label">Time of the Day</label>
            </div>
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
              <div className="btn-with-time">
                <input type="checkbox" className="btn-check" id="morning-btn" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="morning-btn">
                  Morning
                </label>
                <div className="time-input-container" id="morning-time-input">
                  <label>
                    Start Time
                    <input type="time" className="form-control custom-time-input" id="morningTimeInput"
                      defaultValue="00:00" />
                  </label>
                  <label>
                    End Time
                    <input type="time" className="form-control custom-time-input" id="morningTimeInput"
                      defaultValue="00:00" />
                  </label>
                </div>
              </div>
              <div className="btn-with-time">
                <input type="checkbox" className="btn-check" id="afternoon-btn" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="afternoon-btn">
                  Afternoon
                </label>
                <div className="time-input-container" id="afternoon-time-input">
                  <label>
                    Start Time
                    <input type="time" className="form-control custom-time-input" id="afternoonTimeInput"
                      defaultValue="00:00" />
                  </label>
                  <label>
                    End Time
                    <input type="time" className="form-control custom-time-input" id="afternoonTimeInput"
                      defaultValue="00:00" />
                  </label>
                </div>
              </div>
              <div className="btn-with-time">
                <input type="checkbox" className="btn-check" id="evening-btn" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="evening-btn">
                  Evening
                </label>
                <div className="time-input-container" id="evening-time-input">
                  <label>
                    Start Time
                    <input type="time" className="form-control custom-time-input" id="eveningTimeInput"
                      defaultValue="00:00" />
                  </label>
                  <label>
                    End Time
                    <input type="time" className="form-control custom-time-input" id="eveningTimeInput"
                      defaultValue="00:00" />
                  </label>
                </div>
              </div>
              <div className="btn-with-time">
                <input type="checkbox" className="btn-check" id="night-btn" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="night-btn">
                  Night
                </label>
                <div className="time-input-container" id="night-time-input">
                  <label>
                    Start Time
                    <input type="time" className="form-control custom-time-input" id="nightTimeInput"
                      defaultValue="00:00" />
                  </label>
                  <label>
                    End Time
                    <input type="time" className="form-control custom-time-input" id="nightTimeInput"
                      defaultValue="00:00" />
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-4">

            <div className="row mb-6">
              <div className="col-md-8">
                <div>
                  <label htmlFor="target-select">Target</label>
                </div>
                <select className="form-select" aria-label="Default select example" id="target-select">
                  <option value="">Select an option</option>
                  <option value="time">Select Time</option>
                  <option value="number">Enter The Number</option>
                </select>
              </div>
            </div>
            
            <div id="target-time" className="hidden col-md-7">
              <label htmlFor="start-time">Select Time</label>
              <input type="time" id="start-time" className="form-control custom-time-input" />
            </div>

            <div id="target-number" className="row mb-6 hidden">
              <div className="col-md-4">
                <label htmlFor="target-number-input">Number</label>
                <input type="number" id="target-number-input" min={0} />
              </div>
              <div className="col-md-8">
                Target Description
                <input type="text" id="targer-description" className="form-control" />
              </div>
            </div>

            <div id="custom-field-container" className="hidden">
              <label htmlFor="custom-field-name">New Field Name</label>
              <input type="text" id="custom-field-name" placeholder="Enter field name" />
              <button id="create-field-button">Create</button>
            </div>

          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-5c common-subtn">
            <button type="submit" className="btn btn-success subtn">
              Save
            </button>
            <button type="reset " className="btn btn-danger subtn">
              Clear
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</>
);
}

export default CreateNewHabit;