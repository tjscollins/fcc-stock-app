export const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const stocksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_STOCK_DISPLAY':
      let {sym, desc, data} = action;
      let isNewStock = (function(stockSym, data) {
        let returnValue = true;
        state.list.forEach((stock) => {
          if (stock.sym === stockSym
            && data.length === stock.data.length) returnValue = false;
        });
        return returnValue;
      })(sym, data);
      return isNewStock ? {
        ...state,
        list: [
          ...state.list, {
            sym,
            desc,
            data,
          },
        ]
      } : state;
    case 'REMOVE_STOCK':
      return {
        ...state,
        list: state
          .list
          .filter((stock) => {
            return stock.sym !== action.sym;
          })
      };
    default:
      return state;
  }
};

export const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_DATES':
      let {startDate, endDate,} = action;
      return {
        ...state,
        startDate,
        endDate
      };
    default:
      return state;
  };
};
