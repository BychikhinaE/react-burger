import type { Middleware, MiddlewareAPI } from 'redux';
import { useSelector } from "react-redux";
import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
        let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const isAuth = useSelector((state) => state.user.isAuth);
      const token = getCookie("accessToken");

      if (type === wsInit && isAuth) {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      } else { socket = new WebSocket(wsUrl)}

      if (socket) {
                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

                // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const orders = { ...payload, token: token };
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(orders));
        }
      }

      next(action);
    };
    };
};
