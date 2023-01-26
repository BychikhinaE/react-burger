import { getCookie } from "./utils";
import {
  IGetData,
  IPostOrder,
  ICreateUser,
  IPostForgotPassword,
  IPostResetPassword,
  ILogoutRequest,
  IGetUserData,
  IRefreshTokenRequest,
  IUpdateUserData,
  IResetPassword,
  IRegisterData,
  ILoginData,
} from "../services/types/data";
import { API } from "./constants";


async function request<T>(url: string, options: RequestInit | undefined) {
  // принимает два аргумента: урл и объект опций
  const res = await fetch(url, options);
  return getResponse<T>(res);
}
//Проверить на ошибки ответ с сервера
function getResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
//Получить ингредиенты
export function getData() {
  return request<IGetData>(`${API}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
//Отправить заказ
export function postOrder(ingridientsIdArray: Array<string | undefined>) {
  return request<IPostOrder>(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  });
}

//Создать пользователя
export function createUser(data: IRegisterData) {
  return request<ICreateUser>(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//Восстановить пароль
export function postForgotPassword(data: { email: string }) {
  return request<IPostForgotPassword>(`${API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//Сбросить пароль
export function postResetPassword(data: IResetPassword) {
  return request<IPostResetPassword>(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//для авторизации
export function loginRequest(data: ILoginData) {
  return request<ICreateUser>(`${API}/auth/login`, {
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
  });
}

//для выхода
export function logoutRequest(refreshToken: string | undefined) {
  return request<ILogoutRequest>(`${API}/auth/logout`, {
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
  });
}

//для обновления токена
export function refreshTokenRequest() {
  const refreshToken = getCookie("refreshToken");
  return request<IRefreshTokenRequest>(`${API}/auth/token`, {
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
  });
}

//для получения данных пользователя
export function getUserData() {
  return request<IGetUserData>(`${API}/auth/user`, {
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
  });
}

export function updateUserData(data: IUpdateUserData) {
  return request<IGetUserData>(`${API}/auth/user`, {
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
  });
}
