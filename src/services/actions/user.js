import {
  createUser,
  loginRequest,
  logoutRequest,
  updateUserData,
  refreshTokenRequest,
  getUserData,
} from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

export const SUBMIT_PROFILE_REQUEST = "SUBMIT_PROFILE_REQUEST";
export const SUBMIT_PROFILE_SUCCESS = "SUBMIT_PROFILE_SUCCESS";
export const SUBMIT_PROFILE_ERROR = " SUBMIT_PROFILE_ERROR";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";


//Отправляем данные нового пользователя на сервер
export function addNewUser(history, pathname) {
  console.log("history.location.state " + history.location.state, pathname);
  return function (dispatch) {
    dispatch({
      type: SUBMIT_PROFILE_REQUEST,
    });
    createUser(history.location.state).then((res) => {
      if (res && res.success) {
        console.log(res);
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: SUBMIT_PROFILE_SUCCESS,
          data: res.user,
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
          type: SUBMIT_PROFILE_ERROR,
        });

      }
    });
  };
}

export function signIn(history, pathname) {
  console.log(history.location.state, pathname)
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    loginRequest(history.location.state).then((res) => {
      if (res && res.success) {
        console.log('это успех, и должен быть вход')
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          setCookie("refreshToken", refreshToken);
        }

        dispatch({
          type: USER_LOGIN_SUCCESS,
          data: res.user,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });
        history.push({
          pathname: "/",
          state: {},
        });
      } else {
        dispatch({
          type: USER_LOGIN_ERROR,
        });
        console.log(res.message)
      }
    });
  };
}

export function signOut(history) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    const refreshToken = getCookie("refreshToken");
    logoutRequest(refreshToken).then((res) => {
      if (res && res.success) {
        dispatch({
          type: USER_LOGOUT_SUCCESS,
        });
        deleteCookie(refreshToken);
        deleteCookie(getCookie("accessToken"));

        history.push({
          pathname: "/login",
          state: {},
        });
      } else {
        dispatch({
          type: USER_LOGOUT_ERROR,
        });
      }
    });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    if (
      getCookie("accessToken") === undefined &&
      getCookie("refreshToken") === undefined
    ) {
      return console.log('нет никого туть')
    }
    if (getCookie("accessToken") !== undefined) {
      getUserData().then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data: res.user,
          });
        } else {
          dispatch({
            type: GET_USER_ERROR,
          });
        }
      });
    } else {
      refreshTokenRequest().then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
        }
        getUserData().then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              data: res.user,
            });
          } else {
            dispatch({
              type: GET_USER_ERROR,
            });
          }
        });
      });
    }
  };
}

export function updateUser(history, pathname) {
  return function (dispatch) {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    if (getCookie("accessToken") !== undefined) {
      updateUserData(history.location.state).then((res) => {
        if (res && res.success) {
          console.log('update', res)
          dispatch({
            type: USER_UPDATE_SUCCESS,
            data: res.user,
          });
          history.replace({
            pathname: pathname,
            state: {},
          });
          history.push({
            pathname: "/profile",
            state: undefined,
          });
        } else {
          dispatch({
            type: USER_UPDATE_ERROR,
          });
        }
      });
    } else {
      refreshTokenRequest().then((res) => {

        const accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
        }
        updateUserData(history.location.state).then((res) => {
          console.log('update  refreshTokenRequest', res)
          if (res && res.success) {
            dispatch({
              type: USER_UPDATE_SUCCESS,
              data: res.user,
            });
            history.replace({
              pathname: pathname,
              state: undefined,
            });
          } else {
            dispatch({
              type: USER_UPDATE_ERROR,
            });
          }
        });
      });
    }
  };
}
