import moment from "moment-timezone";

//Функция возвращает расстояние между заголовком раздела и верхней границей рамки родительского блока
export function getDistanceBetweenPoints(elem, viewportCoords) {
  const coordsChild = elem.getBoundingClientRect();
  return Math.abs(viewportCoords.top - coordsChild.top);
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

//функция вернет день времы и часовой пояс заказа
moment().locale("ru");
const orderDateMoment = (order) =>
  moment(order.createdAt).format("HH:mm[ i-GMT]");
const utc = moment().utcOffset() / 60;

const fromNow = (order) => {
  const dif = moment().diff(order.createdAt, "days");
  return dif === 0
    ? "Сегодня"
    : dif === 1
    ? "Вчера"
    : dif > 1
    ? moment(order.createdAt).locale("ru").fromNow()
    : null;
};
export const formatHumanDate = (order) => {
  return `${fromNow(order)}, ${orderDateMoment(order)}+${utc}`;
};
