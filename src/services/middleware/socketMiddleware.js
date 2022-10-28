// import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from "../../utils/utils";

export function socketMiddleware(wsUrl, wsActions) {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage,  } =
        wsActions;

      const token = getCookie("accessToken");
      console.log(token+ "token")
      // const isAuth = token ? true : false;
      if (type === wsInit) {
        // объект класса WebSocket
        socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}/all`);
      } else if (type === onClose && socket) {
        socket.close();
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
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const orders = { ...payload };
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(orders));
        }
      }

      next(action);
    };
  };
}
