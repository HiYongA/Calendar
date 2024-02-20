import "../styles/styles.css";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import { FiCalendar } from "react-icons/fi";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(null);

  // 시작일자가 종료일자보다 이후인 경우,
  // 시작일자를 종료일자로 변경, 종료일자를 시작일자로 변경
  // (네이버, 구글 기간 검색)
  const FnValidateDates = useCallback(() => {
    if (startDate && endDate) {
      if (startDate.isAfter(endDate)) {
        setStartDate(endDate);
        setEndDate(startDate);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    FnValidateDates();
  }, [FnValidateDates]);

  const FnDateSelect = (date) => {
    if (showCalendar === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    // 날짜 선택 후 캘린더 닫기
    setShowCalendar(null);
  };

  return (
    <div className="container">
      <div className="date-picker">
        <section>
          <button
            onClick={() =>
              setShowCalendar(showCalendar === "start" ? null : "start")
            }
          >
            {startDate
              ? moment(startDate).format("YYYY. MM. DD.")
              : "연도. 월. 일."}
            <div>
              <FiCalendar />
            </div>
          </button>
        </section>
        <span>~</span>
        <section>
          <button
            onClick={() =>
              setShowCalendar(showCalendar === "end" ? null : "end")
            }
          >
            {endDate
              ? moment(endDate).format("YYYY. MM. DD.")
              : "연도. 월. 일."}
            <div>
              <FiCalendar />
            </div>
          </button>
        </section>
      </div>

      {showCalendar === "start" && (
        <Calendar onSelect={FnDateSelect} endDate={endDate} />
      )}
      {showCalendar === "end" && <Calendar onSelect={FnDateSelect} />}
    </div>
  );
};

export default DatePicker;
