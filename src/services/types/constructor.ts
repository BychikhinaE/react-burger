import { IIngredient } from "./data";
import {ADD_SELECTED_ITEM, DELETE_ITEM,CLEAN_ALL_LIST, TOGGLE_LIST } from '../actions/constructor'

type TAddSelectedItemAction = {
  readonly type: typeof ADD_SELECTED_ITEM;
  readonly item: IIngredient;
}
type TDeleteItemAction = {
  readonly type: typeof DELETE_ITEM;
  readonly index: number;
}
type TCleanAllListAction = {
  readonly type: typeof CLEAN_ALL_LIST;
}
type TToggleListAction = {
  readonly type: typeof TOGGLE_LIST;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}

export type TConstructorActions =
  | TAddSelectedItemAction
  | TDeleteItemAction
  | TCleanAllListAction
  | TToggleListAction;
