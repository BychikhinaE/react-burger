import { getData, postOrder } from "../../utils/api";

export const DELETE_ITEM = "DELETE_ITEM";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

export const GET_SELECTED_ITEM = "GET_SELECTED_ITEM";
export const SET_SELECTEDITEM_REQUEST = "SET_SELECTEDITEM_REQUEST";
export const SET_SELECTEDITEM_SUCCESS = "SET_SELECTEDITEM_SUCCESS";
export const SET_SELECTEDITEM_ERROR = " SET_SELECTEDITEM_ERROR";

export const GET_ITEM_FOR_VIEW = "GET_ITEM_FOR_VIEW";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER";

export const TAB_SWITCH = "TAB_SWITCH";
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const UPDATE_LIST = "UPDATE_LIST";

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

//Отправляем заказ на сервер
export function setSelectedItems(id) {
  return function (dispatch) {
    dispatch({
      type: SET_SELECTEDITEM_REQUEST,
    });
    postOrder(id).then((res) => {
      if (res && res.success) {
        dispatch({
          type: SET_SELECTEDITEM_SUCCESS,
          number: res.order.number,
        });
      } else {
        dispatch({
          type: SET_SELECTEDITEM_ERROR,
        });
      }
    });
  };
}
