import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_USER,
} from "../actions/wsActionTypes";
import { IWsMessage } from "./data";

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: string;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
interface IWsConnectionClosedAll {
  readonly type: typeof WS_CONNECTION_CLOSED_ALL;
  readonly payload?: string;
}
interface IWsConnectionClosedUser {
  readonly type: typeof WS_CONNECTION_CLOSED_USER;
  readonly payload?: string;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}
interface IWsConnectionStartAll {
  readonly type: typeof WS_CONNECTION_START_ALL;
  readonly payload?: string;
}
interface IWsConnectionStartUser {
  readonly type: typeof WS_CONNECTION_START_USER;
  readonly payload?: string;
}

export type TWsActions =
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosedAll
  | IWsConnectionClosedUser
  | IWsGetMessage
  | IWsConnectionStartAll
  | IWsConnectionStartUser;
