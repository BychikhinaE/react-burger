import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_ERROR,
  CLOSE_MODAL_ORDER,
  UPDATE_TOTAL,
} from "../actions/order";

const initialStateOrder = {
  numberOrder: NaN,
  modalVisible: false,
  total: "0",
  idSet: [],
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case UPDATE_TOTAL: {
      let priceSecondBun = 0;
      let bunId = undefined;
      if (action.selectedItems.some((item) => item.type === "bun")) {
        const bun = action.selectedItems.find((item) => item.type === "bun");
        priceSecondBun = bun.price;
        bunId = bun._id;
      }

      return {
        ...state,
        idSet: [...action.selectedItems.map((item) => item._id), bunId],
        total: action.selectedItems.reduce(
          (acc, item) => acc + item.price,
          priceSecondBun
        ),
      };
    }

    case SUBMIT_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }

    // получить номер заказа
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        numberOrder: action.number,
        modalVisible: true,
        orderFailed: false,
        orderRequest: false,
      };
    }

    case SUBMIT_ORDER_ERROR: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case CLOSE_MODAL_ORDER: {
      return { ...state, modalVisible: false };
    }

    default: {
      return state;
    }
  }
};
