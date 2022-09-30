const API = "https://norma.nomoreparties.space/api";


export function getData() {
  return fetch(`${API}/ingredients`, {
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
  }).then(getResponse);
}

export function postOrder(ingridientsIdArray) {
  return fetch(`${API}/orders`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({"ingredients": ingridientsIdArray}),
  }).then(getResponse);
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}


export function createUser(data) {
  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        "email": data.email,
        "password": data.password,
        "name": data.name }
      ),
  }).then(getResponse);
}
