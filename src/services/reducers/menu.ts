import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  TAB_SWITCH,
} from "../actions/menu";
import {IIngredient} from "../types/data"
import {TMenuActions, TTabSwitchName} from '../types/menu'

type TMenuState = {
  items: Array<IIngredient>,
  itemsRequest: boolean,
  itemsFailed: boolean,
  currentTab: TTabSwitchName,
}
const initialState: TMenuState = {
  // список всех полученных с сервера ингредиентов,
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  //Таблица переключений активного поля
  currentTab: "Булки",
};

export const burgerIngredientsReducer = (state = initialState, action: TMenuActions) => {
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
