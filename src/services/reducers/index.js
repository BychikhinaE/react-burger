import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./menu";
import { constructorReducer } from "./constructor";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  menu: burgerIngredientsReducer,
  constr: constructorReducer,
  info: ingredientReducer,
  order: orderReducer,
});
