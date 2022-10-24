import { postForgotPassword, postResetPassword } from "../../utils/api";

export const POST_FORGOT_PASSWORD_REQUEST = "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_SUCCESS = "POST_FORGOT_PASSWORD_SUCCESS";
export const POST_FORGOT_PASSWORD_ERROR = "POST_FORGOT_PASSWORD_ERROR";

export const POST_RESET_PASSWORD_REQUEST = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_ERROR = "POST_RESET_PASSWORD_ERROR";

export const SAVE_PASSWORD = "SAVE_PASSWORD";

export function postForgotPasswordAction(email) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });
    postForgotPassword(email)
      .then((res) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: res.success,
        });
        console.log("postForgotPassword" + res.success);
      })
      .catch((res) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_ERROR,
          data: res.success,
        });
        console.log("postForgotPassword" + res.success);
      });
  };
}

export function postResetPasswordAction(data) {
  return function (dispatch) {
    dispatch({
      type: POST_RESET_PASSWORD_REQUEST,
    });
    postResetPassword(data)
      .then((res) => {
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
          data: res.success,
        });
        console.log("postResetPassword" + res.success);
      })

      .catch((res) => {
        dispatch({
          type: POST_RESET_PASSWORD_ERROR,
          data: res.success,
        });
        console.log("postResetPassword" + res.success);
      });
  };
}
