export const reducer = (state ={}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export const stocksReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_STOCK_DISPLAY':
      let {sym, desc, data} = action;
      return {
      ...state,
      list: [
        ...state.list,
        {sym, desc, data},
      ],
    };
    default:
      return state;
  }
};

export const settingsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_DATES':
      let {startDate, endDate} = action;
      return {
        ...state,
        startDate,
        endDate,
      };
    default:
      return state;
  };
};
