import "../styles/styles.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// 요일 표시
const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"].map(
  (day, index) => (
    <div key={index} className="day-of-week">
      {day}
    </div>
  )
);

const Calendar = ({ onSelect, startDate, endDate }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const today = moment();

  // 종료일을 moment 객체로 변환
  const endDateMoment = endDate ? moment(endDate) : null;

  // 날짜 클릭 핸들러 함수
  const FnhandleDayClick = (selectedDate) => {
    // 현재 날짜 이후의 날짜를 비활성화
    if (selectedDate.isAfter(today, "day")) return;
    // 선택된 날짜가 종료일 이후면 비활성화
    if (endDateMoment && selectedDate.isAfter(endDateMoment, "day")) return;
    onSelect(selectedDate);
  };

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
          let isDisabled =
            current.isAfter(today, "day") ||
            (endDateMoment && current.isAfter(endDateMoment, "day"));
          let isStartDate = startDate && current.isSame(startDate, "day");
          let isEndDate = endDate && current.isSame(endDate, "day");
          return (
            <div
              key={i}
              className={`day ${isCurrentMonth ? "" : "not-current"} ${
                isDisabled ? "disabled not-current" : ""
              } ${isStartDate || isEndDate ? "selected" : ""}`}
              onClick={() => FnhandleDayClick(current)}
            >
              {current.format("D")}
            </div>
          );
        })}
      </div>
    );
  }

  // 종료일이 현재 날짜보다 이전인지 확인하여 버튼 비활성화
  const isEndDateBeforeToday =
    endDate && moment(endDate).isSameOrBefore(today, "day");

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
      <div className="button-group">
        <button onClick={() => onSelect(null)}>삭제</button>
        <button disabled={isEndDateBeforeToday} onClick={() => onSelect(today)}>
          오늘
        </button>
      </div>
      <div className="week">{DAYS_OF_WEEK}</div>
      {calendar}
    </div>
  );
};

export default Calendar;
