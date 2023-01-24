import {
  ADD_SELECTED_ITEM,
  DELETE_ITEM,
  TOGGLE_LIST,
  CLEAN_ALL_LIST,
} from "../actions/constructor";
import {IIngredient} from "../types/data"
import {TConstructorActions} from '../types/constructor'

const initialStateConstructor: {selectedItems: Array<IIngredient>} = {
  // список всех ингредиентов в текущем конструкторе бургера,
  selectedItems: [],
};

export const constructorReducer = (state = initialStateConstructor, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_SELECTED_ITEM: {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.item],
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item, index) => index !== action.index
        ),
      };
    }

    case CLEAN_ALL_LIST: {
      return {
        ...state,
        selectedItems: [],
      };
    }

    case TOGGLE_LIST: {
      return {
        ...state,
        selectedItems: state.selectedItems.map((item, index, array) => {
          if (index === action.hoverIndex) {
            return array[action.dragIndex];
          }
          if (index === action.dragIndex) {
            return array[action.hoverIndex];
          }
          return item;
        }),
      };
    }

    default: {
      return state;
    }
  }
};
