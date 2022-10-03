import { createUser } from "../../utils/api";
export const SUBMIT_PROFILE_REQUEST = "SUBMIT_PROFILE_REQUEST";
export const SUBMIT_PROFILE_SUCCESS = "SUBMIT_PROFILE_SUCCESS";
export const SUBMIT_PROFILE_ERROR = " SUBMIT_PROFILE_ERROR";

//Отправляем данные нового пользователя на сервер
export function addNewUser(history, pathname) {
  console.log('history.location.state ' + history.location.state)
  return function (dispatch) {
    dispatch({
      type: SUBMIT_PROFILE_REQUEST,
    });
    createUser(history.location.state).then((res) => {
      if (res && res.success) {
        dispatch({
          type: SUBMIT_PROFILE_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });
      } else {
        dispatch({
          type: SUBMIT_PROFILE_ERROR,
        });
      }
    });
  };
}
