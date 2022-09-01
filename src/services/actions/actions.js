import { getData, postOrder } from '../../utils/api';


export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_SELECTEDITEM = 'GET_SELECTEDITEM';
export const SET_SELECTEDITEM_REQUEST = 'SET_SELECTEDITEM_REQUEST';
export const SET_SELECTEDITEM_SUCCESS = 'SET_SELECTEDITEM_SUCCESS';
export const  SET_SELECTEDITEM_FAILED = ' SET_SELECTEDITEM_FAILED';
export const GET_ITEM_FOR_VIEW = 'GET_ITEM_FOR_VIEW';
export const CLOSE_MODAL='CLOSE_MODAL';
export const CLOSE_MODAL_NUMBER = 'CLOSE_MODAL_NUMBER'
export const GET_SELECTEDITEM_ID='GET_SELECTEDITEM_ID';
export const  TAB_SWITCH = 'TAB_SWITCH';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getData().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    });
  };
}

export function setSelectedItems(id) {
  return function(dispatch) {
    dispatch({
      type: SET_SELECTEDITEM_REQUEST
    });
    postOrder(id).then(res => {
      if (res && res.success) {
        dispatch({
          type: SET_SELECTEDITEM_SUCCESS,
          number: res.order.number
        });
      } else {
        dispatch({
          type: SET_SELECTEDITEM_FAILED
        });
      }
    });
  };
}
