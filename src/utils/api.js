import { getCookie } from "./utils";
const API = "https://norma.nomoreparties.space/api";

async function request(url, options) {
  // принимает два аргумента: урл и объект опций
  const res = await fetch(url, options);
  return getResponse(res);
}
//Проверить на ошибки ответ с сервера
function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
//Получить ингредиенты
export function getData() {
  return request(`${API}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
//Отправить заказ
export function postOrder(ingridientsIdArray) {
  return request(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  })
}


//Создать пользователя
export function createUser(data) {
  return request(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

//Восстановить пароль
export function postForgotPassword(data) {
  return request(`${API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

//Сбросить пароль
export function postResetPassword(data) {
  return request(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

//для авторизации
export function loginRequest(data) {
  return request(`${API}/auth/login`, {
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
  })
}

//для выхода
export function logoutRequest(refreshToken) {
  return request(`${API}/auth/logout`, {
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
  })
}

//для обновления токена
export function refreshTokenRequest() {
  const refreshToken = getCookie("refreshToken");
  return request(`${API}/auth/token`, {
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
  })
}

//для получения данных пользователя
export function getUserData() {
  return request(`${API}/auth/user`, {
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
  })
}

export function updateUserData(data) {
  return request(`${API}/auth/user`, {
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
  })
}
