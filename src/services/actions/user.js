import { createUser, } from "../../utils/api";
export const SUBMIT_PROFILE_REQUEST = "SUBMIT_PROFILE_REQUEST";
export const SUBMIT_PROFILE_SUCCESS = "SUBMIT_PROFILE_SUCCESS";
export const SUBMIT_PROFILE_ERROR = " SUBMIT_PROFILE_ERROR";


//Отправляем заказ на сервер
export function setDataNewUser(data) {
  console.log(data);
  return function (dispatch) {
    dispatch({
      type: SUBMIT_PROFILE_REQUEST,
    });
    createUser(data).then((res) => {
      if (res && res.success) {
        dispatch({
          type: SUBMIT_PROFILE_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: SUBMIT_PROFILE_ERROR,
        });
      }
    });
  };
}
