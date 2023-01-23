import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_MESSAGE,
} from "../actions/wsActionTypes";
import {IWsMessage} from './data'

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
interface IWsConnectionClosedAll {
  readonly type: typeof WS_CONNECTION_CLOSED_ALL;
}
interface IWsConnectionClosedUser {
  readonly type: typeof WS_CONNECTION_CLOSED_USER;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}
interface IWsConnectionStartAll {
  readonly type: typeof WS_CONNECTION_START_ALL;
}
interface IWsConnectionStartUser {
  readonly type: typeof WS_CONNECTION_START_USER;
}

export type TWsActions =
|IWsConnectionSuccess
|IWsConnectionError
|IWsConnectionClosedAll
|IWsConnectionClosedUser
|IWsGetMessage
|IWsConnectionStartAll
|IWsConnectionStartUser;

