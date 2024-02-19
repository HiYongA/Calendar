import "../styles/styles.css";
import React, { useState } from "react";
import moment from "moment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Calendar = ({ onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  // 현재 월의 시작 주와 끝 주 찾기
  const startWeek = currentMonth.clone().startOf("month").week();
  const endWeek =
    currentMonth.clone().endOf("month").week() === 1
      ? 53
      : currentMonth.clone().endOf("month").week();

  let calendar = [];
  // 주별로 달력 만들기
  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push(
      <div key={week} className="week">
        {/* 각 주의 일자를 생성하고, 현재 달에 속하는지 여부 확인 */}
        {Array.from({ length: 7 }).map((_, i) => {
          let current = currentMonth
            .clone()
            .week(week)
            .startOf("week")
            .add(i, "day");
          let isCurrentMonth = currentMonth.isSame(current, "month");
          return (
            <div
              key={i}
              className={`day ${isCurrentMonth ? "" : "not-current"}`}
              onClick={() => onSelect(current)}
            >
              {current.format("D")}
            </div>
          );
        })}
      </div>
    );
  }

  // 요일 표시
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"].map(
    (day, index) => (
      <div key={index} className="day-of-week">
        {day}
      </div>
    )
  );

  return (
    <div className="calendar">
      <div className="month">
        <button
          onClick={() =>
            setCurrentMonth(currentMonth.clone().subtract(1, "month"))
          }
        >
          <IoIosArrowBack />
        </button>
        {currentMonth.format("YYYY년 MM월")}
        <button
          onClick={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="week">{daysOfWeek}</div>
      {calendar}
    </div>
  );
};

export default Calendar;
