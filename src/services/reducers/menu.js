import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  TAB_SWITCH,
} from "../actions/menu";

const initialState = {
  // список всех полученных с сервера ингредиентов,
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  //Таблица переключений активного поля
  currentTab: "Булки",
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
