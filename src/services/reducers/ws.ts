import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_MESSAGE,
} from "../actions/wsActionTypes";
import { TWsActions } from "../types/ws";
import { IOrder } from "../types/data";

type TWsState = {
  wsConnected: boolean;
  orders: Array<IOrder>;
  error: string | undefined;
  total: number;
  totalToday: number;
};

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_ALL:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_CONNECTION_CLOSED_USER:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
