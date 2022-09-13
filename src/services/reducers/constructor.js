import {
  ADD_SELECTED_ITEM,
  DELETE_ITEM,
  TOGGLE_LIST,
  UPDATE_COUNTERS,
} from "../actions/constructor";

const initialStateConstructor = {
  // список всех ингредиентов в текущем конструкторе бургера,
  selectedItems: [],
  counters: {},
};

export const constructorReducer = (state = initialStateConstructor, action) => {
  switch (action.type) {
    case ADD_SELECTED_ITEM: {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.item],
      };
    }
    case UPDATE_COUNTERS: {
      return {
        ...state,
        counters: state.selectedItems.reduce((prevVal, item) => {
          if (!prevVal[item._id]) {
            prevVal[item._id] = 1;
          } else {
            prevVal[item._id]++;
          }
          return prevVal;
        }, {}),
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

    case TOGGLE_LIST: {
      state.selectedItems[action.dragIndex] = action.hoverItem;
      state.selectedItems[action.hoverIndex] = action.dragItem;
      return {
        ...state,
        selectedItems: [...state.selectedItems],
      };
    }

    default: {
      return state;
    }
  }
};
