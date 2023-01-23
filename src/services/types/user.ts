import {
  SUBMIT_PROFILE_REQUEST,
  SUBMIT_PROFILE_SUCCESS,
  SUBMIT_PROFILE_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "../actions/user";
import {TUserData} from './data'

type TSubmitProfileRequestAction = {
  readonly type: typeof SUBMIT_PROFILE_REQUEST;
}
type TSubmitProfileSuccessAction = {
  readonly type: typeof SUBMIT_PROFILE_SUCCESS;
  readonly  data: TUserData;
}
type TSubmitProfileErrorAction = {
  readonly type: typeof SUBMIT_PROFILE_ERROR;
}
type TUserLoginRequestAction = {
  readonly type: typeof USER_LOGIN_REQUEST;
}
type TUserLoginSuccessAction = {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly  data: TUserData;
}
type TUserLoginErrorAction = {
  readonly type: typeof USER_LOGIN_ERROR;
}
type TUserLogoutRequestAction = {
  readonly type: typeof USER_LOGOUT_REQUEST;
}
type TUserLogoutSuccessAction = {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}
type TUserLogoutErrorAction = {
  readonly type: typeof USER_LOGOUT_ERROR;
}
type TUserUpdateRequestAction = {
  readonly type: typeof USER_UPDATE_REQUEST;
}
type TUserUpdateSuccessAction = {
  readonly type: typeof USER_UPDATE_SUCCESS;
  readonly data: TUserData;
}
type TUserUpdateErrorAction = {
  readonly type: typeof USER_UPDATE_ERROR;
}
type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
}
type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly data: TUserData;
}
type TGetUserErrorAction = {
  readonly type: typeof GET_USER_ERROR;
}
export type TUserActions =
| TSubmitProfileRequestAction
| TSubmitProfileSuccessAction
| TSubmitProfileErrorAction
| TUserLoginRequestAction
| TUserLoginSuccessAction
| TUserLoginErrorAction
| TUserLogoutRequestAction
| TUserLogoutSuccessAction
| TUserLogoutErrorAction
| TUserUpdateRequestAction
| TUserUpdateSuccessAction
| TUserUpdateErrorAction
| TGetUserRequestAction
| TGetUserSuccessAction
| TGetUserErrorAction;
