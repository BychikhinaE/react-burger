import {
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
} from "../actions/ingredient";

const initialState = {
  currenViewedItem: {},
  modalVisible: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_FOR_VIEW: {
      return {
        // ...state,
         currenViewedItem: action.item,
        modalVisible: true
      };
    }
    case CLOSE_MODAL: {
      return {
        // ...state,
         currenViewedItem: {},
      modalVisible: false
    };
    }

    default: {
      return state;
    }
  }
};
