import { postOrder } from "../../utils/api";
export const SUBMIT_ORDER_REQUEST = "SUBMIT_ORDER_REQUEST";
export const SUBMIT_ORDER_SUCCESS = "SUBMIT_ORDER_SUCCESS";
export const SUBMIT_ORDER_ERROR = " SUBMIT_ORDER_ERROR";
export const CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER";

//Отправляем заказ на сервер
export function setSelectedItems(id) {
  console.log(id);
  return function (dispatch) {
    dispatch({
      type: SUBMIT_ORDER_REQUEST,
    });
    postOrder(id).then((res) => {
      if (res && res.success) {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          number: res.order.number,
        });
      } else {
        dispatch({
          type: SUBMIT_ORDER_ERROR,
        });
      }
    });
  };
}
