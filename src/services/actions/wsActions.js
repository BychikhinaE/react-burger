
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,

} from './wsActionTypes';

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};



export const wsSendMessage = message => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsConnectionStart = (token) => {
  return {
    type: WS_CONNECTION_START,
    payload: token,
  };
};


