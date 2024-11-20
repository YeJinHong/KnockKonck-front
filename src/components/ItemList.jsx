import Item from "./Item";
import { useReducer, useState, useEffect, createContext } from "react";
import { getStringedDate } from "../util/get-stringed-date";
import { useContext } from "react";
import { ItemStateContext } from "../App";
import { getTimeToMinutes } from "../util/get-time-to-minutes";
import { getItemList, getBookingList, crawlingTimeData } from "../services/api";
import Option from "./Option";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "INIT_ITEMS":
      {
        nextState = action.data;
      }
      break;
    case "SET_BOOKING_DATA":
      {
        nextState = state.map((item) =>
          String(item.bizesNumber) === String(action.bookingData.bizesNumber) &&
          String(item.itemNumber) === String(action.bookingData.itemNumber)
            ? {
                ...item,
                bookingData: action.bookingData,
              }
            : item
        );
        console.log(nextState);
      }
      break;
    default:
      return state;
  }

  return nextState;
}

export const DataStateContext = createContext();
export const DataDispatchContext = createContext();

const ItemList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, {});
  const subsData = useContext(ItemStateContext).subsData;
  const [filteredData, setFilteredData] = useState(data);
  const [filterInput, setFilterInput] = useState({
    startDate: new Date(),
    ableTimeStart: "00:00",
    ableTimeEnd: "23:59",
    isFilterOn: false,
    time: 2,
  });

  // 구독 항목의 변화가 있거나 검색 날짜가 바뀌는 경우 API 호출
  useEffect(() => {
    const getData = async () => {
      const result = await getItemList(subsData);

      for (let i = 0; i < result.length; i++) {
        // 접속 시점마다 데이터 크롤링
        // await crawlingTimeData(
        //   result[i].bizesNumber,
        //   result[i].itemNumber,
        //   getStringedDate(filterInput.startDate)
        // );
        const bookingData = await getBookingList(
          result[i].bizesNumber,
          result[i].itemNumber,
          getStringedDate(filterInput.startDate)
        );
        result[i].bookingData = bookingData;
      }

      dispatch({
        type: "INIT_ITEMS",
        data: result,
      });

      setFilteredData(result);
      setIsLoading(false);
    };

    getData();
  }, [subsData, filterInput.startDate]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onChangeFilterInput = (name, value) => {
    setFilterInput({
      ...filterInput,
      [name]: value,
    });
  };

  const onFilterTimeData2 = (filteredData) => {
    setFilteredData(filteredData);
  };

  // 가용 시간 내에 연속하여 time시간 이상으로 사용 가능한 장소 필터링
  const onFilterTimeData = () => {
    const startMinutes = getTimeToMinutes(filterInput.ableTimeStart);
    const endMinutes = getTimeToMinutes(filterInput.ableTimeEnd);
    const reqiredMinutes = filterInput.time * 60;
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
    setFilteredData(filteredData);
  };

  const onUpdateBookingData = (bookingData) => {
    dispatch({
      type: "SET_BOOKING_DATA",
      bookingData,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  return (
    <div className="ItemList">
      {/* <DataStateContext.Provider value={{ data, startDate }}> */}
      <DataStateContext.Provider value={{ data }}>
        <DataDispatchContext.Provider value={onUpdateBookingData}>
          <Option
            {...filterInput}
            // onSearchItemList={onSearchItemList}
            onChangeFilterInput={onChangeFilterInput}
            onFilterTimeData={onFilterTimeData}
            onFilterTimeData2={onFilterTimeData2}
          />
          <div className="list_wrapper">
            <h2>{`${getStringedDate(filterInput.startDate)} 검색결과  ${
              filteredData.length
            } 건`}</h2>
            {filteredData.map((item) => (
              <Item
                key={item.itemNumber}
                {...item}
                bookingData={item.bookingData}
                startDate={getStringedDate(filterInput.startDate)}
              />
            ))}
          </div>
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </div>
  );
};
export default ItemList;
