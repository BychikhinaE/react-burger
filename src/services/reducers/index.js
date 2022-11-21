import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./menu";
import { constructorReducer } from "./constructor";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { passwordReducer } from "./password";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  menu: burgerIngredientsReducer,
  constr: constructorReducer,
  // info: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  password: passwordReducer,
  ws: wsReducer,
});
