import { getCookie } from "./utils";
const API = "https://norma.nomoreparties.space/api";

//Получить ингредиенты
export function getData() {
  return fetch(`${API}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponse);
}
//Отправить заказ
export function postOrder(ingridientsIdArray) {
  return fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  }).then(getResponse);
}
//Проверить на ошибки ответ с сервера
function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

//Создать пользователя
export function createUser(data) {
  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

//Восстановить пароль
export function postForgotPassword(data) {
  return fetch(`${API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

//Сбросить пароль
export function postResetPassword(data) {
  return fetch(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

//для авторизации
export function loginRequest(data) {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).then(getResponse);
}

//для выхода
export function logoutRequest(refreshToken) {
  return fetch(`${API}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(getResponse);
}

//для обновления токена
export function refreshTokenRequest() {
  const refreshToken = getCookie("refreshToken");
  return fetch(`${API}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(getResponse);
}

//для получения данных пользователя
export function getUserData() {
  return fetch(`${API}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);
}

export function updateUserData(data) {
  return fetch(`${API}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).then(getResponse);
}
