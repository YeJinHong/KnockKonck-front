export const getTimeToMinutes = (time) => {
  // HH:MM의 형식을 분단위로 변환
  const hours = Number(time.slice(0, 2));
  const minutes = Number(time.slice(-2));
  return hours * 60 + minutes;
};
