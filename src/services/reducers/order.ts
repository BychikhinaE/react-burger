import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_ERROR,
  CLOSE_MODAL_ORDER,
} from "../actions/order";
import {TOrderActions} from '../types/order'

type TOrderState = {
  numberOrder: string,
  modalVisible: boolean,
  orderRequest: boolean,
  orderFailed: boolean,
}

const initialStateOrder: TOrderState = {
  numberOrder: '',
  modalVisible: false,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialStateOrder, action: TOrderActions) => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return { ...state, orderRequest: true, modalVisible: true, };
    }

    // получить номер заказа
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        numberOrder: action.number.toString(),
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
