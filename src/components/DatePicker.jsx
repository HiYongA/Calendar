import "../styles/styles.css";
import React, { useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import { FiCalendar } from "react-icons/fi";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(null);

  const FnDateSelect = (date) => {
    if (showCalendar === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    // 날짜를 선택한 후 달력 숨기기
    setShowCalendar(null);
  };

  return (
    <div className="container">
      <div className="date-picker">
        <section>
          {startDate
            ? moment(startDate).format("YYYY. MM. DD.")
            : "연도. 월. 일."}
          <button
            onClick={() =>
              setShowCalendar(showCalendar === "start" ? null : "start")
            }
          >
            <FiCalendar />
          </button>
        </section>
        <span>~</span>
        <section>
          {endDate ? moment(endDate).format("YYYY. MM. DD.") : "연도. 월. 일."}
          <button
            onClick={() =>
              setShowCalendar(showCalendar === "end" ? null : "end")
            }
          >
            <FiCalendar />
          </button>
        </section>
      </div>

      {showCalendar === "start" && <Calendar onSelect={FnDateSelect} />}
      {showCalendar === "end" && <Calendar onSelect={FnDateSelect} />}
    </div>
  );
};

export default DatePicker;
