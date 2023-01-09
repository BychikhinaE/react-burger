import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/index";
import thunk from "redux-thunk";
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

const wsActionsAll = {
  wsInit: WS_CONNECTION_START_ALL,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED_ALL,
  onMessage: WS_GET_MESSAGE,
};
const wsActionsUser = {
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
export default store;
