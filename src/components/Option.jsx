import "./Option.css";
import { useContext, useEffect, useState } from "react";
import { getStringedDate } from "../util/get-stringed-date";
import { getTimeToMinutes } from "../util/get-time-to-minutes";
import { DataStateContext, DataDispatchContext } from "./ItemList";

function toggleDisable(isFilterOn) {
  const timeFilterInputs = document.querySelectorAll(".timeFilter");

  for (let i = 0; i < timeFilterInputs.length; i++) {
    timeFilterInputs[i].disabled = !isFilterOn;
  }
}

const Option = ({
  startDate,
  ableTimeStart,
  ableTimeEnd,
  isFilterOn,
  time,
  onChangeFilterInput,
  onFilterTimeData,
  onFilterTimeData2,
}) => {
  useEffect(() => {
    toggleDisable(false);
  }, []);

  const data = useContext(DataStateContext).data;

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "startDate") {
      value = new Date(value);
    }
    if (name === "isFilterOn") {
      value = e.target.checked;
      toggleDisable(value);
    }

    onChangeFilterInput(name, value);
  };

  const initSearchCondition = () => {
    toggleDisable(false);
  };

  const onClickFilterButton2 = () => {
    const startMinutes = getTimeToMinutes(ableTimeStart);
    const endMinutes = getTimeToMinutes(ableTimeEnd);
    const reqiredMinutes = time * 60;
    const filteredData = data.filter((item) => {
      let sum = 0;
      const timeDataList = item.bookingData.timeDataList;
      for (let i = 0; i < timeDataList.length; i++) {
        const timeData = timeDataList[i];
        if (Number(timeData.minutes) >= Number(endMinutes)) {
          return false;
        }
        if (Number(timeData.minutes) < Number(startMinutes)) continue;
        if (timeData.state === "DISABLE") {
          sum = 0;
          continue;
        }
        sum += Number(timeData.diff);

        if (sum >= reqiredMinutes) return true;
      }
    });
    onFilterTimeData2(filteredData);
  };

  const onClickFilterButton = () => {
    console.log("click filter button");
    onFilterTimeData();
  };

  return (
    <div className="option_bar">
      <section className="search_section">
        <input
          name="startDate"
          min={getStringedDate(new Date())}
          onChange={onChangeInput}
          value={getStringedDate(startDate)}
          type="date"
        />
        <button>검색</button>
      </section>
      <section className="filter_section">
        <input
          type="checkbox"
          name="isFilterOn"
          onChange={onChangeInput}
          checked={isFilterOn}
        />
        <span>검색 결과 내 이용시간 필터링</span>
        <br />
        <span>가용 시간 :</span>
        <input
          type="time"
          onChange={onChangeInput}
          name="ableTimeStart"
          value={ableTimeStart}
          className="timeFilter"
        />
        ~
        <input
          type="time"
          onChange={onChangeInput}
          name="ableTimeEnd"
          value={ableTimeEnd}
          className="timeFilter"
        />
        <span>이용 시간 :</span>
        <select
          name="time"
          className="timeFilter"
          value={time}
          onChange={onChangeInput}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="timeFilter" onClick={onClickFilterButton2}>
          필터링
        </button>
      </section>
      <section className="init_section">
        <button onClick={initSearchCondition}>검색 조건 초기화</button>
      </section>
    </div>
  );
};
export default Option;
