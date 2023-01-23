import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_ERROR,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_ERROR,
  SAVE_PASSWORD,
} from "../actions/password";

type TSavePasswordAction = {
  readonly type: typeof SAVE_PASSWORD;
  readonly password: string;
}
type TPostForgotPasswordRequestAction = {
  readonly type: typeof POST_FORGOT_PASSWORD_REQUEST;
}
type TPostForgotPasswordSuccessAction = {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
  readonly data: boolean;
}
type TPostForgotPasswordErrorAction = {
  readonly type: typeof POST_FORGOT_PASSWORD_ERROR;
  readonly data: boolean;
}
type TPostResetPasswordRequestAction = {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}
type TPostResetPasswordSuccessAction = {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
  readonly data: boolean;
}
type TPostResetPasswordErrorAction = {
  readonly type: typeof POST_RESET_PASSWORD_ERROR;
  readonly data: boolean;
}

export type TPasswordActions =
  | TSavePasswordAction
  | TPostForgotPasswordRequestAction
  | TPostForgotPasswordSuccessAction
  | TPostForgotPasswordErrorAction
  | TPostResetPasswordRequestAction
  | TPostResetPasswordSuccessAction
  | TPostResetPasswordErrorAction;
