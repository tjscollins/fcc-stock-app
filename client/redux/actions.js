export const updateStockData = (sym, desc, data) => {
  return {
    type: 'UPDATE_STOCK_DISPLAY',
    sym,
    desc,
    data,
  };
};

export const removeStock = (sym) => {
  return {
    type: 'REMOVE_STOCK',
    sym,
  };
};

export const changeDates = (startDate, endDate) => {
  return {
    type: 'CHANGE_DATES',
    startDate,
    endDate
  };
};
