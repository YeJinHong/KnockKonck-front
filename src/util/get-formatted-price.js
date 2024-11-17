export const getFormattedPrice = (lowPrice, highPrice) => {
  if (!highPrice || highPrice == "") {
    return lowPrice + "원";
  }
  return lowPrice + " ~ " + highPrice + "원";
};
