export const dateFormatter = (date = new Date()) => {
  let [currentYear, currentMonth, currentDate] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  currentMonth = currentMonth > 9 ? currentMonth : '0' + currentMonth;
  currentDate = currentDate > 9 ? currentDate : '0' + currentDate;
  return [currentYear, currentMonth, currentDate];
};
