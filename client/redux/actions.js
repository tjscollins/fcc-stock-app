export const addStockDisplay = (sym, desc, data) => {
  return {
    type: 'ADD_STOCK_DISPLAY',
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

export const changeDates = (start, end) => {
  return {
    type: 'CHANGE_DATES',
    startDate,
    endDate
  };
};
