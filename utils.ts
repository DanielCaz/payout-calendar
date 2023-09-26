export const dateToString = (date: Date) => {
  const day = date.getDate();
  let monthString = date.getMonth() + 1 + "";
  let dateString = day + "";
  if (day < 10) {
    dateString = "0" + dateString;
  }
  if (date.getMonth() + 1 < 10) {
    monthString = "0" + monthString;
  }
  return date.getFullYear() + "-" + monthString + "-" + dateString;
};
