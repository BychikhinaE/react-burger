import { getData } from "../../utils/api";
import { AppDispatch } from "../types/index";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR: "GET_ITEMS_ERROR" = "GET_ITEMS_ERROR";
export const TAB_SWITCH: "TAB_SWITCH" = "TAB_SWITCH";

//Получаем карточки товара с сервера
export function getItems() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getData()
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      })
      .catch((res) => {
        dispatch({
          type: GET_ITEMS_ERROR,
        });
        console.log(res);
      });
  };
}
