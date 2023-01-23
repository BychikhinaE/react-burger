import { compose, createStore, applyMiddleware, Action,  ActionCreator} from "redux";
import { rootReducer } from "../reducers/index";
import thunk, {ThunkAction} from "redux-thunk";
import { socketMiddleware } from "../middleware/socketMiddleware";

import {
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_MESSAGE,
} from "../actions/wsActionTypes";

const wsUrl = "wss://norma.nomoreparties.space/orders";

export interface IWs  {
  wsInit: typeof WS_CONNECTION_START_ALL | typeof WS_CONNECTION_START_USER,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onError: typeof WS_CONNECTION_ERROR,
  onClose: typeof WS_CONNECTION_CLOSED_ALL | typeof WS_CONNECTION_CLOSED_USER,
  onMessage: typeof WS_GET_MESSAGE,
}

const wsActionsAll: IWs = {
  wsInit: WS_CONNECTION_START_ALL,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED_ALL,
  onMessage: WS_GET_MESSAGE,
};
const wsActionsUser: IWs = {
  wsInit: WS_CONNECTION_START_USER,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED_USER,
  onMessage: WS_GET_MESSAGE,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActionsAll, true), socketMiddleware(wsUrl, wsActionsUser, false)),
);

const store = createStore(rootReducer, enhancer);
// export type RootState = ReturnType<typeof store.getState>;
export default store;
