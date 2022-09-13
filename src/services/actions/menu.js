import { getData } from "../../utils/api";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
export const TAB_SWITCH = "TAB_SWITCH";

//Получаем карточки товара с сервера
export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_ERROR,
        });
      }
    });
  };
}
