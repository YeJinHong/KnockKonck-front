import "./Item.css";
import Button from "./Button";
import Booking from "./Booking";
import { getFormattedPrice } from "../util/get-formatted-price";
import { useContext } from "react";
import { DataDispatchContext } from "./ItemList";
import { getBookingList, crawlingTimeData } from "../services/api";

const Item = ({
  address,
  bizesNumber,
  itemNumber,
  bizesName,
  itemName,
  lowPrice,
  highPrice,
  bookingUrl,
  itemImageUrl,
  bookingData,
  startDate,
}) => {
  const onUpdateBookingData = useContext(DataDispatchContext);
  // TODO : 미리 불러와진 데이터가 없을 때, 끌어올 데이터가 없을 때 구분 필요
  const onClickUpdateButton = () => {
    const crawlingAndGetData = async () => {
      console.log("crawling ... ");
      await crawlingTimeData(bizesNumber, itemNumber, startDate);

      console.log("crawling complete");
      const bookingData = await getBookingList(
        bizesNumber,
        itemNumber,
        startDate
      );

      onUpdateBookingData(bookingData);
      console.log("bookingData ", bookingData);
    };

    crawlingAndGetData();
  };

  return (
    <div className="Item">
      <div className={`img_section`}>
        <img src={itemImageUrl} />
      </div>
      <div className="info_section">
        <div className="item_name">{`${bizesName} - ${itemName}`}</div>
        <div className="price">
          <span>{getFormattedPrice(lowPrice, highPrice)}</span>
        </div>
        <div>{address}</div>
      </div>
      <div className="booking_section">
        <Booking {...bookingData}></Booking>
      </div>
      <div className="button_section">
        <Button onClick={onClickUpdateButton} text={"지금 예약정보 불러오기"} />
        <Button
          text={"예약하기 바로가기"}
          type={"POSITIVE"}
          onClick={() => window.open(`${bookingUrl}`)}
          // onClick={() => window.open(`${bookingUrl}/startDate=${startDate}`)}
        ></Button>
      </div>
    </div>
  );
};
export default Item;
