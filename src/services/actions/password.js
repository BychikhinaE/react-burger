import { postForgotPassword, postResetPassword } from "../../utils/api";

export const POST_FORGOT_PASSWORD_REQUEST = "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_SUCCESS = "POST_FORGOT_PASSWORD_SUCCESS";
export const POST_FORGOT_PASSWORD_ERROR = "POST_FORGOT_PASSWORD_ERROR";

export const POST_RESET_PASSWORD_REQUEST = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_ERROR = "POST_RESET_PASSWORD_ERROR";

export const SAVE_PASSWORD = "SAVE_PASSWORD";

export function postForgotPasswordAction(history, pathname) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });
    postForgotPassword(history.location.state).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: res.success,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });

        history.push({
          pathname: "/reset-password",
          state: {},
        });
      } else {
        dispatch({
          type: POST_FORGOT_PASSWORD_ERROR,
        });
      }
    });
  };
}

export function postResetPasswordAction(history, pathname) {
  return function (dispatch) {
    dispatch({
      type: POST_RESET_PASSWORD_REQUEST,
    });
    postResetPassword(history.location.state).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });
        history.push({
          pathname: "/profile",
          state: {},
        });
      } else {
        dispatch({
          type: POST_RESET_PASSWORD_ERROR,
        });
      }
    });
  };
}
