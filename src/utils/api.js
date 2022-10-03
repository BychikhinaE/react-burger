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
    body: JSON.stringify({ data }),
  }).then(getResponse);
}

//Восстановить пароль
export function postForgotPassword(data) {
  return fetch(`${API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  }).then(getResponse);
}

//Сбросить пароль
export function postResetPassword(data) {
  return fetch(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  }).then(getResponse);
}
