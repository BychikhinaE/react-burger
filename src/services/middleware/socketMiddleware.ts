import type { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
        let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;

      if (type === wsInit && user) {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      }
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
          const message = { ...payload, token: user.token };
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    };
};
