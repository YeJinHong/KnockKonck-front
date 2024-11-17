import "./TimeData.css";

const TimeData = ({ hours, minutes, state }) => {
  return (
    <li className="time_list">
      <div className="time_text">{minutes % 60 == 0 ? `${hours}시` : " "}</div>
      <button className={`btn_${state}`} type="button"></button>
    </li>
  );
};

export default TimeData;
