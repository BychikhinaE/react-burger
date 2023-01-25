import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_ERROR,
  CLOSE_MODAL_ORDER,
} from "../actions/order";

type TSubmitOrderRequestAction = {
  readonly type: typeof SUBMIT_ORDER_REQUEST;
};
type TSubmitOrderSuccessAction = {
  readonly type: typeof SUBMIT_ORDER_SUCCESS;
  readonly number: number;
};
type TSubmitOrderErrorAction = {
  readonly type: typeof SUBMIT_ORDER_ERROR;
};
type TCloseModalOrderAction = {
  readonly type: typeof CLOSE_MODAL_ORDER;
};

export type TOrderActions =
  | TSubmitOrderRequestAction
  | TSubmitOrderSuccessAction
  | TSubmitOrderErrorAction
  | TCloseModalOrderAction;
