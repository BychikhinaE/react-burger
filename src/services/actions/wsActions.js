
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_USER,

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

export const wsConnectionClosedAll = () => {
  return {
    type: WS_CONNECTION_CLOSED_ALL
  };
};

export const wsConnectionClosedUser = () => {
  return {
    type: WS_CONNECTION_CLOSED_USER
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsConnectionStartAll = () => {
  return {
    type: WS_CONNECTION_START_ALL,
  };
};

export const wsConnectionStartUser = () => {
  return {
    type: WS_CONNECTION_START_USER,
  };
};

