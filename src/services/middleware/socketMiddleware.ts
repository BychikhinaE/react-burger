import type { Middleware } from "redux";
import { getCookie } from "../../utils/utils";
import { IWs } from "../store/store";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWs,
  isAll: boolean
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && !socket) {
        const token = getCookie("accessToken");
        socket = isAll
          ? new WebSocket(`${wsUrl}/all`)
          : new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (type === onClose && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
