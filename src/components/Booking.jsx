import TimeData from "./TimeData";
import "./Booking.css";

const Booking = ({ lastUpdatedAt, timeDataList }) => {
  if (!lastUpdatedAt) {
    return (
      <div className="Booking Booking_no_data">
        미리 불러와진 예약정보가 없습니다
      </div>
    );
  }

  return (
    <div className="Booking">
      <div className="update_info_section">{`업데이트 날짜 : ${lastUpdatedAt}`}</div>
      <ul>
        {timeDataList.map((timeData) => (
          <TimeData key={timeData.minutes} {...timeData} />
        ))}
      </ul>
    </div>
  );
};

export default Booking;
