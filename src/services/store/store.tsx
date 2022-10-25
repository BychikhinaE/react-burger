import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from '../middleware/socketMiddleware'

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../actions/wsActionTypes";

const wsUrl = "wss://norma.nomoreparties.space/api/orders";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
};


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);
export default store;
