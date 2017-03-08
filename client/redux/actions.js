export const addStockDisplay = (sym, desc, data) => {
  return {
    type: 'ADD_STOCK_DISPLAY',
    sym,
    desc,
    data,
  };
};

export const changeDates = (start, end) => {
  return {
    type: 'CHANGE_DATES',
    startDate,
    endDate
  };
};
