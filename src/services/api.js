import axios from "axios";
import { API_BASE_URL } from "../util/constants.js";

export const getItemList = async (subsData) => {
  try {
    const itemNumberList = subsData.map((sub) => {
      return sub.itemNumber;
    });
    const itemList = await axios.get(
      `${API_BASE_URL}/item?itemNumberList=${itemNumberList}`
    );
    return itemList.data;
  } catch (error) {
    console.error("Error fetching itemList:", error);
    throw error;
  }
};

// DB에 저장된 데이터 load
export const getBookingList = async (bizesNumber, itemNumber, startDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/booking?bizesNumber=${bizesNumber}&itemNumber=${itemNumber}&startDate=${startDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bookingList:", error);
    throw error;
  }
};

// 데이터를 크롤링하여 DB에 저장
export const crawlingTimeData = async (bizesNumber, itemNumber, startDate) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/crawling/time-data`, {
      bizesNumber,
      itemNumber,
      startDate,
    });
  } catch (error) {
    console.error("Error fetching time data:", error);
    throw error;
  }
};

export const getBizesData = async (mapUrl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bizes?mapUrl=${mapUrl}`);
    return response.data;
  } catch (error) {
    console.log("Error load bizes data", error);
    throw error;
  }
};

export const crawlingBizesData = async (mapUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bizes`, {
      mapUrl,
    });
    return response.data;
  } catch (error) {
    console.log("Error crawling bizes data", error);
    throw error;
  }
};
