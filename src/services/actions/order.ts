import { postOrder } from "../../utils/api";
import { CLEAN_ALL_LIST } from "./constructor";
import { AppDispatch } from "../types/index";

export const SUBMIT_ORDER_REQUEST: "SUBMIT_ORDER_REQUEST" =
  "SUBMIT_ORDER_REQUEST";
export const SUBMIT_ORDER_SUCCESS: "SUBMIT_ORDER_SUCCESS" =
  "SUBMIT_ORDER_SUCCESS";
export const SUBMIT_ORDER_ERROR: "SUBMIT_ORDER_ERROR" = "SUBMIT_ORDER_ERROR";
export const CLOSE_MODAL_ORDER: "CLOSE_MODAL_ORDER" = "CLOSE_MODAL_ORDER";

//Отправляем заказ на сервер
export const setSelectedItems =
  (id: Array<string | undefined>) => (dispatch: AppDispatch) => {
    dispatch({
      type: SUBMIT_ORDER_REQUEST,
    });
    postOrder(id)
      .then((res) => {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          number: res.order.number,
        });
        dispatch({ type: CLEAN_ALL_LIST });
      })
      .catch((res) => {
        dispatch({
          type: SUBMIT_ORDER_ERROR,
        });
        console.log(res);
      });
  };
