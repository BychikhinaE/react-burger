import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_ERROR,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_ERROR,
  SAVE_PASSWORD,
} from "../actions/password";
import {TPasswordActions} from '../types/password'

type TPasswordState = {
  password: string,
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  forgotPasswordStatus: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  updatePasswordStatus: boolean,
}
const passwordInitialState: TPasswordState = {
  password: "",
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordStatus: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  updatePasswordStatus: false,
};

export const passwordReducer = (state = passwordInitialState, action: TPasswordActions) => {
  switch (action.type) {
    case SAVE_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }

    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }

    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordStatus: action.data,
      };
    }

    case POST_FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordStatus: action.data,
      };
    }

    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }

    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        updatePasswordStatus: action.data,
        resetPasswordRequest: false,
      };
    }

    case POST_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        updatePasswordStatus: action.data,
      };
    }

    default: {
      return state;
    }
  }
};
