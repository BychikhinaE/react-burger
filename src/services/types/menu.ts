import { IIngredient } from "./data";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  TAB_SWITCH,
} from "../actions/menu";

type TGetItemsRequestAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};
type TGetItemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<IIngredient>;
};
type TGetItemsErrorAction = {
  readonly type: typeof GET_ITEMS_ERROR;
};
type TTabSwitchAction = {
  readonly type: typeof TAB_SWITCH;
  readonly value: string;
};
export type TMenuActions =
  | TGetItemsRequestAction
  | TGetItemsSuccessAction
  | TGetItemsErrorAction
  | TTabSwitchAction;
